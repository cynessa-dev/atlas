import { initSmoothScroll } from "../scripts/smoothScroll";
import { initHeader } from '../scripts/header';
import { initOverlay } from '../scripts/loadingOverlay';
import { initHero } from '../scripts/hero';
import { listenToLoadingCompleteEvent } from '../constants/events';

export const init = () => {
    initOverlay();

    listenToLoadingCompleteEvent((event) => {
        const { playHeroIntro } = (event as CustomEvent).detail;

        initSmoothScroll();
        initHeader();
        initHero({ playIntro: playHeroIntro });
    });
};