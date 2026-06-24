import gsap from 'gsap';

export const initHeader = () => {
    playEntranceAnimation();
};

const playEntranceAnimation = () => {
    const header = document.getElementById('header');

    if (!header) return;

    const timeline = gsap.timeline();

    const headerRect = header.getBoundingClientRect();
    const defaultTop = 0;
    const startY = defaultTop - headerRect.height;

    timeline
        .from(header, {
            top: startY,
            duration: 0.3,
            ease: 'sine.out',
        })
        .from(header, {
            width: 0,
            duration: 0.3,
            ease: 'sine.out'
        });
}