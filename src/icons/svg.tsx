import React, { ReactNode, memo } from "react";

import { Icon } from "./utils";

interface SVGInterface extends Icon {
  viewBox: string;
  children: ReactNode;
}

function SVG(props: SVGInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox={props.viewBox}
      height={props.height}
      width={props.width}
      color={props.color}
    >
      {props.children}
    </svg>
  );
}

export default memo(SVG);
