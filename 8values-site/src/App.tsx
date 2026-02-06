import { useState } from 'react';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import type { Effect } from './types';

type PageState = 'landing' | 'quiz' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [results, setResults] = useState<Effect | null>(null);

  const handleQuizFinish = (stats: Effect) => {
    setResults(stats);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {currentPage === 'landing' && (
        <Landing onStart={() => setCurrentPage('quiz')} />
      )}
      {currentPage === 'quiz' && (
        <Quiz onFinish={handleQuizFinish} />
      )}
      {currentPage === 'results' && results && (
        <Results stats={results} onRestart={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;
