import { useEffect, useRef, useState } from "react";
import styles from "./LetterBox.module.scss";

interface Props {
  cycle?: number;
  delay?: number;
  index?: number;
  children: string;
}

const LetterBox = ({ cycle = 2000, delay = 0, index = 1, children }: Props) => {
  // const [isBold, setIsBold] = useState(true);
  // const turn = isBold ? "bold" : "fade";
  const animationRef = useRef<Animation | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isBold = true;
    let animationStarted = false;

    // Start animation after the specified delay
    const startAnimation = () => {
      setTimeout(() => {
        animationStarted = true;
        animate();
      }, delay);
    };

    const animate = () => {
      if (!animationStarted || !boxRef.current) return;

      if (boxRef.current) {
        const element = boxRef.current;

        if (animationRef.current) {
          animationRef.current.cancel();
        }

        const keyframes: Keyframe[] = [
          { transform: "scale(1)" },
          { transform: "scale(1.2)" },
        ];

        const options: KeyframeAnimationOptions = {
          duration: 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        };

        animationRef.current = isBold
          ? element.animate(keyframes, options)
          : element.animate(keyframes.reverse(), options);

        animationRef.current.onfinish = () => {
          isBold = !isBold;
          setTimeout(animate, cycle - 500);
        };
      }
    };

    startAnimation();

    return () => {
      if (boxRef.current) {
        boxRef.current.getAnimations().forEach((anim) => anim.cancel());
      }
    };
  }, [cycle, delay]);

  return (
    <div className={styles.cover}>
      <div ref={boxRef} className={styles.box}>
        {children}
      </div>
    </div>
  );
};

export default LetterBox;
