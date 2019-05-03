import React, { memo } from "react";

import { Stat } from "../../content/utils";
import styles from "./stats.module.css";

type Props = {
  stats: Array<Stat>;
};

function Stats({ stats }: Props) {
  if (stats.length > 0) {
    return (
      <ul className={`${styles.stats} list--no-style hidden-xs`}>
        {stats.map((stat: Stat, index: number) => (
          <li key={index} className={styles.stat}>
            <div className="text--bold">{stat.count}</div>
            {}
            <div className={`text--uppercase text--small ${styles.title}`}>
              {stat.type}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

Stats.defaultProps = {
  stats: []
};

export default memo(Stats);
