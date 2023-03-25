import { useSpring } from "@react-spring/web";
import { useState } from "react";

export function useAnimationPath({ delay }: { delay: number }) {
  const [length, setLength] = useState(0);
  const animationStyle = useSpring({
    from: {
      strokeDashoffset: length,
      strokeDasharray: length,
    },
    to: {
      strokeDashoffset: 0,
      strokeDasharray: length,
    },
    delay,
    config: {
      duration: 500,
    },
  });

  return {
    style: animationStyle,
    ref: (ref: SVGPathElement | null) => {
      if (ref) {
        setLength(ref.getTotalLength());
      }
    },
  };
}
