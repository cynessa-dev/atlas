import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { showFlex } from './utility';
import { setMenuOpen } from './menu';

gsap.registerPlugin(ScrollTrigger);

let propsContainer: HTMLElement | null = null

export const initHero = () => {
    // Get the prop container instead of each children to scale evenly
    propsContainer = document.getElementById('props');

    if (!propsContainer) return; // Prop container is essential to animate, otherwise exit

    playBootMessages();
    playScrollAnimation();
};

const playSubtleZoomOutAnimation = () => {
    // Subtle zoom out to give a little context on what the user has landed on
    gsap.to(propsContainer, {
        scale: 0.80,
        duration: 5.0,
        ease: 'sine.inOut',
    });
};

const playBootMessages = () => {
    const bootContainer = document.querySelector<HTMLElement>('[data-boot-container]');
    const messages = document.querySelectorAll<HTMLElement>('[data-boot-message]');
    
    if (!bootContainer || messages.length === 0) return;

    const loadingIcon = ['|', '/', '-', '\\'];

    const timeline = gsap.timeline();

    messages.forEach((message) => {
        const loading = message.dataset.bootLoading === 'true';
        const seconds = Number(message.dataset.bootSeconds);

        timeline.from(message, {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'sine.in'
        });

        if (loading) {
            const spinnerSpeed = 50;
            const originalText = message.textContent ?? '';
            let lastUpdate = 0;
            let i = 0;

            timeline.to({}, {
                duration: seconds,
                onUpdate: () => {
                    if (!loading) return;

                    const now = performance.now();

                    if (now - lastUpdate < spinnerSpeed) return;

                    lastUpdate = now;
                    message.textContent = originalText + loadingIcon[i];
                    i = (i + 1) % loadingIcon.length;
                },
                onComplete: () => {
                    message.textContent = originalText + '... OK';
                }
            });
        }
    });

    timeline.
        to(bootContainer, {
            autoAlpha: 0,
            duration: 0.1,
            ease: 'sine.out',
            onComplete: () => {
                playKernelAnimation();
                
                bootContainer.remove();
            },
        });
};

const playKernelAnimation = () => {
    const kernelContainer = document.getElementById('kernel');

    if (!kernelContainer) return;

    const timeline = gsap.timeline({
        onStart: () => showFlex(kernelContainer)
    });

    timeline.
        from(kernelContainer, {
            autoAlpha: 0,
            duration: 0.2,
        })
        .to(kernelContainer, {
            autoAlpha: 0,
            duration: 0.2,
            delay: 1.0,
            onComplete: () => kernelContainer.remove(),
        })
        .call(playTaglineAnimation);
};

const playTaglineAnimation = () => {
    const heroContentContainer = document.getElementById('hero-content');

    if (!heroContentContainer) return;

    const timeline = gsap.timeline({
        onStart: () => showFlex(heroContentContainer)
    });

    timeline.from(heroContentContainer, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'sine.in',
    })
    .call(playSubtleZoomOutAnimation);
};

const playScrollAnimation = () => {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top-=1',
            end: '+=1500',
            pin: true,
            scrub: 1,
            onEnter: () => setMenuOpen(false),
            onLeaveBack: () => setMenuOpen(true),
        }
    });

    timeline.to('#laptop-screen', {
        scale: 2.0,
        transformOrigin: 'center center',
        ease: 'none',
    });

    timeline.to('#tagline', {
        scale: 3.0,
        autoAlpha: 0,
        transformOrigin: 'center center',
        ease: 'none'
    }, '<');
};