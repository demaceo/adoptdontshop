/**
 * Accessibility Utilities for Pet Adoption App
 * Provides functions and constants to improve WCAG compliance
 */

// ARIA Labels and Descriptions
export const ARIA_LABELS = {
    // Navigation
    mainNavigation: "Main navigation",
    breadcrumb: "Breadcrumb navigation",
    pagination: "Pagination navigation",

    // Pet-related
    petCard: "Pet profile card",
    petDetails: "Pet details",
    favoriteButton: "Add to favorites",
    unfavoriteButton: "Remove from favorites",
    petImage: "Pet photo",

    // Forms
    searchForm: "Pet search form",
    filterForm: "Filter pets",
    conversationalForm: "Pet preferences questionnaire",

    // Interactive elements
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openModal: "Open dialog",
    closeModal: "Close dialog",

    // Status
    loading: "Loading content",
    error: "Error message",
    success: "Success message",

    // Results
    searchResults: "Search results",
    noResults: "No pets found",
    resultsCount: "Number of pets found",
} as const;

// ARIA Descriptions
export const ARIA_DESCRIPTIONS = {
    petCard: "Click to view detailed information about this pet",
    favoriteAction: "This will save the pet to your favorites list",
    searchAction: "This will search for pets matching your criteria",
    filterAction: "This will filter the current results",
} as const;

// ARIA Live Region Messages
export const LIVE_MESSAGES = {
    searchComplete: (count: number) =>
        `Search completed. ${count} pet${count !== 1 ? 's' : ''} found.`,
    filterApplied: (count: number) =>
        `Filter applied. ${count} pet${count !== 1 ? 's' : ''} match your criteria.`,
    favoriteAdded: (petName: string) =>
        `${petName} has been added to your favorites.`,
    favoriteRemoved: (petName: string) =>
        `${petName} has been removed from your favorites.`,
    formError: "Please correct the errors in the form.",
    formSuccess: "Form submitted successfully.",
    pageLoaded: "Page content has finished loading.",
} as const;

// Keyboard Navigation Constants
export const KEYBOARD_KEYS = {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    TAB: 'Tab',
} as const;

// Focus Management Utilities
export class FocusManager {
    private static focusStack: HTMLElement[] = [];

    static trapFocus(container: HTMLElement) {
        const focusableElements = this.getFocusableElements(container);
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== KEYBOARD_KEYS.TAB) return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        container.addEventListener('keydown', handleTabKey);
        firstElement.focus();

        return () => {
            container.removeEventListener('keydown', handleTabKey);
        };
    }

    static pushFocus(element: HTMLElement) {
        this.focusStack.push(document.activeElement as HTMLElement);
        element.focus();
    }

    static popFocus() {
        const previousElement = this.focusStack.pop();
        if (previousElement && previousElement.focus) {
            previousElement.focus();
        }
    }

    static getFocusableElements(container: HTMLElement): HTMLElement[] {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]',
        ].join(', ');

        return Array.from(container.querySelectorAll(focusableSelectors));
    }
}

// Live Region Announcer
export class LiveRegionAnnouncer {
    private static instance: LiveRegionAnnouncer;
    private politeRegion: HTMLElement;
    private assertiveRegion: HTMLElement;

    private constructor() {
        this.politeRegion = this.createLiveRegion('polite');
        this.assertiveRegion = this.createLiveRegion('assertive');
    }

    static getInstance(): LiveRegionAnnouncer {
        if (!this.instance) {
            this.instance = new LiveRegionAnnouncer();
        }
        return this.instance;
    }

    private createLiveRegion(priority: 'polite' | 'assertive'): HTMLElement {
        const region = document.createElement('div');
        region.setAttribute('aria-live', priority);
        region.setAttribute('aria-atomic', 'true');
        region.className = 'sr-only';
        document.body.appendChild(region);
        return region;
    }

    announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
        const region = priority === 'polite' ? this.politeRegion : this.assertiveRegion;

