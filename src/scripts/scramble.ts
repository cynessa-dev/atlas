import gsap from 'gsap';

export const animateScramble = (textElement: HTMLElement) => {
    if (!textElement) return;

    const timeline = gsap.timeline();

    scrambleText(textElement, timeline);
    unscrambleText();
}; 

const scrambleText = (textElement: HTMLElement, timeline: gsap.core.Timeline) => {
    const symbols = '!<>\\/[]{}()=+*^?#';
    const characters = (textElement.dataset.scramble ?? '').split('');

    characters.forEach((char, index) => {
        let symbol = '_'; // Default symbol for whitespaces

        if (char !== ' ') symbol = symbols[getRandomInt(0, symbols.length - 1)];

        timeline.to({}, {
            duration: 0.02,
            onStart: () => {
                characters[index] = symbol;

                textElement.textContent += characters[index];
            },
        });
    });
};

const unscrambleText = () => {
    
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};