import React, { SyntheticEvent } from "react";

import { Search } from "../search/index";
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
      <div className={styles.main}>
        <h2 className={styles.brand}>ImgMixer</h2>
        <form className={styles.formContainer} onSubmit={handleSearch}>
          <Search />
        </form>
      </div>
      <p className={`${styles.sourceCredit} hidden-xs`}>
        Powered by{" "}
        <a className="link" href="https://www.unsplash.com">
          Unsplash
        </a>
      </p>
    </header>
  );
}

export default Header;
