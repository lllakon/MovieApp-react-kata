import HeadTabs from './components/HeadTabs/HeadTabs';
import SearchInput from './components/SearchInput/SearchInput';
import MoviesList from './components/MoviesList/MoviesList';
import { useState } from 'react';
import './index.css';

// Tabs должны передавать свой статус в фетч
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
