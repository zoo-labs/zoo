import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// toggleAction: onEnter, onLeave, onEnterBack, onLeaveBack
export const fadeInOnScroll = (element: string, duration = 1) => {
  return gsap.from(element, {
    duration: duration,
    autoAlpha: 0,
    y: 50,
    ease: "ease-in",
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      toggleActions: "restart none none none",
    },
  });
};

export const fadeInFromRight = (element: string, ease = "ease-in") => {
  gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 0.9,
    ease: ease,
    scrollTrigger: {
      trigger: element,
      start: "top 70%",
      toggleActions: "play none none none",
    },
  });
};

export const fadeInFromRightFast = (element: string) => {
  gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 0.7,
    ease: Power4.easeInOut,
    scrollTrigger: {
      trigger: element,
      start: "top 70%",
      toggleActions: "play none none none",
    },
  });
};

export const fadeInFromLeft = (element: string, ease = "ease-in") => {
  gsap.from(element, {
    opacity: 0,
    duration: 0.9,
    x: -100,
    ease: ease,
    scrollTrigger: {
      trigger: element,
      start: "top 70%",
      // end: "bottom 80%",
      toggleActions: "play none none none",
    },
  });
};

export const fadeInFromLeftFast = (element: string) => {
  gsap.from(element, {
    opacity: 0,
    duration: 0.7,
    x: -100,
    ease: Power4.easeInOut,
    scrollTrigger: {
      trigger: element,
      start: "top 70%",
      // end: "bottom 80%",
      toggleActions: "play none none none",
    },
  });
};

export const fadeInOnScrollAndStagger = (element: string, trigger?: string) => {
  gsap.from(element, {
    duration: 1.5,
    autoAlpha: 0,
    y: 60,
    ease: "ease-in",
    stagger: {
      each: 0.3,
      ease: "back4",
    },
    scrollTrigger: {
      fastScrollEnd: true,
      trigger: trigger,
      start: "top 90%",
      end: "bottom center",
      toggleActions: "play none none none",
    },
  });
};
