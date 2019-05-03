import React, { memo } from "react";

import { CardTransitions } from "../content/card/index";
import { IUser } from "../content/utils";
import { SocialNetworks } from "./social-networks/index";
import { Stats } from "./stats/index";
import { User } from "./user/index";
import styles from "./profile.module.css";

interface Props extends IUser {
  transition:
    | CardTransitions.NONE
    | CardTransitions.SLIDE_OUT
    | CardTransitions.STEP_IN;
}

function Profile(props: Props) {
  return (
    <aside
      className={`${styles.profile} ${
        props.transition === CardTransitions.SLIDE_OUT ? styles.blur : ""
      }`}
    >
      <User
        avatar={props.avatar}
        fullname={`${props.firstName} ${props.lastName}`}
        username={props.username}
      />
      <SocialNetworks socialNetworks={props.socialNetworks} />
      <Stats stats={props.stats} />
      <p className={`${styles.bio} hidden-xs`}>{props.bio}</p>
    </aside>
  );
}

export default memo(Profile);
