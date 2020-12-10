import { getStore, updateStore } from '../store/store.js';

export const getImageOfTheDay = async (state) => {
    let { apod } = state
    const store = getStore();

    try {
        await fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore( { apod }))
    } catch(err){}
}
export const getImagesByRovername = async (roverName) => {
    const store = getStore();
    const roverDetail = {...store.roverDetail};
    try {
        return await fetch(`http://localhost:3000/rover?rover_name=${roverName}`)
            .then(res => res.json())
            .then(data => {
                roverDetail[roverName.toLowerCase()] = data.photo_manifest || {};
                updateStore( { roverDetail })
            })
    } catch(err){}

}