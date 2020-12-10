import { render } from '../client.js'

class PhotoManifest {
    name='';
    landing_date='';
    launch_date='';
    status='';
    max_date='';
    max_sol='';
    photos=[]; // string[]
    total_photos=0;
}

let store = {
    pageSelected: 'rover', // 'rover' | 'apod'
    roverSelected: 'Curiosity',
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverDetail: {
        curiosity: new PhotoManifest(),
        opportunity:new PhotoManifest(),
        spirit: new PhotoManifest()
    }
}


export const getStore = () => store;

export const updateStore = (newState) => {
    // make it immutable
    store = Object.assign({}, store, newState); 
    render(root, store);
}
