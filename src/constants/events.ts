const events = {
    HERO_INTRO_COMPLETE_EVENT: 'hero:intro-complete',
    LOADING_COMPLETE_EVENT: 'loading:complete',
};


// ====================
// EVENT TRIGGERS
// ====================

export const triggerHeroIntroCompleteEvent = () => {
    const event = new CustomEvent(events.HERO_INTRO_COMPLETE_EVENT);
    window.dispatchEvent(event);
}

export const triggerLoadingCompleteEvent = (isQuickload: boolean) => {
    window.sessionStorage.setItem('loadingComplete', 'true');
    const event = new CustomEvent(events.LOADING_COMPLETE_EVENT, {
        detail: { isQuickload },
    });
    window.dispatchEvent(event);
}


// ====================
// EVENT LISTENERS
// ====================

export const listenToHeroIntroCompleteEvent = (callback: () => void) => {
    window.addEventListener(events.HERO_INTRO_COMPLETE_EVENT, callback);
}

export const listenToLoadingCompleteEvent = (callback: (event: CustomEvent) => void) => {
    window.addEventListener(events.LOADING_COMPLETE_EVENT, callback as EventListener);
}