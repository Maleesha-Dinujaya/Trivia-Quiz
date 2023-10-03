import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Venus', 'Jupiter'],
    answer: 'Mars',
  },
  {
    question: 'What is the largest mammal?',
    options: ['Elephant', 'Giraffe', 'Blue Whale', 'Hippopotamus'],
    answer: 'Blue Whale',
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerClick = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      { question: questions[currentQuestion].question, isCorrect },
    ]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      <h1>Trivia Quiz</h1>
      {showResults ? (
        <div>
          <h2>Quiz Results</h2>
          <p>Your Score: {score}/{questions.length}</p>
          <h3>Answers:</h3>
          <ul>
            {userAnswers.map((userAnswer, index) => (
              <li
                key={index}
                style={{
                  color: userAnswer.isCorrect ? 'green' : 'red',
                }}
              >
                {userAnswer.question} - {userAnswer.isCorrect ? 'Correct' : 'Wrong'}
              </li>
            ))}
          </ul>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <p>Question {currentQuestion + 1}/{questions.length}</p>
          <h3>{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(option)}
                style={{ cursor: 'pointer' }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
