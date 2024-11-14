'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle } from 'lucide-react';
import Image from 'next/image';

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

import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

export default function AppleStyleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setIsInitialState(false);

      // 添加用户消息
      const userMessage: Message = {
        id: Date.now(),
        content: inputValue,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // 添加AI消息占位
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: '',
        isUser: false
      };
      setMessages(prev => [...prev, aiMessage]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: inputValue }]
        }),
      });

      if (!response.ok) {
        throw new Error('API请求失败');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流');
      }

      let aiMessageContent = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = new TextDecoder().decode(value);
          const lines = text.split('\n');

          for (const line of lines) {
            if (!line.trim() || !line.startsWith('data: ')) continue;

            try {
              const jsonStr = line.slice(6);
              if (jsonStr === '[DONE]') continue;

              const data = JSON.parse(jsonStr);
              if (data.answer) {
                aiMessageContent += data.answer;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = aiMessageContent;
                  return newMessages;
                });
              }
            } catch (parseError) {
              // 忽略解析错误，继续处理下一行
              continue;
            }
          }
        }
      } catch (streamError) {
        if (streamError instanceof Error && streamError.name === 'AbortError') {
          setMessages(prev => [...prev, {
            id: Date.now(),
            content: '回答已中止',
            isUser: false
          }]);
          return;
        }
        throw streamError;
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: error instanceof Error ? `错误: ${error.message}` : '发生未知错误',
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedQuestions = [
    "学校对使用电动车的态度是什么？",
    "在校园内骑行电动车有哪些注意事项？",
    "在校园内哪里可以给电动车充电？",
    "如何选择适合我的电动车？"
  ];

  const handleQuestionClick = async (question: string) => {
    if (!question.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setIsInitialState(false);
      
      const controller = new AbortController();
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

      let aiMessageContent = '';
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            
            // 跳过空行和结束标记
            if (!trimmedLine || trimmedLine === 'data: [DONE]') {
              continue;
            }

            // 确保行以 'data: ' 开头
            if (trimmedLine.startsWith('data: ')) {
              try {
                // 提取 JSON 字符串部分
                const jsonString = trimmedLine.substring(6); // 跳过 'data: ' 前缀
                const data = JSON.parse(jsonString);
                
                // 检查并处理回答内容
                if (data && typeof data === 'object' && 'answer' in data) {
                  const answer = data.answer;
                  if (typeof answer === 'string') {
                    aiMessageContent += answer;
                    setMessages(prev => {
                      const newMessages = [...prev];
                      if (newMessages.length > 0) {
                        newMessages[newMessages.length - 1].content = aiMessageContent;
                      }
                      return newMessages;
                    });
                  }
                }
              } catch (parseError) {
                // 在开发环境下记录错误，但不中断处理
                if (process.env.NODE_ENV === 'development') {
                  console.warn('跳过无效的 JSON:', trimmedLine);
                }
                continue;
              }
            }
          }
        }
      } catch (streamError) {
        if (streamError instanceof Error && streamError.name === 'AbortError') {
          setMessages(prev => [...prev, {
            id: Date.now(),
            content: '回答已中止',
            isUser: false
          }]);
          return;
        }
        throw streamError;
      }

    } catch (error) {
      console.error('Chat error:', error instanceof Error ? error.message : '未知错误');
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: error instanceof Error ? `错误: ${error.message}` : '发生未知错误',
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 添加中止函数
  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-1 sm:p-4 bg-transparent rounded-2xl transition-all duration-300 hover:shadow-lg">
      {isInitialState ? (
        <>
          <h1 className="text-lg sm:text-3xl font-bold text-center mb-3 sm:mb-8">我是THU老司机.AI，有问题可以先问我</h1>
          
          <div className="bg-gray-100 rounded-full p-1.5 sm:p-2 flex items-center mb-4 sm:mb-6 transition-all duration-300 hover:bg-gray-200">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="🛵给清华老司机发消息"
              className="flex-grow bg-transparent outline-none px-2 sm:px-4 text-sm sm:text-base"
              onKeyPress={handleKeyPress}
            />
            <button onClick={() => sendMessage()} className="p-1.5 sm:p-2 transition-transform duration-300 hover:scale-110">
              <Send size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {recommendedQuestions.map((question, index) => (
              <button 
                key={index} 
                className="bg-gray-200 rounded-lg p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-1"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="h-[450px] sm:h-[500px] overflow-y-auto mb-2 sm:mb-4 p-1.5 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-inner [scroll-behavior:smooth]">
            {messages.map((message, index) => (
              <div key={index} className={`mb-1.5 sm:mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                {!message.isUser && (
                  <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-1 sm:mr-2 flex-shrink-0">
                    <Image
                      src="/user-avatar.png"
                      alt="AI Avatar"
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
                    <ReactMarkdown
                      components={{
                        code: ({className, children, ...props}: React.ComponentPropsWithoutRef<'code'>) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !match;
                          return isInline ? (
                            <code className="bg-gray-100 px-1 rounded" {...props}>
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-100 p-2 rounded-lg my-2 overflow-x-auto">
                              <code
                                className={className}
                                {...props}
                              >
                                {children}
                              </code>
                            </pre>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
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
              placeholder="输入您的问题..." 
              className="flex-grow p-1 sm:p-2 bg-transparent border-none focus:outline-none text-xs sm:text-base"
              onKeyPress={handleKeyPress}
            />
            {isLoading ? (
              <button 
                onClick={handleAbort}
                className="bg-transparent text-black p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                title="点击停止输出"
                aria-label="停止输出"
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
