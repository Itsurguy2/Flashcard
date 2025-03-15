import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialFlashcards = [
    { question: 'What is the capital of France?', answer: 'Paris', category: 'Geography', difficulty: 'Easy' },
    { question: 'What is H2O?', answer: 'Water', category: 'Chemistry', difficulty: 'Medium' },
    { question: 'What is the acceleration due to gravity?', answer: '9.8 m/s²', category: 'Physics', difficulty: 'Hard' },
    { question: 'What planet is closest to the sun?', answer: 'Mercury', category: 'Astronomy', difficulty: 'Medium' },
    { question: 'What is the largest mammal?', answer: 'Blue Whale', category: 'Biology', difficulty: 'Hard' },
    { question: 'What is the chemical symbol for gold?', answer: 'Au', category: 'Chemistry', difficulty: 'Easy' },
    { question: 'What is the main language spoken in Brazil?', answer: 'Portuguese', category: 'Languages', difficulty: 'Medium' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter', category: 'Astronomy', difficulty: 'Hard' },
    { question: 'What is the powerhouse of the cell?', answer: 'Mitochondria', category: 'Biology', difficulty: 'Medium' },
    { question: 'What is the formula for calculating the area of a circle?', answer: 'πr²', category: 'Mathematics', difficulty: 'Hard' },
    { question: 'What is the smallest prime number?', answer: '2', category: 'Mathematics', difficulty: 'Easy' },
    { question: 'What is the main ingredient in guacamole?', answer: 'Avocado', category: 'Culinary', difficulty: 'Medium' },
    { question: 'What is the capital of Japan?', answer: 'Tokyo', category: 'Geography', difficulty: 'Hard' },
    { question: 'What is the speed of light?', answer: '299,792 km/s', category: 'Physics', difficulty: 'Medium' },
    { question: 'What is the largest organ in the human body?', answer: 'Skin', category: 'Biology', difficulty: 'Easy' },
    { question: 'What is the main language spoken in China?', answer: 'Mandarin', category: 'Languages', difficulty: 'Hard' },
    { question: 'What is the chemical symbol for silver?', answer: 'Ag', category: 'Chemistry', difficulty: 'Easy' },
    { question: 'What is the largest desert in the world?', answer: 'Sahara Desert', category: 'Geography', difficulty: 'Medium' },
  ];

  // State variables
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State for feedback

  // Function to shuffle flashcards
  const shuffleCards = () => {
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFlashcards(shuffled);
    setCurrentCardIndex(0); // Start from the first card after shuffle
  };

  // Fuzzy matching function (case insensitive and trims whitespaces)
  const isAnswerCorrect = (userAnswer, correctAnswer) => {
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  };

  // Handle answer submission
  const handleAnswer = () => {
    const currentCard = flashcards[currentCardIndex];
    const correct = isAnswerCorrect(userAnswer, currentCard.answer);

    if (correct) {
      setFeedbackMessage('Correct!'); // Display correct feedback
      setCorrectStreak(correctStreak + 1);
      if (correctStreak + 1 > longestStreak) {
        setLongestStreak(correctStreak + 1);
      }
    } else {
      setFeedbackMessage('Incorrect!'); // Display incorrect feedback
      setCorrectStreak(0); // Reset streak on incorrect answer
    }
  };

  // Mark card as mastered
  const markAsMastered = () => {
    const currentCard = flashcards[currentCardIndex];
    setMasteredCards([...masteredCards, currentCard]);
    setFlashcards(flashcards.filter(card => card !== currentCard)); // Remove mastered card
  };

  // Get the current flashcard
  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="App">
      <h1>Flashcard Study</h1>
      <p>Study your flashcards to learn something new!</p>
      <p>Total Cards: {flashcards.length}</p>

      {/* Flashcard Box */}
      <div
        className="card"
        onClick={() => setShowQuestion(!showQuestion)} // Toggle between question and answer
        style={{ backgroundColor: getCardColor() }}
      >
        <div className="card-face front">
          <h2>{currentCard.question}</h2>
        </div>
        <div className="card-face back">
          <h2>{currentCard.answer}</h2>
        </div>
      </div>

      {/* Input for user's answer */}
      <input
        type="text"
        placeholder="Your Answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={handleAnswer}>Submit Answer</button>

      {/* Feedback message */}
      {feedbackMessage && (
        <div className={`feedback ${feedbackMessage === 'Correct!' ? 'correct' : 'incorrect'}`}>
          {feedbackMessage}
        </div>
      )}

      {/* Buttons */}
      <button onClick={() => setCurrentCardIndex((index) => (index + 1) % flashcards.length)}>Next Card</button>
      <button onClick={shuffleCards}>Shuffle Cards</button>
      <button onClick={markAsMastered}>Mark as Mastered</button>

      {/* Streak Info */}
      <p>Current Streak: {correctStreak}</p>
      <p>Longest Streak: {longestStreak}</p>

      {/* Mastered Cards */}
      <h3>Mastered Cards:</h3>
      <ul>
        {masteredCards.map((card, index) => (
          <li key={index}>{card.question}</li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to determine the background color based on difficulty
const getCardColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'lightgreen';
    case 'Medium':
      return 'lightyellow';
    case 'Hard':
      return 'lightcoral';
    default:
      return 'lightblue';
  }
};

export default App;
