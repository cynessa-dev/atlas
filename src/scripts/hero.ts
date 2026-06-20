import gsap from 'gsap';

let propsContainer: HTMLElement | null = null

export const initHero = () => {
    propsContainer = document.getElementById('props');

    if (!propsContainer) return;

    playEntranceAnimation();
};

const playEntranceAnimation = () => {
    gsap.to(propsContainer, {
        scale: 1.05,
        duration: 5,
        ease: 'sine.out',
    });
};