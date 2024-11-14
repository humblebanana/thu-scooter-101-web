export interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

export interface DifyResponse {
  event: string;
  answer?: string;
  message?: string;
  error?: {
    message: string;
    code: string;
  };
} 