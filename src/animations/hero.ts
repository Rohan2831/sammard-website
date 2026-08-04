import { RefObject } from "react";
import { gsap } from "./gsap";

export function heroAnimation(
  section: RefObject<HTMLElement | null>,
  video: RefObject<HTMLVideoElement | null>,
  title: RefObject<HTMLHeadingElement | null>
) {
  const tl = gsap.timeline();

  tl.from(video.current, {
    opacity: 0,
    scale: 1.15,
    duration: 2,
    ease: "power3.out",
  })

    .from(
      title.current,
      {
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: "power4.out",
      },
      "-=1.2"
    );
}