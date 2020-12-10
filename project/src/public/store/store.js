import { render } from '../client.js'

const { List, Map } = window.Immutable;
class PhotoManifest {
    name='';
    landing_date='';
    launch_date='';
    status='';
    max_date='';
    max_sol='';
    photos=List(); // string[]
    total_photos=0;
}

let store = Map({
    pageSelected: 'rover', // 'rover' | 'apod'
    roverSelected: 'Curiosity',
    user: { name: "Student" },
    apod: '',
    rovers: List(['Curiosity', 'Opportunity', 'Spirit']),
    roverDetail: Map({
        curiosity: Map(new PhotoManifest()),
        opportunity: Map(new PhotoManifest()),
        spirit:  Map(new PhotoManifest())
    })
})

export const getStore = () => store;

export const updateStore = (newState) => {
    store = store.merge(newState);
    render(root, store);
}
