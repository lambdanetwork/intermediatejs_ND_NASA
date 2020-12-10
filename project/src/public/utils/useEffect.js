import './ArrayEqual.js';

// Poorman useEffect
// 1. dev can register name, function to be run, dependencies Array
// 2. if dependencies array is changed function will be run.
// 3. similar like React.useEffect but without unmount capabilities
// 4. It's hard to track DOM unmount without VDOM, or proper setup

// Effect DataStructure
class EffectDS {
    fn = () => {};
    prevState = undefined;
    currentState = undefined;
    constructor(fn, state){
        this.fn = fn;
        this.currentState = state;
    }
}
// Map<ElemName:string, EffectFn>
const EffectMapStorage = new Map();

export const useEffect = (name, didRenderFn, dependenciesArr) => {
    const effectDSFound = EffectMapStorage.get(name);
    
    if(effectDSFound && dependenciesArr) {
        // if effect already registered, and has dependencies array
        // set prevState to currentState && update currentState with dependencies-array
        // this is to avoid running useEffect only when dependencies-array is changed
        effectDSFound.prevState = effectDSFound.currentState.slice();
        effectDSFound.currentState = dependenciesArr.slice();
        // .slice() to copy the array, thus still achieve immutability
        return;
    }

    EffectMapStorage.set(name, new EffectDS(didRenderFn, dependenciesArr));
}

export const runEffects = () => {
    EffectMapStorage.forEach((effectDS, name) => {        
        // if prevState and currentState are defined and equal, don't run this effect
        if(effectDS.prevState && effectDS.currentState && 
            Array.equal(effectDS.prevState, effectDS.currentState)) return;

        // else run this effect, but only after nextTick using setTimeout
        setTimeout(() => {
            // if no dependencies, remove the effect after run one time
            if(!effectDS.prevState && !effectDS.currentState){
                const unmountFn = effectDS.fn();
                return EffectMapStorage.delete(name);
            }

            effectDS.prevState = effectDS.currentState && effectDS.currentState.slice();
            const unmountFn = effectDS.fn();
            // unmountFn might not be needed, hard to track if Element is unmounted without VDOM
            runEffects();
        }, 100);    
    })
}
    