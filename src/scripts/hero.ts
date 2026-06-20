import gsap from 'gsap';

let propsContainer: HTMLElement | null = null

export const initHero = () => {
    // Get the prop container instead of each children to scale evenly
    propsContainer = document.getElementById('props');

    if (!propsContainer) return; // Prop container is essential to animate, otherwise exit

    playEntranceAnimation();
    playBootMessages();
};

const playEntranceAnimation = () => {
    // Subtle zoom in to give importance to the subject
    gsap.to(propsContainer, {
        scale: 1.05,
        duration: 5,
        ease: 'sine.out',
    });
};

const playBootMessages = () => {
    const timeline = gsap.timeline();
    const messages = document.querySelectorAll('[data-boot-message]');

    if (!messages) return;

    messages.forEach((message, index) => {
        timeline.from(message, {
            autoAlpha: 0,
            duration: 0.25,
        });
    });
};