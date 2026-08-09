import { initSmoothScroll } from "../scripts/smoothScroll";
import { initHeader } from '../scripts/header';
import { initOverlay } from '../scripts/loadingOverlay';
import { initHero } from '../scripts/hero';
import { initScrollManager } from "./scrollManager";
import { listenToLoadingCompleteEvent } from '../constants/events';

export const init = () => {
    initScrollManager();
    initOverlay();

    listenToLoadingCompleteEvent((event) => {
        const { isQuickload } = (event as CustomEvent).detail;

        initSmoothScroll();
        initHeader();
        initHero({ isQuickload });
    });
};