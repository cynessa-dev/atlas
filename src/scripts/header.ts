import gsap from 'gsap';
import { toggleOverlay } from './overlay';

type MenuLine = 'top' | 'mid' | 'bot';

type HeaderElements = {
    headerElement: HTMLElement;
    buttonElement: HTMLButtonElement;
    iconElement: HTMLElement;
    optionsContainerElement: HTMLElement;
    optionElements: NodeListOf<HTMLElement>;
    overlayElement: HTMLElement;
};

type MenuIconY = {
    topLine: HTMLElement;
    botLine: HTMLElement;
    topMoveY: gsap.TweenValue;
    botMoveY: gsap.TweenValue;
};

const MENU_ANIMATION_DURATION = 0.4;
const MENU_ANIMATION_EASE = 'expo.inOut';

export const initHeader = () => {
    const elements = getHeaderElements();

    if (!elements) return;

    const menuTimeline = gsap.timeline({ paused: true });

    initClicks(elements.buttonElement, elements.overlayElement, menuTimeline);
    createMenuAnimation(menuTimeline, elements);

    window.addEventListener(
        'hero:intro-complete',
        () => {
            playEntranceAnimation(elements.headerElement);
        },
        { once: true },
    );
};

const getHeaderElements = (): HeaderElements | null => {
    const headerElement = document.getElementById('header');
    const buttonElement =
        document.querySelector<HTMLButtonElement>('[data-menu-button]');
    const iconElement = document.querySelector<HTMLElement>('[data-menu-icon]');
    const optionsContainerElement = document.querySelector<HTMLElement>(
        '[data-menu-options]',
    );
    const optionElements =
        document.querySelectorAll<HTMLElement>('[data-menu-option]');
    const overlayElement = document.getElementById('overlay');

    if (
        !headerElement ||
        !buttonElement ||
        !iconElement ||
        !optionsContainerElement ||
        optionElements.length === 0 ||
        !overlayElement
    )
        return null;

    return {
        headerElement,
        buttonElement,
        iconElement,
        optionsContainerElement,
        optionElements,
        overlayElement,
    };
};

const initClicks = (
    buttonElement: HTMLButtonElement,
    overlayElement: HTMLElement,
    menuTimeline: gsap.core.Timeline,
) => {
    buttonElement.addEventListener('click', () => {
        handleMenuClick(menuTimeline, buttonElement);
    });

    overlayElement.addEventListener('click', () => {
        handleMenuClick(menuTimeline, buttonElement);
    });
};

const handleMenuClick = (
    menuTimeline: gsap.core.Timeline,
    buttonElement: HTMLButtonElement,
) => {
    renderMenuIcon(menuTimeline, buttonElement);
    toggleOverlay();
};

// ====================
// ANIMATIONS
// ====================

const renderMenuIcon = (
    menuTimeline: gsap.core.Timeline,
    buttonElement: HTMLButtonElement,
) => {
    const isOpen = toggleMenu(buttonElement);

    isOpen ? menuTimeline.play() : menuTimeline.reverse();
};

const createMenuAnimation = (
    menuTimeline: gsap.core.Timeline,
    elements: HeaderElements,
) => {
    const { iconElement, optionsContainerElement, optionElements } = elements;

    const iconConfig = getIconAnimationConfig(iconElement);

    if (!iconConfig) return;

    menuTimeline
        .to(
            iconConfig.topLine,
            {
                y: iconConfig.topMoveY,
                duration: MENU_ANIMATION_DURATION,
                ease: MENU_ANIMATION_EASE,
            },
            0,
        )
        .to(
            iconConfig.botLine,
            {
                y: iconConfig.botMoveY,
                duration: MENU_ANIMATION_DURATION,
                ease: MENU_ANIMATION_EASE,
            },
            0,
        )
        .to(
            optionsContainerElement,
            {
                maxHeight: optionsContainerElement.scrollHeight,
                duration: MENU_ANIMATION_DURATION,
                ease: MENU_ANIMATION_EASE,
            },
            0,
        )
        .from(
            optionElements,
            {
                y: (_index, element) => element.getBoundingClientRect().height,
                ease: 'sine.out',
                duration: 0.25,
                stagger: 0.03,
            },
            0.1,
        );
};

const playEntranceAnimation = (headerElement: HTMLElement) => {
    const timeline = gsap.timeline();

    const headerRect = headerElement.getBoundingClientRect();
    const defaultTop = 0;
    const startY = defaultTop - headerRect.height;

    timeline
        .set(headerElement, {
            top: startY,
            autoAlpha: 1,
        })
        .to(headerElement, {
            top: headerRect.y,
            duration: 0.3,
            ease: 'sine.out',
        })
        .from(headerElement, {
            width: 0,
            duration: 0.3,
            ease: 'sine.out',
        });
};

// ====================
// UTILITY FUNCTIONS
// ====================

const getLine = (icon: HTMLElement, line: MenuLine) => {
    return icon.querySelector<HTMLElement>(`[data-menu-line=${line}]`) ?? null;
};

const getIconAnimationConfig = (iconElement: HTMLElement): MenuIconY | null => {
    const lines = {
        top: getLine(iconElement, 'top'),
        mid: getLine(iconElement, 'mid'),
        bot: getLine(iconElement, 'bot'),
    };

    if (!lines.top || !lines.mid || !lines.bot) return null;

    const topY = Number(lines.top.getAttribute('y'));
    const midY = Number(lines.mid.getAttribute('y'));
    const botY = Number(lines.bot.getAttribute('y'));

    const topMoveY = midY - topY;
    const botMoveY = midY - botY;

    return {
        topLine: lines.top,
        botLine: lines.bot,
        topMoveY,
        botMoveY,
    };
};

const toggleMenu = (buttonElement: HTMLButtonElement) => {
    const isOpen = buttonElement.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;

    buttonElement.setAttribute('aria-expanded', String(nextState));

    return nextState;
};
