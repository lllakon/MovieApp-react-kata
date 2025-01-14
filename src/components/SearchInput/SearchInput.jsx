import { Input } from 'antd';
import { useState } from 'react';

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

export default SearchInput;
