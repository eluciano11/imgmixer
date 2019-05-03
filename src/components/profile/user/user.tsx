import React, { memo } from "react";

import styles from "./user.module.css";

type Props = {
  avatar: string;
  fullname: string;
  username: string;
};

function User({ avatar, fullname, username }: Props) {
  return (
    <div className={styles.userInformation}>
      <img
        className={`${styles.avatar} circle`}
        src={avatar}
        alt="User avatar"
      />
      <section className={`${styles.user}`}>
        <h3 className={`text--ellipsis ${styles.header}`}>{fullname}</h3>
        <a
          className="text--small link"
          href={`https://unsplash.com/@${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{username}
        </a>
      </section>
    </div>
  );
}

export default memo(User);
