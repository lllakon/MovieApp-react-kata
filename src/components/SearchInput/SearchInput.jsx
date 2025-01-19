import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const SearchInput = ({ setSearchQuery }) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value.trimStart();

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, 500);

    setDebounceTimeout(timeout);
  };
  return <Input placeholder="Type to search..." onChange={handleInputChange} />;
};

SearchInput.propTypes = {
  setSearchQuery: PropTypes.func,
};

export default SearchInput;
