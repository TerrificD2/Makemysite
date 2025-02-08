class ChatService {
  private socket: WebSocket | null = null;
  private messageHandlers: ((message: any) => void)[] = [];

  connect() {
    this.socket = new WebSocket('wss://your-websocket-server.com');

    this.socket.onopen = () => {
      console.log('Connected to chat server');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageHandlers.forEach(handler => handler(message));
    };

    this.socket.onclose = () => {
      console.log('Disconnected from chat server');
      // Implement reconnection logic here
      setTimeout(() => this.connect(), 5000);
    };
  }

  sendMessage(message: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'message', content: message }));
    }
  }

  onMessage(handler: (message: any) => void) {
    this.messageHandlers.push(handler);
  }

  disconnect() {
    this.socket?.close();
  }
}

export const chatService = new ChatService(); 