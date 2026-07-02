import gsap from 'gsap';

const scrambleText = (textElement: HTMLElement) => {
    const symbols = '!<>\\/[]{}—=+*^?#';
    const characters = textElement.textContent.split('') || [];
    const timeline = gsap.timeline();

    // Clear the text content of the element
    textElement.textContent = '';

    // Scramble the text first
    characters.forEach((char) => {
        // Whitespaces are always underscore to make the effect look natural, yet random
        if (char === ' ') {
            textElement.textContent += '_';
            return;
        }

        // Get a random symbol, if not a whitespace
        const randomInt = getRandomInt(0, characters.length - 1);
        const symbol = symbols.charAt(randomInt);

        timeline.to({}, {
            duration: 0.2,
            onUpdate: () => textElement.textContent += symbol,
        });
    });
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};