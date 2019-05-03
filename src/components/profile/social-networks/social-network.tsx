import React from "react";

import { Instagram, Twitter } from "../../../icons/index";
import { Icon } from "../../../icons/utils";
import { networks } from "../../content/utils";

interface SocialNetworkInterface extends Icon {
  type: networks.INSTAGRAM | networks.TWITTER;
}

function SocialNetwork(props: SocialNetworkInterface) {
  switch (props.type) {
    case networks.INSTAGRAM:
      return (
        <Instagram
          color={props.color}
          height={props.height}
          width={props.width}
        />
      );

    case networks.TWITTER:
      return (
        <Twitter
          color={props.color}
          height={props.height}
          width={props.width}
        />
      );

    default:
      return null;
  }
}

export default SocialNetwork;
