import express from 'express';
import { SOCKET_EVENTS } from './events.js';
import http from 'http';
import Player from '../src/core/player.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ['GET', 'POST'],
    origin: '*'
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const waitingQueue = [];
const matches = {};

io.on('connection', (socket) => {
  socket.on(SOCKET_EVENTS.FINDING_MATCH, () => {
    console.log(`Jogador ${socket.id} entrou na fila`);
    waitingQueue.push(socket);

    if (waitingQueue.length >= 2) {
      const playerSocket1 = waitingQueue.shift();
      const playerSocket2 = waitingQueue.shift();

      const roomId = `room_${playerSocket1.id}_${playerSocket2.id}`;
      playerSocket1.join(roomId);
      playerSocket2.join(roomId);

      matches[roomId] = {
        player1: new Player('Player 1', [], playerSocket1.id, 1),
        player2: new Player('Player 2', [], playerSocket2.id, 2),
        selectedHeroes: []
      };

      console.log(`Criando partida na sala ${roomId}`);

      io.to(roomId).emit(SOCKET_EVENTS.MATCH_FOUND, {
        players: [
          matches[roomId].player1.toJSON(),
          matches[roomId].player2.toJSON()
        ],
        roomId
      });
    }
  });

  socket.on(SOCKET_EVENTS.HERO_SELECTED, ({ roomId, heroName, player, step }) => {
    console.log(`Jogador ${socket.id} selecionou o herói ${heroName} na sala ${roomId}`);
    socket.to(roomId).emit(SOCKET_EVENTS.HERO_SELECTED, { heroName, player, step });
  });

  socket.on(SOCKET_EVENTS.SELECTION_COMPLETE, ({ roomId, players, heroes }) => {
    console.log(`[SERVER] SELECTION_COMPLETE recebido. Enviando START_GAME para sala ${roomId}`);

    io.to(roomId).emit(SOCKET_EVENTS.START_GAME, {
      heroes,
      players,
      roomId
    });
  });

  socket.on(SOCKET_EVENTS.TURN_DETERMINE_STARTING_PLAYER, ({ roomId, whoStarted }) => {
    const match = matches[roomId];
    if (!match) return;

    io.to(roomId).emit(SOCKET_EVENTS.TURN_START, {
      whoStarted
    });
  });

  socket.on(SOCKET_EVENTS.HERO_MOVED, ({ roomId, heroId, position }) => {
    socket.to(roomId).emit(SOCKET_EVENTS.HERO_MOVED, { heroId, position });
  });

  socket.on(SOCKET_EVENTS.HERO_ATTACKED, ({ roomId, attackerId, targetId, damage }) => {
    socket.to(roomId).emit(SOCKET_EVENTS.HERO_ATTACKED, {
      attackerId,
      targetId,
      damage
    });
  });

  socket.on(SOCKET_EVENTS.TURN_END_REQUEST, ({ roomId, nextPlayerIndex, roundNumber }) => {
    io.to(roomId).emit(SOCKET_EVENTS.TURN_START, {
      nextPlayerIndex,
      roundNumber
    });
  });

  socket.on(SOCKET_EVENTS.GAME_FINISHED, ({ roomId, winnerId }) => {
    io.to(roomId).emit(SOCKET_EVENTS.GAME_FINISHED, { winnerId });
    delete matches[roomId];
  });

  socket.on('disconnect', () => {
    console.log(`Jogador desconectado: ${socket.id}`);
    const index = waitingQueue.findIndex(s => s.id === socket.id);
    if (index !== -1) waitingQueue.splice(index, 1);
  });
});
