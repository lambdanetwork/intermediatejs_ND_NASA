import { getStore, updateStore } from '../store/store.js';

export const getImageOfTheDay = (state) => {
    let { apod } = state
    const store = getStore();

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    // return data
}
export const getImagesByRovername = (roverName) => {
    const store = getStore();

    const roverImages = {...store.roverImages};
    fetch(`http://localhost:3000/rover?rover_name=${roverName}`)
        .then(res => res.json())
        .then(data => {
            roverImages[roverName.toLowerCase()] = data.images || [];
            updateStore(store, { roverImages })
        })
}