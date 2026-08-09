import gsap from 'gsap';

import { listenToHeroIntroCompleteEvent } from '../constants/events';

export const initScrollManager = () => {
    toggleScroll(false);

    listenToHeroIntroCompleteEvent(() => {
        toggleScroll(true);
    });

};

const toggleScroll = (isScroll: boolean) => {
    gsap.set('body', {
        overflow: isScroll ? 'auto' : 'hidden',
    });
};