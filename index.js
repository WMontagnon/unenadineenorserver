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
      text: 'Quelle case du bingo fait ressortir le plus de mauvaise foi ?',
      wrongGuess: 0,
      answers: [
        {
          text: "Savent pas s'asseoir",
          points: 38,
          revealed: false,
        },
        {
          text: 'Mensonge avec Euuuuh',
          points: 17,
          revealed: false,
        },
        {
          text: 'Béné Chromé Shiny',
          points: 14,
          revealed: false,
        },
        {
          text: 'Semelle sur le lit',
          points: 5,
          revealed: false,
        },
        {
          text: '8 personnes debout',
          points: 5,
          revealed: false,
        },
        {
          text: "T'aurais vu sa tête",
          points: 5,
          revealed: false,
        },
        
      ]
    },
    {
      text: 'Quels deux personnages aimerais-tu ou aurais-tu aimé voir en couple ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Seb/Béné',
          points: 25,
          revealed: false,
        },
        {
          text: 'Béné/Laly',
          points: 10,
          revealed: false,
        },
        {
          text: 'José/Laly',
          points: 8,
          revealed: false,
        },
        {
          text: 'José/Hélène',
          points: 7,
          revealed: false,
        },
        {
          text: 'Nico/Béné',
          points: 6,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel est le lieu le plus culte de la série ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Le garage',
          points: 56,
          revealed: false,
        },
        {
          text: 'La cafèt',
          points: 43,
          revealed: false,
        },
        {
          text: 'Le VRAI Extérieur',
          points: 4,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel perso aimerais-tu avoir comme parent ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Nicolas',
          points: 34,
          revealed: false,
        },
        {
          text: 'Hélène',
          points: 30,
          revealed: false,
        },
        {
          text: 'Béné',
          points: 24,
          revealed: false,
        },
        {
          text: 'Seb',
          points: 6,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel serait le circuit MK préféré de Seb ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Le Circuit Yoshi',
          points: 33,
          revealed: false,
        },
        {
          text: "L'Horloge Tic Tac",
          points: 6,
          revealed: false,
        },
        {
          text: 'La Prairie Meuh Meuh',
          points: 6,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel perso de la série aurait la plus grande carrière TikTok ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Laly',
          points: 48,
          revealed: false,
        },
        {
          text: 'José',
          points: 21,
          revealed: false,
        },
        {
          text: 'Manu',
          points: 6,
          revealed: false,
        },
        {
          text: 'Béné',
          points: 5,
          revealed: false,
        },
        {
          text: 'Nico',
          points: 4,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quelle activité ferais-tu si tu te retrouvais une journée avec la bande',
      wrongGuess: 0,
      answers: [
        {
          text: 'Trainer à la cafète',
          points: 26,
          revealed: false,
        },
        {
          text: 'Faire de la musique',
          points: 26,
          revealed: false,
        },
        {
          text: 'Ne pas aller en cours',
          points: 7,
          revealed: false,
        },
        {
          text: 'Avoir des viennoiseries',
          points: 7,
          revealed: false,
        },
        {
          text: 'Se balader en voiture',
          points: 5,
          revealed: false,
        },
      ]
    },
    {
      text: "Quel est l'arc narratif le plus culte de la série ?",
      wrongGuess: 0,
      answers: [
        {
          text: 'Thomas Fava',
          points: 19,
          revealed: false,
        },
        {
          text: 'Le dernier épisode de HelG1',
          points: 8,
          revealed: false,
        },
        {
          text: 'Hélène et la drogue',
          points: 8,
          revealed: false,
        },
        {
          text: 'Christian et Johanna (et Linda)',
          points: 6,
          revealed: false,
        },
        {
          text: 'Christian et la drogue',
          points: 6,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel personnage aimerais-tu avoir comme parent ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Nicolas',
          points: 34,
          revealed: false,
        },
        {
          text: 'Hélène',
          points: 30,
          revealed: false,
        },
        {
          text: 'Bénédicte',
          points: 24,
          revealed: false,
        },
        {
          text: 'Seb',
          points: 6,
          revealed: false,
        },
        {
          text: 'Linda',
          points: 4,
          revealed: false,
        },
      ]
    },
    {
      text: "En moyenne, tu penses qu'on commence combien de temps après 10h ?",
      wrongGuess: 0,
      answers: [
        {
          text: '30 à 39 minutes',
          points: 35,
          revealed: false,
        },
        {
          text: '40 à 49 minutes',
          points: 21,
          revealed: false,
        },
        {
          text: '20 à 29 minutes',
          points: 19,
          revealed: false,
        },
        {
          text: '10 à 19 minutes',
          points: 9,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel membre de la bande serait le meilleur à une Famille en Or ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Nicolas',
          points: 29,
          revealed: false,
        },
        {
          text: 'Bénédicte',
          points: 22,
          revealed: false,
        },
        {
          text: 'Hélène',
          points: 15,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 9,
          revealed: false,
        },
        {
          text: 'Sebastien',
          points: 7,
          revealed: false,
        },
      ]
    },
    {
      text: "Quel élément de cette série quasi DOCUMENTAIRE te semble le plus invraisemblable ?",
      wrongGuess: 0,
      answers: [
        {
          text: "L'Argent",
          points: 22,
          revealed: false,
        },
        {
          text: "L'Immobilier",
          points: 16,
          revealed: false,
        },
        {
          text: 'Les Mannequins qui trainent avec des étudiants',
          points: 7,
          revealed: false,
        },
        {
          text: 'Avoir autant de potes',
          points: 5,
          revealed: false,
        },
        {
          text: 'Ne jamais aller en cours ou au travail',
          points: 5,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel contenu streamerait José sur Twitch ?',
      wrongGuess: 0,
      answers: [
        {
          text: 'Du contenu Mascu/Toxique/Redpill',
          points: 31,
          revealed: false,
        },
        {
          text: 'Du Just Chatting/React',
          points: 22,
          revealed: false,
        },
        {
          text: 'Du Gaming classique',
          points: 17,
          revealed: false,
        },
        {
          text: 'Du gaming miso/drague',
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
      origin: process.env.CLIENT_URL ? process.env.CLIENT_URL : "http://localhost:3000"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {

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