import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { animateScramble } from './scramble';
import { animateLineFloat } from './lineFloat';
import { triggerHeroIntroCompleteEvent } from '../constants/events';

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeroElements = {
    propsElement: HTMLElement;
    heroContainerElement: HTMLElement;
    heroTaglineElement: HTMLElement;
    heroDescriptionElement: HTMLElement;
    scrambleText: HTMLElement;
};

export const initHero = (options: { isQuickload: boolean }) => {
    const elements = getHeroElements();

    if (!elements) return;

    playAnimations(elements, options.isQuickload);
};

const getHeroElements = (): HeroElements | null => {
    const propsElement = document.getElementById('props');
    const heroContainerElement = document.querySelector<HTMLElement>('[data-hero-container]');
    const heroTaglineElement = document.querySelector<HTMLElement>('[data-hero-tagline]');
    const heroDescriptionElement = document.querySelector<HTMLElement>('[data-hero-description]');
    const scrambleText = document.querySelector<HTMLElement>('[data-scramble]');

    if (
        !propsElement ||
        !heroContainerElement ||
        !heroTaglineElement ||
        !heroDescriptionElement ||
        !scrambleText
    ) return null;

    return {
        propsElement,
        heroContainerElement,
        heroTaglineElement,
        heroDescriptionElement,
        scrambleText,
    };
};

const playAnimations = (elements: HeroElements, playIntro: boolean) => {
    const introTimeline = gsap.timeline();

    animateHero(introTimeline, elements.heroContainerElement, elements.heroTaglineElement, elements.heroDescriptionElement, elements.scrambleText);
    
    if (playIntro)
        animateZoomOut(introTimeline, elements.propsElement);
    else
        setPropsToFinalState(elements.propsElement);

    animateScroll();
};

// ====================
// ANIMATIONS
// ====================

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
        duration: 2.0,
        ease: 'sine.inOut',
        onComplete: () => triggerHeroIntroCompleteEvent(),
    });
};

const setPropsToFinalState = (propsElement: HTMLElement) => {
    gsap.set(propsElement, {
        scale: 0.80,
        onComplete: () => triggerHeroIntroCompleteEvent(),
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