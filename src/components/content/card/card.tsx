import React, { memo, useRef, useEffect } from "react";

import styles from "./card.module.css";

export enum CardTransitions {
  NONE = "",
  SLIDE_OUT = "SLIDE_OUT",
  STEP_IN = "STEP_IN"
}

type Props = {
  transition:
    | CardTransitions.NONE
    | CardTransitions.SLIDE_OUT
    | CardTransitions.STEP_IN;
  url: string;
  alt: string;
  imageLink: string;
  onFinishSlideOut: () => void;
};

function Card({ transition, url, alt, imageLink, onFinishSlideOut }: Props) {
  let cardRef = useRef<HTMLElement>(null);
  const stepIn = () => {
    if (cardRef.current) {
      const animation = cardRef.current.animate(
        [
          { offset: 0, opacity: 0, transform: "scale(0)" },
          { offset: 0.2, opacity: 1, transform: "scale(0)" },
          { offset: 1, opacity: 1, transform: "scale(1)" }
        ],
        {
          duration: 600,
          easing: "linear",
          fill: "forwards"
        }
      );

      animation.onfinish = () => {
        console.log("finished");
      };
    }
  };
  const slideOut = () => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.getBoundingClientRect().width;
      const animation = cardRef.current.animate(
        {
          transform: ["translateX(0)", `translateX(${cardWidth * 3}px)`]
        },
        {
          duration: 800,
          easing: "linear",
          fill: "forwards"
        }
      );

      animation.onfinish = onFinishSlideOut;
    }
  };

  const handleAnimation = () => {
    switch (transition) {
      case CardTransitions.SLIDE_OUT:
        requestAnimationFrame(slideOut);
        break;

      case CardTransitions.STEP_IN:
        requestAnimationFrame(stepIn);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    handleAnimation();
  }, [transition]);

  return (
    <div className={styles.container}>
      <figure ref={cardRef} className={styles.card}>
        <a href={imageLink} target="_blank" rel="noopener noreferrer">
          <img
            className={styles.image}
            src={url}
            alt={alt || "Photo from unsplash"}
          />
        </a>
      </figure>
    </div>
  );
}

export default memo(Card);
