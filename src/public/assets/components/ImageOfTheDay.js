import { getImageOfTheDay } from '../../services/api.js';
import { getStore } from '../../store/store.js';
import { useEffect } from '../../utils/useEffect.js';


// Example of a pure function that renders infomation requested from the backend
export const ImageOfTheDay = (_apod) => {
    const apod = _apod ? _apod.toJS() : _apod;
    useEffect('ImageOfTheDay', () => {
        // mimic didmount, only run once
        // If image does not already exist, or it is not from today -- request it again
        const today = new Date()
        if (!apod || apod.date === today.getDate() ) {
            return getImageOfTheDay()
        }
    }, [])

    if(!apod) return ''
    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
        <p>See today's featured image</p>
        <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}