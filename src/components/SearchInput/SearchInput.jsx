import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const SearchInput = ({ setSearchQuery }) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value.trimStart();

    // Очистка предыдущего таймера
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Устанавливаем новый таймер
    const timeout = setTimeout(() => {
      setSearchQuery(value); // Обновляем запрос только после задержки
    }, 500); // Задержка в миллисекундах (500 = 0.5 секунды)

    setDebounceTimeout(timeout);
  };
  return (
    <Input
      placeholder="Type to search..."
      onChange={handleInputChange} // Добавляем обработчик изменения текста
    />
  );
};

SearchInput.propTypes = {
  setSearchQuery: PropTypes.fnc,
};

export default SearchInput;
