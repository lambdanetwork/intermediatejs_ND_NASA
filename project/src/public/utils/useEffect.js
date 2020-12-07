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
    // if effect already registered,
    // set prevState to currentState && update currentState with dependenciesArr
    const effectDSFound = EffectMapStorage.get(name)
    if(effectDSFound) {
        // .slice() to copy the array, thus still achieve immutability
        effectDSFound.prevState = effectDSFound.currentState.slice();
        effectDSFound.currentState = dependenciesArr.slice();
        return;
    }

    EffectMapStorage.set(name, new EffectDS(didRenderFn, dependenciesArr));
}

export const runEffects = () => {
    EffectMapStorage.forEach(effectDS => {
        console.log(Array.equal(effectDS.prevState, effectDS.currentState))
        // return;
        // if prevState and currentState are equal, don't run this effect
        if(Array.equal(effectDS.prevState, effectDS.currentState)) return;

        // else run this effect, but only after nextTick using setTimeout
        setTimeout(() => {
            effectDS.prevState = effectDS.currentState.slice();
            const unmountFn = effectDS.fn();
            console.log(effectDS.fn)
            // unmountFn might not be needed, hard to track if Element is unmounted without VDOM

            runEffects();
        }, 0);    
    })
}
    