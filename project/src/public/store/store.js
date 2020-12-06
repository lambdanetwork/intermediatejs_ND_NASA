import { render } from '../client.js'

let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverImages: {
        curiosity: [],
        opportunity: [],
        spirit: []
    }
}

export const getStore = () => store;

export const updateStore = (store, newState) => {
    // make it immutable
    store = Object.assign({}, store, newState); 
    render(root, store);
}
