import { getStore } from './store/store.js'
import { runEffects } from './utils/useEffect.js';

// components
import { App } from './assets/components/App.js';


export const root = document.getElementById('root');
export const render = (root, state) => {
    root.innerHTML = App(state);
    runEffects();
}


// main function
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    const store = getStore();
    render(root, store);

})
