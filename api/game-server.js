import express from 'express';
import { SOCKET_EVENTS } from './events.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor Socket.io ativo');
});


server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const waitingQueue = [];

io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
  console.log(`Novo jogador conectado: ${socket.id}`);

  socket.on(SOCKET_EVENTS.FINDING_MATCH, () => {
    console.log(`Jogador ${socket.id} entrou na fila`);
    waitingQueue.push(socket);

    if (waitingQueue.length >= 2) {
      const player1 = waitingQueue.shift();
      const player2 = waitingQueue.shift();

      const roomId = `sala_${player1.id}_${player2.id}`;
      player1.join(roomId);
      player2.join(roomId);

      console.log(`Criando partida na sala ${roomId}`);

      io.to(roomId).emit(SOCKET_EVENTS.MATCH_FOUND, {
        roomId,
        players: [player1.id, player2.id]
      });
    }
  });

  socket.on(SOCKET_EVENTS.HERO_SELECTED, ({ roomId, heroName, player, step }) => {
    console.log(`Jogador ${socket.id} selecionou o herói ${heroName} na sala ${roomId}`);
    socket.to(roomId).emit(SOCKET_EVENTS.HERO_SELECTED, { heroName, player, step });
  });  

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log(`Jogador desconectado: ${socket.id}`);
    const index = waitingQueue.findIndex(s => s.id === socket.id);
    if (index !== -1) waitingQueue.splice(index, 1);
  });
});
