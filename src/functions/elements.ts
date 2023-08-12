const toggleShowElement = (element: HTMLElement, styles: CSSModuleClasses) => {
    element.classList.remove(styles.notShow);
    if (!element.classList.toggle(styles.hidden)) {
        element.style.display = "flex";
    } else {
        setTimeout(() => {
            element.style.display = "none";
        }, 300);
    }
};

export { toggleShowElement };
