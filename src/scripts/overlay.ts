const OVERLAY_OPEN_CLASSES = ['bg-zinc-800/40', 'backdrop-blur-md'];

export const toggleOverlay = (isOpen?: boolean) => {
    const overlay = getOverlay();

    if (!overlay) return;

    const nextState =
        isOpen ?? !overlay.classList.contains(OVERLAY_OPEN_CLASSES[1]);

    OVERLAY_OPEN_CLASSES.forEach((className) => {
        overlay.classList.toggle(className, nextState);
        overlay.classList.toggle('pointer-events-none', !nextState);
        overlay.classList.toggle('pointer-events-auto', nextState);
    });
};

const getOverlay = () => document.getElementById('overlay');
