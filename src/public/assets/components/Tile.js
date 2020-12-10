import { getImagesByRovername } from "../../services/api.js";
import { getStore, updateStore } from "../../store/store.js";

window.onRoverChange = function onRoverChange (e) {
    const store = getStore();
    const roverName = e.value;
    const roverDetail = store.get('roverDetail').toJS();

    if(!roverDetail[roverName] || 
        !roverDetail[roverName].name){
            getImagesByRovername(roverName)
        }
    updateStore({roverSelected: roverName});
}


// photos:: String[]
export const Tile = (photos) => {
    return `
        <section class="tile-container">
            ${photos.map(photo => {
                return `
                <div class="tile">
                    <img class="tile" src="${photo.img_src}" alt="" />
                    <p style="text-align: center;">${photo.earth_date}</p>
                </div>
                `
            }).join("")}
        </section>
    `
}