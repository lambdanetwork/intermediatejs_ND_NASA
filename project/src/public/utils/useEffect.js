export const useEffect = (didRenderFn) => {
    // mimic React.useEffect by using setTimeout
    setTimeout(() => {
        const unmountFn = didRenderFn();
        // unmountFn might not be needed
    }, 0);
}
    