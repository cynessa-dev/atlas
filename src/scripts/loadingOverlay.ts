import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { initBrandIcon } from './brandIcon';

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeroElements = {
    overlayContainerElement: HTMLElement;
    bootContainerElement: HTMLElement;
    bootMessageElements: NodeListOf<HTMLElement>;
    kernelElement: HTMLElement;
};

const LOADING_COMPLETE_EVENT = 'loading:complete';

const LOADING_ICONS = ['|', '/', '-', '\\'];
const SPINNER_INTERVAL_MS = 50;

export const initOverlay = () => {
    const elements = getOverlayElements();

    if (!elements) return;

    playAnimations(elements);
};

const getOverlayElements = (): HeroElements | null => {
    const overlayContainerElement = document.getElementById('loading-overlay');
    const bootContainerElement = document.querySelector<HTMLElement>('[data-boot-container]');
    const bootMessageElements = document.querySelectorAll<HTMLElement>('[data-boot-message]');
    const kernelElement = document.getElementById('kernel');

    if (
        !overlayContainerElement ||
        !bootContainerElement ||
        bootMessageElements.length === 0 ||
        !kernelElement
    ) return null;

    return {
        overlayContainerElement,
        bootContainerElement,
        bootMessageElements,
        kernelElement,
    };
};

const playAnimations = (elements: HeroElements) => {
    const introTimeline = gsap.timeline();

    toggleScroll(introTimeline, false);
    animateBootMessages(introTimeline, elements.bootContainerElement, elements.bootMessageElements);
    animateKernel(introTimeline, elements.kernelElement);
    toggleScroll(introTimeline, true);
    hideOverlay(introTimeline, elements.overlayContainerElement);
};

// ====================
// ANIMATIONS
// ====================

const toggleScroll = (introTimeline: gsap.core.Timeline, isScroll: boolean) => {
    introTimeline
        .set('body', {
            overflow: isScroll ? 'auto' : 'hidden',
        });
}

const animateBootMessages = (
    introTimeline: gsap.core.Timeline,
    bootContainerElement: HTMLElement,
    bootMessageElements: NodeListOf<HTMLElement>,
) => {

    bootMessageElements.forEach((message) => {
        const loading = message.dataset.bootLoading === 'true';
        const duration = Number(message.dataset.bootSeconds);

        introTimeline.from(message, {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'sine.in'
        });

        if (loading) {
            animateLoading(introTimeline, message, duration);
        }
    });

    introTimeline
        .to(bootContainerElement, {
            autoAlpha: 0,
            duration: 0.1,
            ease: 'sine.out',
            onComplete: () => {
                bootContainerElement.remove();
            },
        });
};

const animateKernel = (introTimeline: gsap.core.Timeline, kernelElement: HTMLElement) => {
    introTimeline
        .set(kernelElement, { display: 'flex' })
        .from(kernelElement, {
            autoAlpha: 0,
            duration: 0.2,
            onStart: initBrandIcon,
        })
        .to(kernelElement, {
            autoAlpha: 0,
            duration: 0.2,
            delay: 1.0,
            onComplete: () => kernelElement.remove(),
        });
};

const hideOverlay = (introTimeline: gsap.core.Timeline, overlayElement: HTMLElement) => {
    introTimeline.set(overlayElement, {
        display: 'none' 
    })
    .call(triggerLoadingCompleteEvent);
}

// ====================
// UTILITY ANIMATION
// ====================

const animateLoading = (timeline: gsap.core.Timeline, messageElement: HTMLElement, duration: number) => {
    const originalText = messageElement.textContent ?? '';
    let lastUpdate = 0;
    let frameIndex = 0;

    timeline.to({}, {
        duration,
        onUpdate: () => {
            const now = performance.now();

            if (now - lastUpdate < SPINNER_INTERVAL_MS) return;

            lastUpdate = now;
            messageElement.textContent = originalText + ' ' + LOADING_ICONS[frameIndex];
            frameIndex = (frameIndex + 1) % LOADING_ICONS.length;
        },
        onComplete: () => {
            messageElement.textContent = originalText + '... OK';
        }
    });
};

const triggerLoadingCompleteEvent = () => {
    window.dispatchEvent(new CustomEvent(LOADING_COMPLETE_EVENT));
};