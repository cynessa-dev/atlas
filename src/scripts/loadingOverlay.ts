import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { initBrandIcon } from './brandIcon';
import { triggerLoadingCompleteEvent } from '../constants/events';

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeroElements = {
    overlayContainerElement: HTMLElement;
    bootContainerElement: HTMLElement;
    bootMessageElements: NodeListOf<HTMLElement>;
    kernelElement: HTMLElement;
    quickloadElement: HTMLElement;
};

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
    const quickloadElement = document.getElementById('quickload');

    if (
        !overlayContainerElement ||
        !bootContainerElement ||
        bootMessageElements.length === 0 ||
        !kernelElement ||
        !quickloadElement
    ) return null;

    return {
        overlayContainerElement,
        bootContainerElement,
        bootMessageElements,
        kernelElement,
        quickloadElement,
    };
};

const playAnimations = (elements: HeroElements) => {
    const introTimeline = gsap.timeline();

    if (window.sessionStorage.getItem('loadingComplete') === 'true') {
        animateSlideUp(introTimeline, elements.overlayContainerElement, elements.quickloadElement);
        
        return;
    }

    animateBootMessages(introTimeline, elements.bootContainerElement, elements.bootMessageElements);
    animateKernel(introTimeline, elements.kernelElement);
    hideOverlay(introTimeline, elements.overlayContainerElement);
};

// ====================
// ANIMATIONS
// ====================

const animateBootMessages = (
    introTimeline: gsap.core.Timeline,
    bootContainerElement: HTMLElement,
    bootMessageElements: NodeListOf<HTMLElement>,
) => {
    // Prepare the container
    introTimeline.set(bootContainerElement, { display: 'block' });

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

    // Outro Animation
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

const animateSlideUp = (
    introTimeline: gsap.core.Timeline,
    overlayContainerElement: HTMLElement,
    quickloadElement: HTMLElement
) => {
    introTimeline
    .set(quickloadElement, { display: 'flex' })
    .to(overlayContainerElement, {
        yPercent: -100,
        duration: 0.5,
        ease: 'sine.inOut',
        delay: 0.5,
        onStart: () => triggerLoadingCompleteEvent(false),
        onComplete: () => overlayContainerElement.remove(),
    });
};

const hideOverlay = (introTimeline: gsap.core.Timeline, overlayElement: HTMLElement) => {
    introTimeline.set(overlayElement, {
        display: 'none' 
    })
    .call(() => triggerLoadingCompleteEvent(true));
};

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