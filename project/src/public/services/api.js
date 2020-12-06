import { store, updateStore } from '../store/store.js';

export const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    // return data
}
export const getImagesByRovername = (roverName) => {
    fetch(`http://localhost:3000/rover?rover_name=${roverName}`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}