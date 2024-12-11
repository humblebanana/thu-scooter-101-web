'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';

// 定义消息类
interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

// 添加新的类型定义
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AppleStyleChat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [connectionState, setConnectionState] = useState<'idle' | 'connecting' | 'streaming' | 'error'>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const currentController = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentBufferRef = useRef<string>('');

  const recommendedQuestions: Record<string, string[]> = {
    zh: [
      "学校对使用电动车的态度是什么？",
      "在校园内骑行电动车有哪些注意事项？",
      "在校园内哪里可以给电动车充电？",
      "如何选择适合我的电动车？"
    ],
    en: [
      "What's the school's attitude towards electric scooters?",
      "What are the riding rules on campus?",
      "Where can I charge my scooter on campus?",
      "How to choose a suitable scooter?"
    ]
  };

  const scrollToBottom = () => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ThinkingAnimation = () => {
    return (
      <div className="flex items-center space-x-2 text-gray-400 h-6">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.7s' }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>.</span>
      </div>
    );
  };

  // 处理单个消息
  const processMessage = async (message: string, currentContent: string, isFirst: boolean) => {
    if (!message.trim() || !message.startsWith('data: ')) return;

    try {
      const jsonStr = message.slice(6);
      if (jsonStr === '[DONE]') return;

      const data = JSON.parse(jsonStr);
      if (data.answer) {
        let newContent = isFirst ? data.answer : currentContent + data.answer;
        contentBufferRef.current = newContent;

        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (!lastMessage.isUser) {
            lastMessage.content = newContent;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.warn('处理消息时出错:', error);
    }
  };

  // 处理最后一个chunk
  const processLastChunk = async (buffer: string) => {
    if (!buffer) return;

    try {
      const jsonStr = buffer.slice(6);
      if (jsonStr !== '[DONE]') {
        const data = JSON.parse(jsonStr);
        if (data.answer) {
          const newContent = contentBufferRef.current + data.answer;
          contentBufferRef.current = newContent;

          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (!lastMessage.isUser) {
              lastMessage.content = newContent;
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.warn('处理最后一个chunk时出错:', error);
    } finally {
      setIsThinking(false);
      setIsLoading(false);
      setConnectionState('idle');
    }
  };

  // 处理流错误
  const handleStreamError = (error: unknown) => {
    setConnectionState('error');
    
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (!lastMessage.isUser) {
        lastMessage.content = '已中止回答';
      }
      return newMessages;
    });

    setIsLoading(false);
    setIsThinking(false);
  };

  const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder) => {
    let buffer = '';
    let isFirstChunk = true;

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          if (buffer) {
            await processLastChunk(buffer);
          }
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const messages = buffer.split('\n');
        buffer = messages.pop() || '';

        for (const message of messages) {
          await processMessage(message, contentBufferRef.current, isFirstChunk);
          isFirstChunk = false;
        }
      }
    } catch (error) {
      handleStreamError(error);
    } finally {
      setIsLoading(false);
      setConnectionState('idle');
    }
  };

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setIsThinking(true);
      setIsInitialState(false);
      contentBufferRef.current = '';

      // 创建新的 AbortController
      const controller = new AbortController();
      currentController.current = controller;
      setAbortController(controller);

      // 添加用户消息
      const userMessage: Message = {
        id: Date.now(),
        content: inputValue,
        isUser: true
      };
      
      // 添加AI消息占位
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: '',
        isUser: false
      };

      setMessages(prev => [...prev, userMessage, aiMessage]);
      setInputValue('');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: inputValue }]
        }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('无法获取响应流');

      // 处理流式响应
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // 解码并处理消息
        const text = new TextDecoder().decode(value);
        const messages = text.split('\n').filter(Boolean);

        for (const message of messages) {
          if (message.startsWith('data: ')) {
            const jsonStr = message.slice(6);
            if (jsonStr === '[DONE]') continue;

            try {
              const data = JSON.parse(jsonStr);
              if (data.answer) {
                contentBufferRef.current += data.answer;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (!lastMessage.isUser) {
                    lastMessage.content = contentBufferRef.current;
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.warn('解析消息时出错:', e);
            }
          }
        }
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('请求已取消');
        return;
      }
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (!lastMessage.isUser) {
          lastMessage.content = `错误: ${error instanceof Error ? error.message : '未知错误'}`;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      currentController.current = null;
      setAbortController(null);
    }
  };

  const handleQuestionClick = async (question: string) => {
    if (!question.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setIsThinking(true); // 添加思考动画
      setIsInitialState(false);
      
      const controller = new AbortController();
      currentController.current = controller; // 保存当前的 controller
      setAbortController(controller);

      // 添加用户消息
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: question,
        isUser: true
      }]);

      // 添加AI消息占位
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: '',
        isUser: false
      }]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: question }] 
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('API请求失败');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流');
      }

      const decoder = new TextDecoder();
      await processStream(reader, decoder);

    } catch (error) {
      // 如果是中止操作，静默处理
      if (error instanceof Error && error.name === 'AbortError') {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (!lastMessage.isUser) {
            lastMessage.content = '已中止回答';
          }
          return newMessages;
        });
      }
      // 其他错误也不显示错误信息
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 添加中止函数
  const handleAbort = () => {
    if (currentController.current) {
      currentController.current.abort();
      currentController.current = null;
      setIsLoading(false);
      setIsThinking(false);
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (!lastMessage.isUser) {
          if (!lastMessage.content.trim()) {
            lastMessage.content = '已中止回答';
          } else {
            if (!lastMessage.content.includes('[回答已中止]')) {
              lastMessage.content = lastMessage.content.trim() + '\n\n[回答已中止]';
            }
          }
        }
        return newMessages;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (currentController.current) {
        currentController.current.abort();
        currentController.current = null;
        setIsLoading(false);
        setIsThinking(false);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-1 sm:p-4 bg-transparent rounded-2xl transition-all duration-300 hover:shadow-lg">
      {isInitialState ? (
        <div className="space-y-4">
          <h1 className="text-lg sm:text-3xl font-bold text-center mb-3 sm:mb-8">
            {t('chat.welcome.title')}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm text-center -mt-2 sm:-mt-6 mb-4 sm:mb-6">
            {t('chat.welcome.subtitle')}
          </p>
          
          <div className="bg-gray-100 rounded-full p-1.5 sm:p-2 flex items-center mb-4 sm:mb-6 transition-all duration-300 hover:bg-gray-200">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chat.input.placeholder')}
              className="flex-grow bg-transparent outline-none px-2 sm:px-4 text-sm sm:text-base"
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={() => sendMessage()} 
              className="p-1.5 sm:p-2 transition-transform duration-300 hover:scale-110"
            >
              <Send size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {recommendedQuestions[language].map((question: string, index: number) => (
              <button 
                key={index} 
                className="bg-gray-200 rounded-lg p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-1"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-[450px] sm:h-[500px] overflow-y-auto mb-2 sm:mb-4 p-1.5 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-inner [scroll-behavior:smooth]">
            {messages.map((message, index) => (
              <div key={index} className={`mb-1.5 sm:mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                {!message.isUser && (
                  <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-1 sm:mr-2 flex-shrink-0">
                    <Image
                      src="/user-avatar.png"
                      alt={t('chat.avatar.alt')}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div 
                  className={`inline-block p-1 sm:p-2 rounded-lg transition-all duration-300 max-w-[80%] text-xs sm:text-base ${
                    message.isUser 
                      ? 'bg-gray-200 text-black hover:bg-gray-300' 
                      : 'bg-transparent text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {message.isUser ? (
                    message.content
                  ) : (
                    <>
                      {isThinking && message.content === '' ? (
                        <ThinkingAnimation />
                      ) : (
                        <ReactMarkdown
                          components={{
                            code: ({className, children, ...props}) => {
                              const match = /language-(\w+)/.exec(className || '')
                              const isInline = !match
                              return isInline ? (
                                <code className="bg-gray-100 px-1 rounded" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <pre className="bg-gray-100 p-2 rounded-lg my-2 overflow-x-auto">
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </pre>
                              )
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </>
                  )}
                </div>
                {message.isUser && <div className="w-5 h-5 sm:w-8 sm:h-8 ml-1 sm:ml-2" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center bg-gray-100 rounded-full p-1 sm:p-1.5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chat.input.placeholder')}
              className="flex-grow p-1 sm:p-2 bg-transparent border-none focus:outline-none text-xs sm:text-base"
              onKeyPress={handleKeyPress}
            />
            {isLoading ? (
              <button 
                onClick={handleAbort}
                className="bg-transparent text-black p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                title={t('chat.button.stop')}
                aria-label={t('chat.button.stop')}
              >
                <StopCircle size={16} className="sm:w-5 sm:h-5" />
              </button>
            ) : (
              <button 
                onClick={() => sendMessage()}
                className="bg-transparent text-black-500 p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Send size={16} className="sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
