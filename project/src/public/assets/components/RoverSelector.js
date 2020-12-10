import { getImagesByRovername } from "../../services/api.js";
import { getStore, updateStore } from "../../store/store.js";

window.onRoverChange = function onRoverChange (e) {
    const store = getStore();
    const roverName = e.value;
    const roverDetail = store.get('roverDetail').get(roverName.toLowerCase());

    if(!store.roverDetail[roverName] || 
        !store.roverDetail[roverName].name){
            getImagesByRovername(roverName)
        }
    updateStore({roverSelected: roverName});
}

export const RoverSelector = (rovers,roverSelected) => {
    return `
    <section class='rover-selector'>
        <label>Select Rover</label>
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