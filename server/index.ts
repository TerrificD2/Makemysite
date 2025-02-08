import { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  id: string;
  ws: WebSocket;
  type: 'user' | 'designer';
}

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map<string, Client>();
const waitingUsers = new Set<string>();
const availableDesigners = new Set<string>();

wss.on('connection', (ws) => {
  const clientId = uuidv4();
  
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    
    switch (data.type) {
      case 'register':
        clients.set(clientId, { id: clientId, ws, type: data.userType });
        if (data.userType === 'designer') {
          availableDesigners.add(clientId);
          // Check for waiting users
          matchUserWithDesigner();
        } else {
          waitingUsers.add(clientId);
          matchUserWithDesigner();
        }
        break;
        
      case 'message':
        // Handle message routing
        const recipient = clients.get(data.recipientId);
        if (recipient) {
          recipient.ws.send(JSON.stringify({
            type: 'message',
            senderId: clientId,
            content: data.content
          }));
        }
        break;
    }
  });

  ws.on('close', () => {
    const client = clients.get(clientId);
    if (client) {
      if (client.type === 'designer') {
        availableDesigners.delete(clientId);
      } else {
        waitingUsers.delete(clientId);
      }
      clients.delete(clientId);
    }
  });
});

function matchUserWithDesigner() {
  if (waitingUsers.size > 0 && availableDesigners.size > 0) {
    const userId = waitingUsers.values().next().value;
    const designerId = availableDesigners.values().next().value;
    
    // Match them and notify both parties
    const user = clients.get(userId);
    const designer = clients.get(designerId);
    
    if (user && designer) {
      user.ws.send(JSON.stringify({ type: 'matched', designerId }));
      designer.ws.send(JSON.stringify({ type: 'matched', userId }));
      
      waitingUsers.delete(userId);
      availableDesigners.delete(designerId);
    }
  }
} 