let menuToggle: HTMLElement | null = null;
let menuIcon: HTMLElement | null = null;

const menuIcons = {
    open: 'menu',
    close: 'close'
};

export const initMenu = () => {
    // Get the necessary elements for this logic
    menuToggle = document.querySelector('[data-menu-toggle]');
    menuIcon = document.getElementById('menu-icon');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', handleMenuClick);
    }

    updateMenuIcon();
}

const handleMenuClick = () => {
    menuToggle?.classList.toggle('active');

    updateMenuIcon();
}

const updateMenuIcon = () => {
    if (!menuToggle || !menuIcon) return;

    const isMenuActive = menuToggle.classList.contains('active');

    menuIcon.textContent = isMenuActive 
        ? menuIcons.close 
        : menuIcons.open;
}