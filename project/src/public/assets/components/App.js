import { getStore } from '../../store/store.js';
import { getImagesByRovername } from '../../services/api.js';
import { useEffect } from '../../utils/useEffect.js';

// components
import { Apod } from './Apod.js'
import { RoverDetail } from './RoverDetail.js'
import { RoverSelector } from './RoverSelector.js'
import { Tile } from './Tile.js'
import { Header } from './Header.js'
import { Footer } from './Footer.js';

// create content
export const App = () => {
    const store = getStore();
    const rovers = store.get('rovers').toJS();
    const roverSelected = store.get('roverSelected');
    const pageSelected = store.get('pageSelected');
    
    useEffect('App', () => {
        getImagesByRovername(roverSelected);
    }, []);

    const selectedRover =  store.get('roverDetail').get(roverSelected.toLowerCase());
    return `
        ${Header()}
        ${(pageSelected === 'rover') ?
            `
                <div class='main'>
                    ${RoverSelector(rovers, roverSelected)}
                    ${RoverDetail(selectedRover)}
                    ${Tile(selectedRover ? selectedRover.get('photos').toJS() : [])}
                </div>
            `
            : 
            Apod()
        }
        ${Footer()}

    `
}