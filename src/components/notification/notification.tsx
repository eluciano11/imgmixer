import React, { ReactNode, memo, useMemo } from "react";

import styles from "./notification.module.css";

export enum NotificationMode {
  NONE = "NONE",
  SHOW = "SHOW",
  HIDE = "HIDE"
}

type Props = {
  mode: NotificationMode.NONE | NotificationMode.SHOW | NotificationMode.HIDE;
  direction: string;
  children: ReactNode;
  onHide?: () => void;
};

function Notification({ mode, direction, children, onHide }: Props) {
  const animation = useMemo(() => {
    if (onHide) {
      onHide();
    }

    return mode === NotificationMode.NONE
      ? ""
      : `${direction}${
          mode === NotificationMode.SHOW ? "SlideIn" : "SlideOut"
        }`;
  }, [mode]);

  return (
    <section
      className={`${styles.notification} ${styles[direction]} ${
        styles[animation]
      }`}
    >
      {children}
    </section>
  );
}

Notification.defaultProps = {
  direction: "right"
};

export default memo(Notification);
