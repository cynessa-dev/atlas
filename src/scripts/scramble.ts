import gsap from 'gsap';

const TYPEWRITER_SPEED = 0.01;

export const animateScramble = (textElement: HTMLElement) => {
    if (!textElement) return;

    const timeline = gsap.timeline();

    scrambleText(textElement, timeline);
    unscrambleText(textElement, timeline);
}; 

const scrambleText = (textElement: HTMLElement, timeline: gsap.core.Timeline) => {
    const symbols = '!<>\\/[]{}()=+*^?#';
    const characters = getScrambleDataset(textElement);

    characters.forEach((char, index) => {
        let symbol = '_'; // Default symbol for whitespaces

        if (char !== ' ') symbol = symbols[getRandomInt(0, symbols.length - 1)];

        timeline.to({}, {
            duration: TYPEWRITER_SPEED,
            onStart: () => {
                characters[index] = symbol;

                textElement.textContent += characters[index];
            },
        });
    });
};

const unscrambleText = (textElement: HTMLElement, timeline: gsap.core.Timeline) => {
    const characters = getScrambleDataset(textElement);

    characters.forEach((char, index) => {
        timeline.to({}, {
            duration: TYPEWRITER_SPEED,
            onStart: () => {
                const currentText = textElement.textContent ?? '';
                const updatedText = currentText.substring(0, index) + char + currentText.substring(index + 1);

                textElement.textContent = updatedText;
            },
        });
    });
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getScrambleDataset = (element: HTMLElement) => {
    return (element.dataset.scramble ?? '').split('');
};