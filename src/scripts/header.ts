import gsap from 'gsap';

type MenuLine = 'top' | 'mid' | 'bot';

const menuTimeline = gsap.timeline({ paused: true });

let menuButton: HTMLButtonElement | null = null
let icon: HTMLElement | null = null

export const initHeader = () => {
    menuButton = document.querySelector('[data-menu-button]');
    icon = document.querySelector('[data-menu-icon]');

    if (!menuButton || !icon) return;

    menuButton.addEventListener('click', handleMenuClick)

    createMenuAnimation();
    playEntranceAnimation();
};

const handleMenuClick = () => {
    renderMenuIcon();
};

// ====================
// ANIMATIONS
// ====================

const renderMenuIcon = () => {
    const isOpen = toggleMenu();

    isOpen ? menuTimeline.play() : menuTimeline.reverse();
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
};

const createMenuAnimation = () => {
    const menuOptionsContainer = document.querySelector<HTMLElement>('[data-menu-options]');

    const lines = {
        top: getLine('top'),
        mid: getLine('mid'),
        bot: getLine('bot'),
    };

    if (!menuOptionsContainer || !lines.top || !lines.mid || !lines.bot) return;

    const topY = Number(lines.top.getAttribute('y'));
    const midY = Number(lines.mid.getAttribute('y'));
    const botY = Number(lines.bot.getAttribute('y'));

    const topMoveY = midY - topY;
    const botMoveY = midY - botY;

    const duration = 0.3;
    const ease = 'sine.inOut';

    menuTimeline
        .to(lines.top, {
            y: topMoveY,
            duration: duration,
            ease: ease,
        }, 0)
        .to(lines.bot, {
            y: botMoveY,
            duration: duration,
            ease: ease,
        }, 0)
        .to(menuOptionsContainer, {
            maxHeight: menuOptionsContainer.scrollHeight,
            duration: duration,
            ease: ease,
        }, 0);
};

// ====================
// UTILITY FUNCTIONS
// ====================

const getLine = (line: MenuLine) => {
    if (!icon) return;
    
    return icon.querySelector(`[data-menu-line=${line}]`) ?? null;
}

const toggleMenu = () => {
    if (!menuButton) return;

    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;

    menuButton.setAttribute('aria-expanded', String(nextState));

    return nextState;
};