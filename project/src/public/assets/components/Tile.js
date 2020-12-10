import { getImagesByRovername } from "../../services/api.js";
import { getStore, updateStore } from "../../store/store.js";

window.onRoverChange = function onRoverChange (e) {
    const store = getStore();
    const roverName = e.value;
    if(!store.roverDetail[roverName] || 
        !store.roverDetail[roverName].name){
            getImagesByRovername(roverName)
        }
    updateStore({roverSelected: roverName});
}


// photos:: String[]
export const Tile = (photos) => {
    return `
        <section class="tile-container">
            ${photos.map(photo => {
                return `<img class="tile" src="${photo.img_src}" alt="" />`
            }).join("")}
        </section>
    `
}