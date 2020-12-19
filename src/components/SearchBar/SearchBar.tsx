import React, { FunctionComponent, ChangeEvent, useState } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  search: (query: string) => void;
}

const SearchBar: FunctionComponent<Props> = ({ search }) => {
  const [query, setQuery] = useState("");

  const inputHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const text: string = event.target.value;
    setQuery(text);
  };

  return (
    <div className={styles.search}>
      <div className={styles["search-bar"]}>
        <input
          type="search"
          className={styles["search-bar__input"]}
          placeholder="Title, companies, expertise or benefits"
          onChange={inputHandle}
        />
        <input
          type="submit"
          value="Search"
          className={styles["search-bar__submit"]}
          onClick={() => search(query)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
