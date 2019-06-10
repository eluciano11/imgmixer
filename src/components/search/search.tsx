import React from "react";

import { Search as SearchIcon } from "../../icons/index";
import styles from "./search.module.css";

export const Search = () => {
  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        name="search"
        type="text"
        placeholder="Search random high-resolution photos"
      />
      <button className="button button--plain" type="submit">
        <SearchIcon width={15} height={15} color="#000000" />
      </button>
    </div>
  );
};

export default Search;
