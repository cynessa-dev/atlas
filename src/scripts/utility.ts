export const showFlex = (node: HTMLElement, isShow: boolean = true) => {
    const classList = node.classList;
    
    if (isShow) {
        classList.remove('hidden');
        classList.add('flex');
    } else {
        classList.remove('flex');
        classList.add('hidden');
    }
};