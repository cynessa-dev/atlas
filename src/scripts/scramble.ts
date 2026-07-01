import gsap from 'gsap';

const scrambleText = (textElement: HTMLElement) => {
    const symbols = '!<>\\/[]{}—=+*^?#';
    const characters = textElement.textContent?.split('') || [];
    const timeline = gsap.timeline();

    // Clear the text content of the element
    textElement.textContent = '';

    characters.forEach((char, index) => {
        const currentText = textElement.textContent || '';
        const randomIndex = getRandomInt(0, symbols.length - 1);
        const symbol = symbols[randomIndex];

        timeline.to(textElement, {
            textContent: currentText + symbol,
            duration: 0.05,
            onComplete: () => {

            }
        });
    });
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};