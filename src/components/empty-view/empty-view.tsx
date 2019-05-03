import React from "react";

import styles from "./empty-view.module.css";

type Props = {
  emoji: string;
  header: string;
  message: string;
};

function EmptyView({ emoji, header, message }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>{emoji}</div>
      <h2>{header}</h2>
      <p>{message}</p>
    </div>
  );
}

EmptyView.defaultProps = {
  emoji: "😔"
};

export default EmptyView;
