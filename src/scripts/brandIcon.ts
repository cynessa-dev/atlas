import gsap from 'gsap';

export const initBrandIcon = () => {
    const pixels = document.querySelectorAll('#kernel [data-brand-pixel]');

    if (pixels.length === 0) return;

    const timeline = gsap.timeline();

    timeline.set(pixels, { autoAlpha: 0 }).to(pixels, {
        autoAlpha: 1,
        duration: 0.08,
        ease: 'sine.out',
        stagger: {
            each: 0.01,
            from: 'random',
        },
    });
};