        // Clear and set message
        region.textContent = '';
        setTimeout(() => {
            region.textContent = message;
        }, 100);

        // Clear after announcement
        setTimeout(() => {
            region.textContent = '';
        }, 1000);
    }
}

// Color Contrast Utilities
export const ContrastChecker = {
    /**
     * Calculate relative luminance of a color
     */
    getLuminance(r: number, g: number, b: number): number {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    },

    /**
     * Calculate contrast ratio between two colors
     */
    getContrastRatio(l1: number, l2: number): number {
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
    },

    /**
     * Check if contrast meets WCAG AA standards
     */
    meetsWCAGAA(contrastRatio: number, isLargeText: boolean = false): boolean {
        return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
    },

    /**
     * Check if contrast meets WCAG AAA standards
     */
    meetsWCAGAAA(contrastRatio: number, isLargeText: boolean = false): boolean {
        return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
    },
};

// Form Validation with Accessibility
export const AccessibleValidation = {
    /**
     * Add ARIA attributes for form validation
     */
    addValidationAttributes(
        input: HTMLInputElement,
        errorElement: HTMLElement,
        isValid: boolean,
        errorMessage?: string
    ) {
        const errorId = `${input.id}-error`;
        errorElement.id = errorId;

        if (isValid) {
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedby');
            errorElement.textContent = '';
            errorElement.setAttribute('aria-hidden', 'true');
        } else {
            input.setAttribute('aria-invalid', 'true');
            input.setAttribute('aria-describedby', errorId);
            errorElement.textContent = errorMessage || 'Invalid input';
            errorElement.removeAttribute('aria-hidden');
        }
    },

    /**
     * Create accessible error message element
     */
    createErrorElement(inputId: string): HTMLElement {
        const errorElement = document.createElement('div');
        errorElement.id = `${inputId}-error`;
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        errorElement.setAttribute('aria-hidden', 'true');
        return errorElement;
    },
};

// Utility for generating unique IDs
export const generateId = (() => {
    let counter = 0;
    return (prefix: string = 'id') => `${prefix}-${++counter}`;
})();

// Accessible Modal/Dialog utilities
export const ModalManager = {
    openModals: new Set<HTMLElement>(),

    open(modal: HTMLElement, triggerElement?: HTMLElement) {
        if (triggerElement) {
            FocusManager.pushFocus(triggerElement);
        }

        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        this.openModals.add(modal);

        // Trap focus in modal
        const cleanup = FocusManager.trapFocus(modal);

        // Close on escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === KEYBOARD_KEYS.ESCAPE) {
                this.close(modal);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            cleanup?.();
            document.removeEventListener('keydown', handleEscape);
        };
    },

    close(modal: HTMLElement) {
        modal.setAttribute('aria-hidden', 'true');
        this.openModals.delete(modal);
        FocusManager.popFocus();
    },

    closeAll() {
        this.openModals.forEach(modal => this.close(modal));
    },
};

// Screen Reader Utilities
export const ScreenReaderUtils = {
    /**
     * Check if screen reader is likely being used
     */
    isScreenReaderActive(): boolean {
        return window.navigator.userAgent.includes('NVDA') ||
            window.navigator.userAgent.includes('JAWS') ||
            window.speechSynthesis?.speaking ||
            false;
    },

    /**
     * Speak text using Speech Synthesis API (if available)
     */
    speak(text: string, priority: 'low' | 'high' = 'low') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = priority === 'high' ? 1 : 0.7;

            if (priority === 'high') {
                speechSynthesis.cancel(); // Cancel previous speech
            }

            speechSynthesis.speak(utterance);
        }
    },
};

export default {
    ARIA_LABELS,
    ARIA_DESCRIPTIONS,
    LIVE_MESSAGES,
    KEYBOARD_KEYS,
    FocusManager,
    LiveRegionAnnouncer,
    ContrastChecker,
    AccessibleValidation,
    generateId,
    ModalManager,
    ScreenReaderUtils,
};
