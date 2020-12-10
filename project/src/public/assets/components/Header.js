import { getStore } from "../../store/store.js";

export const Header = () => {
    const store = getStore();
    const {pageSelected} = store;
    return `
    <header>
       <h3>${pageSelected}</h3>
    </header>
    `
}