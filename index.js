const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const defaultState = {
  gameStarted: false,
  currentQuestion: 0,
  points: 0,
  finalPoints: 0,
  isFinal: false,
  questions: [
    {
      text: 'Qu’aurais-tu voulu voler dans la maison du Miracle',
      wrongGuess: 0,
      revealed: false,
      answers: [
        {
          text: 'Apollon',
          points: 44,
          revealed: false,
        },
        {
          text: 'Viennoiseries',
          points: 17,
          revealed: false,
        },
        {
          text: 'Les jeux',
          points: 8,
          revealed: false,
        },
        {
          text: 'Le sac vert',
          points: 4,
          revealed: false,
        },
        {
          text: 'La photo de Seb',
          points: 3,
          revealed: false,
        },
        {
          text: 'Le tableau des courses',
          points: 2,
          revealed: false,
        } 
      ]
    },
    {
      text: 'Quel job ferais-tu à Love Island ?',
      wrongGuess: 0,
      revealed: false,
      answers: [
        {
          text: 'un job au Bar des Filles',
          points: 34,
          revealed: false,
        },
        {
          text: 'un job dans l’eau (Skipper ou Moniteur)',
          points: 24,
          revealed: false,
        },
        {
          text: 'Policier',
          points: 16,
          revealed: false,
        },
        {
          text: 'Rien',
          points: 11,
          revealed: false,
        },
        {
          text: 'Méchant',
          points: 11,
          revealed: false,
        },
        {
          text: 'Office du Tourisme',
          points: 4,
          revealed: false,
        },
        {
          text: 'Ouvrier qui tape sur rien',
          points: 3,
          revealed: false,
        }
      ]
    },
    {
      text: 'Quelle chanson AB est la plus culte ?',
      wrongGuess: 0,
      revealed: false,
      answers: [
        {
          text: 'Je m’appelle Hélène',
          points: 33,
          revealed: false,
        },
        {
          text: 'Pour l’Amour d’un Garçon',
          points: 16,
          revealed: false,
        },
        {
          text: 'Imagine/Tous les Oiseaux des Mers du Sud',
          points: 16,
          revealed: false,
        },
        {
          text: 'Amour Secret',
          points: 9,
          revealed: false,
        },
        {
          text: 'Le Miracle de L’Amour',
          points: 7,
          revealed: false,
        },
        {
          text: 'Les Vacances de l’Amour',
          points: 6,
          revealed: false,
        },
        {
          text: 'Peut-être qu’en Septembre',
          points: 3,
          revealed: false,
        }
      ]
    },
    {
      text: 'Quel personnage voudrais-tu être pour la journée ?',
      wrongGuess: 0,
      revealed: false,
      answers: [
        {
          text: 'Nicolas',
          points: 32,
          revealed: false,
        },
        {
          text: 'Bénédicte',
          points: 23,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 17,
          revealed: false,
        },
        {
          text: 'Seb',
          points: 7,
          revealed: false,
        },
        {
          text: 'José',
          points: 7,
          revealed: false,
        },
        {
          text: 'Johanna',
          points: 7,
          revealed: false,
        }
      ]
    },
    {
      text: 'Quel épisode du marathon culte des Vacances de l’Amour est le plus culte ?',
      wrongGuess: 0,
      revealed: false,
      answers: [
        {
          text: 'L’Extra-terrestre',
          points: 32,
          revealed: false,
        },
        {
          text: 'Carlos',
          points: 17,
          revealed: false,
        },
        {
          text: 'Le Premier Episode',
          points: 9,
          revealed: false,
        },
        {
          text: 'Le Céréales Killer',
          points: 6,
          revealed: false,
        },
        {
          text: 'Le Samouraï',
          points: 5,
          revealed: false,
        },
        {
          text: 'Le retour de Johanna',
          points: 4,
          revealed: false,
        }
      ]
    }
  ],
  finalQuestions: [
    {
      text: 'Quel personnage de la série mérite mieux ?',
      wrongGuess: 0,
      revealedAnswerFirstRunIndex: null,
      revealedAnswerSecondRunIndex: null,
      answers: [
        {
          text: 'Béné',
          points: 78,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 9,
          revealed: false,
        },
        {
          text: 'Olivier',
          points: 6,
          revealed: false,
        },
        {
          text: 'Johanna',
          points: 2,
          revealed: false,
        },
        {
          text: 'Jimmy',
          points: 2,
          revealed: false,
        },
        {
          text: 'Seb',
          points: 1,
          revealed: false,
        },
        {
          text: 'Nico',
          points: 1,
          revealed: false,
        },
        {
          text: 'Manuella',
          points: 1,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel personnage de la série serait le meilleur à Mario Kart World ?',
      wrongGuess: 0,
      revealedAnswerFirstRunIndex: null,
      revealedAnswerSecondRunIndex: null,
      answers: [
        {
          text: 'José',
          points: 30,
          revealed: false,
        },
        {
          text: 'Nicolas',
          points: 17,
          revealed: false,
        },
        {
          text: 'Seb',
          points: 16,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 13,
          revealed: false,
        },
        {
          text: 'Jimmy',
          points: 6,
          revealed: false,
        },
        {
          text: 'Olivier',
          points: 5,
          revealed: false,
        },
        {
          text: 'Béné',
          points: 3,
          revealed: false,
        },
        {
          text: 'Johanna',
          points: 3,
          revealed: false,
        },
        {
          text: 'Christophe',
          points: 2,
          revealed: false,
        },
        {
          text: 'Jeanne',
          points: 1,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel personnage de la série te manque le plus ?',
      wrongGuess: 0,
      revealedAnswerFirstRunIndex: null,
      revealedAnswerSecondRunIndex: null,
      answers: [
        {
          text: 'Seb',
          points: 45,
          revealed: false,
        },
        {
          text: 'Hélène',
          points: 20,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 5,
          revealed: false,
        },
        {
          text: 'Johanna',
          points: 5,
          revealed: false,
        },
        {
          text: 'Christophe',
          points: 3,
          revealed: false,
        },
        {
          text: 'Nicolas',
          points: 3,
          revealed: false,
        },
        {
          text: 'Rosie',
          points: 3,
          revealed: false,
        },
        {
          text: 'Béné',
          points: 2,
          revealed: false,
        },
        {
          text: 'José',
          points: 2,
          revealed: false,
        },
        {
          text: 'Olivier',
          points: 2,
          revealed: false,
        },
        {
          text: 'Christian',
          points: 2,
          revealed: false,
        },
        {
          text: 'Nathalie',
          points: 1,
          revealed: false,
        },
        {
          text: 'Manu',
          points: 1,
          revealed: false,
        },
        {
          text: 'Taxi',
          points: 1,
          revealed: false,
        },
      ]
    },
    {
      text: 'Quel personnage a la meilleure case de bingo associé ?',
      wrongGuess: 0,
      revealedAnswerFirstRunIndex: null,
      revealedAnswerSecondRunIndex: null,
      answers: [
        {
          text: 'Seb',
          points: 24,
          revealed: false,
        },
        {
          text: 'José',
          points: 24,
          revealed: false,
        },
        {
          text: 'Nico',
          points: 19,
          revealed: false,
        },
        {
          text: 'Béné',
          points: 7,
          revealed: false,
        },
        {
          text: 'Linda',
          points: 6,
          revealed: false,
        },
        {
          text: 'Nathalie',
          points: 6,
          revealed: false,
        },
        {
          text: 'Laly',
          points: 5,
          revealed: false,
        },
        {
          text: 'Olivier',
          points: 3,
          revealed: false,
        },
        {
          text: 'Jimmy',
          points: 2,
          revealed: false,
        },
        {
          text: 'Manuella',
          points: 1,
          revealed: false,
        },
        {
          text: 'Garcia',
          points: 1,
          revealed: false,
        },
   	   {
          text: 'Cynthia',
          points: 1,
          revealed: false,
        },
      ]
    },
    {
      text: 'Aurel Matin et/ou le club d’Aurélien, en un mot ?',
      wrongGuess: 0,
      revealedAnswerFirstRunIndex: null,
      revealedAnswerSecondRunIndex: null,
      answers: [
        {
          text: 'Culte',
          points: 32,
          revealed: false,
        },
        {
          text: 'Hyper',
          points: 31,
          revealed: false,
        },
        {
          text: 'Fun',
          points: 7,
          revealed: false,
        },        
        {
          text: 'Absurde',
          points: 4,
          revealed: false,
        },
        {
          text: 'Bingo',
          points: 3,
          revealed: false,
        },
        {
          text: 'Cotche',
          points: 3,
          revealed: false,
        },
        {
          text: 'Dinguerie',
          points: 2,
          revealed: false,
        },
        {
          text: 'Festivités',
          points: 2,
          revealed: false,
        },
        {
          text: 'Digression',
          points: 2,
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

  let timerInterval;
  let timerValue = 0;

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
    if(state.isFinal) {
      if(state.currentFinalQuestion > 0) {
        state.currentFinalQuestion--;
        socket.emit('stateUpdate', state);
        socket.broadcast.emit('stateUpdate', state);
      }
    } else {
      if(state.currentQuestion > 0) {
        state.currentQuestion--;
        socket.emit('stateUpdate', state);
        socket.broadcast.emit('stateUpdate', state);
      }
    }
  });

  socket.on('nextQuestion', () => {
      if(state.isFinal) {
        if(state.currentFinalQuestion < state.finalQuestions.length - 1) {
          state.currentFinalQuestion++;
          socket.emit('stateUpdate', state);
          socket.broadcast.emit('stateUpdate', state);
        }
      } else {
      if(state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion++;
        socket.emit('stateUpdate', state);
        socket.broadcast.emit('stateUpdate', state);
      }
    }
  });

  socket.on('showQuestion', () => {
    state.questions[state.currentQuestion].revealed = true;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('stateUpdate', state);
  });

  socket.on('answerReveal', (answerId) => {
    state.questions[state.currentQuestion].revealed = true;
    state.questions[state.currentQuestion].answers.find((answer, index) => index === answerId).revealed = true;
    if(state.questions[state.currentQuestion].wrongGuess < 3) {
      if(state.currentQuestion < 3){
        state.points += state.questions[state.currentQuestion].answers.find((answer, index) => index === answerId).points;
      }else if(state.currentQuestion === 3){
        state.points += state.questions[state.currentQuestion].answers.find((answer, index) => index === answerId).points * 2;
      } else if(state.currentQuestion === 4){
        state.points += state.questions[state.currentQuestion].answers.find((answer, index) => index === answerId).points * 3;
      }
    }
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('answerReveal', state);
  });

  socket.on('wrongGuess', () => {
    state.questions[state.currentQuestion].wrongGuess++;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('wrongGuess', state);
  });
  
  socket.on('startCredits', () => {
    socket.broadcast.emit('playCredits');
  });

  socket.on('stopCredits', () => {
    socket.broadcast.emit('stopCredits');
  });

  socket.on('activateFinal', () => {
    state.isFinal = true;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('stateUpdate', state);
  });

  socket.on('deactivateFinal', () => {
    state.isFinal = false;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('stateUpdate', state);
  });

  socket.on('startFinal', (duration) => {
    timerValue = duration;
    socket.emit('startFinalTimer', duration);
    socket.broadcast.emit('startFinalTimer', duration);
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerValue--;
      socket.emit('finalTimerUpdate', timerValue);
      socket.broadcast.emit('finalTimerUpdate', timerValue);
      if(timerValue <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  });

  socket.on('pauseFinalTimer', () => {
    clearInterval(timerInterval);
  });

  socket.on('resumeFinalTimer', () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerValue--;
      socket.emit('finalTimerUpdate', timerValue);
      socket.broadcast.emit('finalTimerUpdate', timerValue);
      if(timerValue <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  });

  socket.on('revealFinalQuestionFirstRun', ({ questionIndex, answerIndex }) => {
    state.finalQuestions[questionIndex].revealedAnswerFirstRunIndex = answerIndex;
    state.finalPoints += state.finalQuestions[questionIndex].answers.find((answer, index) => index === answerIndex).points;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('revealFinalAnswer', state);
  });

  socket.on('revealFinalQuestionSecondRun', ({ questionIndex, answerIndex }) => {
    state.finalQuestions[questionIndex].revealedAnswerSecondRunIndex = answerIndex;
    state.finalPoints += state.finalQuestions[questionIndex].answers.find((answer, index) => index === answerIndex).points;
    socket.emit('stateUpdate', state);
    socket.broadcast.emit('revealFinalAnswer', state);
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