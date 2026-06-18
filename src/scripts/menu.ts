let menu: HTMLElement | null = null;
let menuIcon: HTMLElement | null = null;

const menuIcons = {
    open: 'menu',
    close: 'close'
};

export const initMenu = () => {
    // Get the necessary elements for this logic
    menu = document.querySelector('[data-menu-toggle]');
    menuIcon = document.getElementById('menu-icon');
    
    if (menu) {
        menu.addEventListener('click', handleMenuClick);
    }

    updateMenuIcon();
}

const handleMenuClick = () => {
    menu?.classList.toggle('active');

    updateMenuIcon();
}

const updateMenuIcon = () => {
    if (!menu || !menuIcon) return;

    const isMenuActive = menu.classList.contains('active');

    menuIcon.textContent = isMenuActive 
        ? menuIcons.close 
        : menuIcons.open;
}