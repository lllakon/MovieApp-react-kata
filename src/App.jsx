import { useState } from 'react';
import { Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import HeadTabs from './components/HeadTabs/HeadTabs';
import SearchInput from './components/SearchInput/SearchInput';
import MoviesList from './components/MoviesList/MoviesList';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('search');

  return (
    <div className="container">
      <Online>
        <HeadTabs setCurrentTab={setCurrentTab} />
        <SearchInput setSearchQuery={setSearchQuery} />
        <MoviesList searchQuery={searchQuery} currentTab={currentTab} />
      </Online>

      <Offline>
        <div className="offline">
          <Alert style={{padding: '40px 80px'}} type="error" message={`You're offline right now. Check your connection.`} />
        </div>
      </Offline>
    </div>
  );
}

export default App;
