import { getStore, updateStore } from '../store/store.js';

export const getImageOfTheDay = async (state) => {
    let { apod } = state
    const store = getStore();

    return await fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}
export const getImagesByRovername = async (roverName) => {
    const store = getStore();

    const roverImages = {...store.roverImages};
    return await fetch(`http://localhost:3000/rover?rover_name=${roverName}`)
        .then(res => res.json())
        .then(data => {
            roverImages[roverName.toLowerCase()] = data.images || [];
            updateStore(store, { roverImages })
        })
}