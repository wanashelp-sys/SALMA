import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GamesGrid from './components/GamesGrid';
import GameContainer from './components/GameContainer';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [activeGame, setActiveGame] = useState(null);

  const startGame = (gameId) => {
    setActiveGame(gameId);
  };

  const closeGame = () => {
    setActiveGame(null);
    // Scroll back to games section
    setTimeout(() => {
      const gamesSection = document.getElementById('games-grid');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const scrollToGames = () => {
    const gamesSection = document.getElementById('games-grid');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <HeroSection onStart={scrollToGames} />
        <GamesGrid onStartGame={startGame} />
        {activeGame && (
          <GameContainer 
            gameId={activeGame} 
            onClose={closeGame} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
