import React, { memo, useState, useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import { Notification, NotificationMode } from "../../notification/index";
import styles from "./credits.module.css";

type Props = {
  author: string;
  profileLink: string;
  imageLink: string;
  creditMode:
    | NotificationMode.NONE
    | NotificationMode.SHOW
    | NotificationMode.HIDE;
  changeCreditMode: (state: NotificationMode) => void;
};

function Credits(props: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const handleClose = () => {
    props.changeCreditMode(NotificationMode.HIDE);
  };
  const handleCopy = () => {
    setIsCopied(true);
  };
  const handleHide = useCallback(() => {
    if (props.creditMode !== NotificationMode.NONE && isCopied) {
      setIsCopied(false);
    }
  }, [props.creditMode, isCopied]);

  return (
    <Notification mode={props.creditMode} onHide={handleHide}>
      <p className={styles.credit}>
        Photo by{" "}
        <a
          className="link"
          href={props.profileLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.author}
        </a>{" "}
        on{" "}
        <a
          className="link"
          href={props.imageLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </p>
      <div className={styles.buttons}>
        <CopyToClipboard
          text={`Photo by ${props.author} on Unsplash`}
          onCopy={handleCopy}
        >
          <button className="button button--secondary button--rounded">
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </CopyToClipboard>
        <button
          className="button button--primary button--rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Notification>
  );
}

export default memo(Credits);
