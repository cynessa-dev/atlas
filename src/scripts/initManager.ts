import { initSmoothScroll } from "../scripts/smoothScroll";
import { initHeader } from '../scripts/header';
import { initOverlay } from '../scripts/loadingOverlay';
import { initHero } from '../scripts/hero';

export const init = () => {
    initOverlay();

    window.addEventListener('loading:complete', (event) => {
        const { playHeroIntro } = (event as CustomEvent).detail;

        initSmoothScroll();
        initHeader();
        initHero({ playIntro: playHeroIntro });
    });
};