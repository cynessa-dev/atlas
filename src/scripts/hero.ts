import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { initBrandIcon } from './brandIcon';
import { animateScramble } from './scramble';
import { animateLineFloat } from './lineFloat';

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeroElements = {
    propsElement: HTMLElement;
    bootContainerElement: HTMLElement;
    bootMessageElements: NodeListOf<HTMLElement>;
    kernelElement: HTMLElement;
    heroContainerElement: HTMLElement;
    heroTaglineElement: HTMLElement;
    heroDescriptionElement: HTMLElement;
    scrambleText: HTMLElement;
};

const HERO_INTRO_COMPLETE_EVENT = 'hero:intro-complete';

const LOADING_ICONS = ['|', '/', '-', '\\'];
const SPINNER_INTERVAL_MS = 50;

export const initHero = () => {
    const elements = getHeroElements();

    if (!elements) return;

    playAnimations(elements);
};

const getHeroElements = (): HeroElements | null => {
    const propsElement = document.getElementById('props');
    const bootContainerElement = document.querySelector<HTMLElement>('[data-boot-container]');
    const bootMessageElements = document.querySelectorAll<HTMLElement>('[data-boot-message]');
    const kernelElement = document.getElementById('kernel');
    const heroContainerElement = document.querySelector<HTMLElement>('[data-hero-container]');
    const heroTaglineElement = document.querySelector<HTMLElement>('[data-hero-tagline]');
    const heroDescriptionElement = document.querySelector<HTMLElement>('[data-hero-description]');
    const scrambleText = document.querySelector<HTMLElement>('[data-scramble]');

    if (
        !propsElement ||
        !bootContainerElement ||
        bootMessageElements.length === 0 ||
        !kernelElement ||
        !heroContainerElement ||
        !heroTaglineElement ||
        !heroDescriptionElement ||
        !scrambleText
    ) return null;

    return {
        propsElement,
        bootContainerElement,
        bootMessageElements,
        kernelElement,
        heroContainerElement,
        heroTaglineElement,
        heroDescriptionElement,
        scrambleText,
    };
};

const playAnimations = (elements: HeroElements) => {
    const introTimeline = gsap.timeline();

    toggleScroll(introTimeline, false);
    animateBootMessages(introTimeline, elements.bootContainerElement, elements.bootMessageElements);
    animateKernel(introTimeline, elements.kernelElement);
    animateHero(introTimeline, elements.heroContainerElement, elements.heroTaglineElement, elements.heroDescriptionElement, elements.scrambleText);
    animateZoomOut(introTimeline, elements.propsElement);
    toggleScroll(introTimeline, true);

    animateScroll();
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

const animateHero = (
    introTimeline: gsap.core.Timeline,
    heroContainerElement: HTMLElement,
    heroTaglineElement: HTMLElement,
    heroDescriptionElement: HTMLElement,
    scrambleText: HTMLElement
) => {
    introTimeline.set(heroContainerElement, {
        visibility: 'visible',
        onComplete: () => animateScramble(scrambleText),
    });

    animateLineFloat(introTimeline, heroTaglineElement);
    animateLineFloat(introTimeline, heroDescriptionElement, '<');
}

const animateZoomOut = (introTimeline: gsap.core.Timeline, propsElement: HTMLElement) => {
    // Subtle zoom out to give a little context on what the user has landed on
    introTimeline.to(propsElement, {
        scale: 0.80,
        duration: 5.0,
        ease: 'sine.inOut',
        onComplete: () => {
            window.dispatchEvent(new CustomEvent(HERO_INTRO_COMPLETE_EVENT));
        },
    });
};

const animateScroll = () => {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top-=1',
            end: '+=1500',
            pin: true,
            scrub: 1,
        }
    });

    timeline.to('#device-screen', {
        scale: 2.0,
        transformOrigin: 'center center',
        ease: 'none',
    });

    timeline.to('#hero-content', {
        scale: 3.0,
        autoAlpha: 0,
        transformOrigin: 'center center',
        ease: 'none'
    }, '<');
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
