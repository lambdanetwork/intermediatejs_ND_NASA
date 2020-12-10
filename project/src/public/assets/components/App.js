import { getStore } from '../../store/store.js';
import { getImagesByRovername } from '../../services/api.js';
import { useEffect } from '../../utils/useEffect.js';

// components
import { Apod } from './Apod.js'
import { RoverDetail } from './RoverDetail.js'
import { RoverSelector } from './RoverSelector.js'
import { Tile } from './Tile.js'
import { Header } from './Header.js'

// create content
export const App = (state) => {
    let { rovers } = state;
    const store = getStore();
    const {roverSelected, pageSelected} = store;
    
    useEffect('App', () => {
        getImagesByRovername(roverSelected);
    }, []);

    const selectedRover =  store.roverDetail[roverSelected.toLowerCase()];
    return `
        ${Header()}
        ${(pageSelected === 'rover') ?
            `
                <div class='main'>
                    ${RoverSelector(rovers, roverSelected)}
                    ${RoverDetail(selectedRover)}
                    ${Tile(selectedRover.photos)}
                </div>
            `
            : 
            Apod()
        }
    `
}