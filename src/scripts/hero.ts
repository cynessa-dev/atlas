import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HeroElements = {
    propsElement: HTMLElement;
    bootContainerElement: HTMLElement;
    bootMessageElements: NodeListOf<HTMLElement>;
    kernelElement: HTMLElement;
    heroContentElement: HTMLElement;
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
    const heroContentElement = document.getElementById('hero-content');

    if (
        !propsElement ||
        !bootContainerElement ||
        bootMessageElements.length === 0 ||
        !kernelElement ||
        !heroContentElement
    ) return null;

    return {
        propsElement,
        bootContainerElement,
        bootMessageElements,
        kernelElement,
        heroContentElement,
    };
};

const playAnimations = (elements: HeroElements) => {
    const introTimeline = gsap.timeline();

    animateBootMessages(introTimeline, elements.bootContainerElement, elements.bootMessageElements);
    animateKernel(introTimeline, elements.kernelElement);
    animateTagline(introTimeline, elements.heroContentElement);
    animateZoomOut(introTimeline, elements.propsElement);

    animateScroll();
};

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
        })
        .to(kernelElement, {
            autoAlpha: 0,
            duration: 0.2,
            delay: 1.0,
            onComplete: () => kernelElement.remove(),
        });
};

const animateTagline = (introTimeline: gsap.core.Timeline, heroContentElement: HTMLElement) => {
    introTimeline
        .set(heroContentElement, { display: 'flex' })
        .from(heroContentElement, {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'sine.in',
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
            messageElement.textContent = originalText + LOADING_ICONS[frameIndex];
            frameIndex = (frameIndex + 1) % LOADING_ICONS.length;
        },
        onComplete: () => {
            messageElement.textContent = originalText + '... OK';
        }
    });
};