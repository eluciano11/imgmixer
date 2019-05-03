import React, { memo } from "react";

import SocialNetwork from "./social-network";
import { ISocialNetwork } from "../../content/utils";
import styles from "./social-networks.module.css";

type Props = {
  socialNetworks: Array<ISocialNetwork>;
};

function SocialNetworks({ socialNetworks }: Props) {
  if (socialNetworks.length > 0) {
    return (
      <ul className={`list--no-style ${styles.socialNetworks} hidden-xs`}>
        {socialNetworks.map((socialNetwork: ISocialNetwork, index: number) => (
          <li key={index} className={styles.network}>
            <a
              href={socialNetwork.username}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialNetwork
                type={socialNetwork.network}
                color="#000"
                height={20}
                width={20}
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

SocialNetworks.defaultProps = {
  socialNetworks: []
};

export default memo(SocialNetworks);
