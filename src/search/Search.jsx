import React, { useState } from 'react';
import './search.css';

function Search({ callFetchData }) {
  const [city, setCity] = useState(''); // Estado para armazenar a cidade digitada pelo usuário

  const handleChange = (event) => {
    // Atualiza o estado da cidade conforme o usuário digita no input
    setCity(event.target.value);
  };

  const handleClick = () => {
    // Verifica se o input não está vazio antes de chamar handleFetchData
    if (city.trim() !== '') {
      callFetchData(city);
    } 
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Digite a cidade" value={city} onChange={handleChange} onKeyDown={handleKeyDown}/>
      <button className="search-button" onClick={handleClick} disabled={city.trim() === ''}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
    </div>
  );
}

export default Search;
