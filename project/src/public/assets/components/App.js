import { store, updateStore } from '../../store/store.js';
import { getImageByRover } from '../../services/api.js';

// components
import { Greeting } from './Greeting.js'
import { ImageOfTheDay } from './ImageOfTheDay.js'

export function didRender(){
    const selectRoverElem = document.getElementById('rover_select');
    selectRoverElem.onchange = function onRoverChange (e) {
        const roverName = e.target.value;
        getImageByRover(roverName)
    }
}

// create content
export const App = (state) => {
    let { rovers, apod } = state;

    return `
        <section>
            <select id='rover_select'>
                ${rovers.map(roverName => `<option value=${roverName}>${roverName}</option>`)}
            </select>
        </section>
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}