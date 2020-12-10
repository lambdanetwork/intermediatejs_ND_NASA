import { getStore, updateStore } from "../../store/store.js";

window.onFooterClick = function onRoverChange (e, pageSelected) {
    const store = getStore();
    if(store.pageSelected === pageSelected) return;
    updateStore({ pageSelected });
}

export const Footer = () => {
    const store = getStore();
    const {pageSelected} = store;
    return `
    <footer>
        <div 
            onClick="onFooterClick(this, 'rover')"
            class="footer-item ${pageSelected === 'rover' ? 'selected' : ''}">Rover</div>
        <div
            onClick="onFooterClick(this, 'apod')" 
            class="footer-item ${pageSelected === 'apod' ? 'selected' : ''}">Apod</div>
    </footer>
    `
}