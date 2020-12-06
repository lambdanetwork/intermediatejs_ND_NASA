import { render } from '../client.js'

export let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

export const updateStore = (store, newState) => {
    // make it immutable
    store = Object.assign({}, store, newState); 
    render(root, store)
}
