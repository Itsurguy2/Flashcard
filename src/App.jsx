import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Array of flashcards with images, categories (difficulty or subject)
  const flashcards = [
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      category: 'Geography',
      difficulty: 'Easy',
    },
    {
      question: 'What is H2O?',
      answer: 'Water',
      category: 'Chemistry',
      difficulty: 'Medium',
    },
    {
      question: 'What is the acceleration due to gravity?',
      answer: '9.8 m/s²',
      category: 'Physics',
      difficulty: 'Hard',
    },
    {
      question: 'What planet is closest to the sun?',
      answer: 'Mercury',
      category: 'Astronomy',
      difficulty: 'Medium',
    },
    {
      question: 'What is the largest mammal?',
      answer: 'Blue Whale',
      category: 'Biology',
      difficulty: 'Hard',
    },
    {
      question: 'What is the chemical symbol for gold?',
      answer: 'Au',
      category: 'Chemistry',
      difficulty: 'Easy',
    },
    {
      question: 'What is the main language spoken in Brazil?',
      answer: 'Portuguese',
      category: 'Languages',
      difficulty: 'Medium',
    },
    {
      question: 'What is the largest planet in our solar system?',
      answer: 'Jupiter',
      category: 'Astronomy',
      difficulty: 'Hard',
    },
    {
      question: 'What is the powerhouse of the cell?',
      answer: 'Mitochondria',
      category: 'Biology',
      difficulty: 'Medium',
    },
    {
      question: 'What is the formula for calculating the area of a circle?',
      answer: 'πr²',
      category: 'Mathematics',
      difficulty: 'Hard',
    },
    {
      question: 'What is the smallest prime number?',
      answer: '2',
      category: 'Mathematics',
      difficulty: 'Easy',
    },
    {
      question: 'What is the main ingredient in guacamole?',
      answer: 'Avocado',
      category: 'Culinary',
      difficulty: 'Medium',
    },
    {
      question: 'What is the capital of Japan?',
      answer: 'Tokyo',
      category: 'Geography',
      difficulty: 'Hard',
    },
    {
      question: 'What is the speed of light?',
      answer: '299,792 km/s',
      category: 'Physics',
      difficulty: 'Medium',
    },
    {
      question: 'What is the largest organ in the human body?',
      answer: 'Skin',
      category: 'Biology',
      difficulty: 'Easy',
    },
    {
      question: 'What is the main language spoken in China?',
      answer: 'Mandarin',
      category: 'Languages',
      difficulty: 'Hard',
    },
    {
      question: 'What is the chemical symbol for silver?',
      answer: 'Ag',
      category: 'Chemistry',
      difficulty: 'Easy',
    },
    {
      question: 'What is the largest desert in the world?',
      answer: 'Sahara Desert',
      category: 'Geography',
      difficulty: 'Medium',
    },
  ];

  function Flashcard({ flashcard }) {
    return (
      <div className="flashcard">
        <h2>{flashcard.question}</h2>
        <img src={flashcard.imageSrc} alt="Flashcard" />
        <p>{flashcard.answer}</p>
      </div>
    );
  }

  // State to track the current card and whether to show the question or answer
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);

  // Function to get a random card
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentCardIndex(randomIndex);
    setShowQuestion(true); // Show the question again when switching to a new card
  };

  // Get the current card based on the current index
  const currentCard = flashcards[currentCardIndex];

  // Function to get the background color based on difficulty or category
  const getCardColor = () => {
    switch (currentCard.difficulty) {
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

  return (
    <div className="App">
      <h1>Flashcard Study</h1>
      <p>Study your flashcards to learn something new!</p>
      <p>Total Cards: {flashcards.length}</p>

      {/* Flashcard Box */}
      <div
        className="card"
        onClick={() => setShowQuestion(!showQuestion)} // Toggle between question and answer
        style={{ backgroundColor: getCardColor() }} // Dynamically set the background color
      >
        <div className="card-face front">
          <h2>{currentCard.question}</h2>
          <img src={currentCard.imageSrc} alt="🥇" className="card-image" />
        </div>
        <div className="card-face back">
          <h2>{currentCard.answer}</h2>
          <img src={currentCard.imageSrc} alt="🏆" className="card-image" />
        </div>
      </div>

      {/* Button to load a random card */}
      <button onClick={getRandomCard}>Next Card</button>
    </div>
  );
};

export default App;
