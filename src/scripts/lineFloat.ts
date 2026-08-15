import { SplitText } from 'gsap/SplitText';

export const animateLineFloat = (
    timeline: gsap.core.Timeline,
    text: HTMLElement,
    position: string | number = '>'
) => {
    const split = new SplitText(text, {
        type: 'lines',
        mask: 'lines',
    });

    timeline.from(split.lines, {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'sine.inOut',
        stagger: 0.08,
    }, position);
};