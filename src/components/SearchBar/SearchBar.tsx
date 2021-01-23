import React, { FC, ChangeEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import Loader from 'react-loader-spinner';

interface Props {
  search: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: FC<Props> = ({ search, isLoading }: Props) => {
  const [query, setQuery] = useState('');

  const inputHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const text: string = event.target.value;
    setQuery(text);
  };

  return (
    <div className={styles.search}>
      <div className={styles['search-bar']}>
        <input
          type="search"
          className={styles['search-bar__input']}
          placeholder="Title, companies, expertise or benefits"
          onChange={inputHandle}
          onKeyUp={(e) => {
            e.key === 'Enter' && search(query);
          }}
        />
        <button
          value="Search"
          className={styles['search-bar__submit']}
          onClick={() => search(query)}
          disabled={isLoading || !query.length}
        >
          {isLoading ? <Loader type="Oval" color="#fff" height="20" width="50" /> : <span>Search</span>}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
