import gsap from 'gsap';

let menuToggle: HTMLButtonElement | null = null;
let menuItems: NodeListOf<HTMLElement> | null = null;
let menuIcon: HTMLElement | null = null;

let toggleRect: DOMRect;
let toggleCenterX: number;
let toggleCenterY: number;

let menuTimeline = gsap.timeline({ paused: true });

const menuIcons = {
    open: 'menu',
    close: 'close'
};

type Offset = {
    x: number;
    y: number;
};

export const initMenu = () => {
    // Get the necessary element first before proceding
    menuToggle = document.querySelector('[data-menu-toggle]');
    
    if (!menuToggle) return;

    // Once menu toggle is found, get the rest of the elements to save on future queries
    menuItems = document.querySelectorAll('[data-menu-item]');
    menuIcon = document.getElementById('menu-icon');

    menuToggle.addEventListener('click', handleMenuClick);
    menuToggle.disabled = true; // Prevent interaction during the entrance animation to avoid weird early-clicks issues

    // Get the center position of the menu toggle for animations
    toggleRect = menuToggle.getBoundingClientRect();
    toggleCenterX = toggleRect.left + toggleRect.width / 2;
    toggleCenterY = toggleRect.top + toggleRect.height / 2;

    // Get the viewport width to avoid and maintain convenience across device
    const desktopBreakpoint = window.matchMedia('(min-width: 768px)');
    const initiallyOpen = desktopBreakpoint.matches;

    menuToggle.setAttribute(
        'aria-expanded',
        String(initiallyOpen)
    );

    createMenuTimeline();
    playEntranceAnimation(initiallyOpen);
};

export const setMenuOpen = (state?: boolean) => {
    if (!menuToggle) return;
    
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const nextState = state === undefined ? !isOpen : state;

    menuToggle.setAttribute('aria-expanded', String(nextState));
    renderMenu(nextState);
}

const handleMenuClick = () => {
    setMenuOpen();
};

const renderMenu = (isOpen: boolean) => {
    if (!menuIcon) return;

    menuIcon.textContent = isOpen
        ? menuIcons.close
        : menuIcons.open;

    isOpen
        ? menuTimeline.play()
        : menuTimeline.reverse();
};

const playEntranceAnimation = (initiallyOpen: boolean) => {
    const menuToggleWrapper = document.querySelector('[data-menu-toggle-wrapper]');

    if (!menuToggle) return;

    if (!menuToggleWrapper) {
        menuToggle.disabled = false;
        renderMenu(initiallyOpen);
        return;
    }

    const wrapperRect = menuToggleWrapper.getBoundingClientRect();
    const offsetY = 16;
    const startY = window.innerHeight - wrapperRect.top + offsetY;

    gsap.from(menuToggleWrapper, {
        y: startY,
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: () => {
            if (!menuToggle) return;

            menuToggle.disabled = false;
            renderMenu(initiallyOpen);
        },
    });
};

const createMenuTimeline = () => {
    if (!menuItems) return;

    const offsets = Array.from(menuItems, getItemOffset);

    menuTimeline.from(menuItems, {
        x: (index) => offsets[index].x,
        y: (index) => offsets[index].y,
        scale: 0,
        opacity: 0.0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'sine.out'
    });
};

const getItemOffset = (item: HTMLElement): Offset => {
    const itemRect = item.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top + itemRect.height / 2;

    const itemOffsetX = toggleCenterX - itemCenterX;
    const itemOffsetY = toggleCenterY - itemCenterY;

    return { x: itemOffsetX, y: itemOffsetY };
};
