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


export const RoverSelector = (rovers,roverSelected) => {
    return `
    <section class='rover-selector'>
        <select onchange="onRoverChange(this)" id='rover_select'>
            ${rovers && rovers.map(roverName => 
                `<option 
                    ${roverSelected === roverName ? "selected=selected" : ''} 
                    value=${roverName}
                >
                    ${roverName}
                </option>`)}
        </select>
    </section>
    `
}