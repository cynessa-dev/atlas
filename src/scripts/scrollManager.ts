import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import { listenToHeroIntroCompleteEvent } from '../constants/events';

export const initScrollManager = () => {
  initSmoothScroll();
  toggleScroll(false); // Turn off scrolling to avoid user scrolling during the hero intro animation

  listenToHeroIntroCompleteEvent(() => {
    toggleScroll(true);
  });
};

const initSmoothScroll = () => {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });
};

const toggleScroll = (isScroll: boolean) => {
  gsap.set('body', {
    overflow: isScroll ? 'auto' : 'hidden',
  });
};
