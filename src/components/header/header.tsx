import React, { SyntheticEvent } from "react";

import styles from "./header.module.css";

type Props = {
  search: string;
  handleSearchUpdate: (searchTerm: string) => void;
};

function Header(props: Props) {
  async function handleSearch(event: SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    props.handleSearchUpdate(target.search.value);
  }

  return (
    <header className={styles.header}>
      <form onSubmit={handleSearch}>
        <input
          className={styles.search}
          name="search"
          type="text"
          placeholder="Search random high-resolution photos"
        />
      </form>
    </header>
  );
}

export default Header;
