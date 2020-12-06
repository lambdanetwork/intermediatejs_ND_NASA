import { store } from './store/store.js'

// components
import { App, didRender } from './assets/components/App.js'
export const root = document.getElementById('root');
export const render = async (root, state) => {
    root.innerHTML = App(state);
    didRender();
}


// main function
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})
