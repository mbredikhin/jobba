import React, { Component, ChangeEvent } from "react";
import styles from "./SearchBar.module.css";
import { debounce } from "../../utils";

interface SearchBarIProps {
  search: (query: string) => void;
}

interface SearchBarIState {
  query: string;
  placeholder: string;
}

export default class SearchBar extends Component<SearchBarIProps, SearchBarIState> {
  constructor (props: SearchBarIProps){
    super(props);
    this.state = { query: "", placeholder: "Title, companies, expertise or benefits" };
  }

  changeQuery = (event: ChangeEvent<HTMLInputElement>): void  => {
    if (event.target.value.length) {
      this.setState({
        query: event.target.value,
      });
      this.props.search(this.state.query);
    }
  }

  inputHandle = (e: ChangeEvent<HTMLInputElement>): void  => {
    e.persist();
    debounce.call(this, this.changeQuery, 1000, e);
  }

  render() {
    return (
      <div className={styles.search}>
        <div className={styles["search-bar"]}>
          <input
            type="search"
            className={styles["search-bar__input"]}
            placeholder={this.state.placeholder}
            onChange={this.inputHandle}
          />
          <input
            type="submit"
            value="Search"
            className={styles["search-bar__submit"]}
            onClick={() => this.props.search(this.state.query)}
          />
        </div>
      </div>
    );
  }
}
