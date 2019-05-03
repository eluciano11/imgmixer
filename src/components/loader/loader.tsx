import React, { memo } from "react";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={`${styles.loader} circle`}>
      <div className={`${styles.loaderInner} circle`} />
    </div>
  );
}

export default memo(Loader);
