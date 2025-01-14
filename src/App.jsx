import { useState } from 'react';
import HeadTabs from './components/HeadTabs/HeadTabs';
import SearchInput from './components/SearchInput/SearchInput';
import MoviesList from './components/MoviesList/MoviesList';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('search');

  return (
    <div className="container">
      <HeadTabs setCurrentTab={setCurrentTab} />
      <SearchInput setSearchQuery={setSearchQuery} />
      <MoviesList searchQuery={searchQuery} currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default App;
