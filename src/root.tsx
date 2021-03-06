import React, { useState } from "react";

import { Content } from "./components/content/index";
import { Header } from "./components/header/index";

import styles from "./root.module.css";

function Root() {
  const [searchTerm, setSearchTerm] = useState("");

  function updateSearch(search: string) {
    setSearchTerm(search);
  }

  return (
    <main className={styles.app}>
      <Header search={searchTerm} handleSearchUpdate={updateSearch} />
      <Content search={searchTerm} />
    </main>
  );
}

export default Root;
