const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const defaultState = {
  currentQuestion: 0,
  points: 0,
  questions: [
    {
      text: 'Qui est le perso le plus culte ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Hélène',
          points: 47,
          revealed: false,
        },
        {
          text: 'Nico',
          points: 19,
          revealed: false,
        },
        {
          text: 'José',
          points: 13,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 11,
          revealed: false,
        },
        {
          text: 'Béné',
          points: 9,
          revealed: false,
        },
        
      ]
    },
    {
      text: 'Quel est la case de bingo préférée des Nadines ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Parle en francs',
          points: 31,
          revealed: false,
        },
        {
          text: 'Splash',
          points: 17,
          revealed: false,
        },
        {
          text: 'José = caca',
          points: 15,
          revealed: false,
        },
        {
          text: 'Vraie scène en extérieur',
          points: 10,
          revealed: false,
        },
      ]
    }
  ]
};

let state = JSON.parse(JSON.stringify(defaultState));
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "https://unenadineenor.qarzak.fr"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit('appInit', state);

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.on('resetGame', () => {
    state = JSON.parse(JSON.stringify(defaultState));;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('stateUpdate', state);
  });

  socket.on('previousQuestion', () => {
    if(state.currentQuestion > 0) {
      state.currentQuestion--;
      socket.emit('stateUpdate', state);
      socket.broadcast.emit('stateUpdate', state);
    }
  });

  socket.on('nextQuestion', () => {
    if(state.currentQuestion < state.questions.length - 1) {
      state.currentQuestion++;
      socket.emit('stateUpdate', state);
      socket.broadcast.emit('stateUpdate', state);
    }
  });

  socket.on('answerReveal', (answerId) => {
    state.questions[state.currentQuestion].answers.find((answer, index) => index === answerId).revealed = true;
    state.points += state.questions[state.currentQuestion].answers.find((answer, index) => index === answerId).points;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('answerReveal', state);
  });

  socket.on('wrongGuess', () => {
    state.questions[state.currentQuestion].wrongGuess++;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('wrongGuess', state);
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});