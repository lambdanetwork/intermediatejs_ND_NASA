const stack = [];

export const useEffect = (didRenderFn) => {
    // mimic React.useEffect by using stack of functions
    stack.push(didRenderFn);
    console.log('useEffect', stack)
}

export const runEffects = () => {
    const fn = stack.pop();
    if(!fn) return;

    setTimeout(() => {
        const unmountFn = fn();
        // unmountFn might not be needed
        runEffects();
    }, 0);

}
    