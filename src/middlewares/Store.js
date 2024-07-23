import axios from "axios";

import IconChampions from "../../public/icons/helmet.svg";
import IconSkins from "../../public/icons/paint-palette.svg";
import IconChromas from "../../public/icons/chromas.svg";
import IconHextec from "../../public/icons/gem.svg";
import IconWard from "../../public/icons/eye.svg";
import IconMystery from "../../public/icons/surprise-box.svg";
import IconProfile from "../../public/icons/profile.svg";
import IconRiotPoints from "../../public/icons/rp.svg";
import IconBundle from "../../public/icons/bundle.svg";
import IconInvisible from '../../public/icons/none.svg';

const backendDictionary = [
    { name: "Champions", icon: IconChampions, backendType: 'CHAMPION'},
    { name: "Skins", icon: IconSkins, backendType: 'CHAMPION_SKIN'},
    { name: "Chromas", icon: IconChromas, backendType: 'CHAMPION_SKIN_CHROMA'},
    { name: "Hextec", icon: IconHextec, backendType: 'HEXTECH'},
    { name: "Ward", icon: IconWard, backendType: 'WARD_SKIN'},
    { name: "Mystery", icon: IconMystery, backendType: 'MYSTERY'},
    { name: "Icon", icon: IconProfile, backendType: 'SUMMONER_ICON'},
    { name: "Riot Points", icon: IconRiotPoints, backendType: 'RIOT_POINTS'},
    { name: "Bundles (others)", icon: IconBundle, backendType: 'BUNDLES'},
];

/**
 * This function needs to be modified to fit the backend requirements.
 * The 'this.catalog' property should be a function that fetches the catalog from the backend, according to the frontend needs.
 *
 * The backend should return a JSON object with the following properties:
 * @property {number} id - The ID of the item.
 * @property {string} name - The name of the item.
 * @property {string} imageURL - The URL of the item's image.
 * @property {number} price - The price of the item.
 *
 * Currently, the backend is only returning 'id', 'name', and 'price'. The 'imageURL' and 'tier' properties still need to be implemented.
 *
 * Additionally, there is an issue with the current data structure. The 'chromas' property is nested within the 'champion_skin' type, which is not ideal. The backend should separate 'chromas' from 'champion_skin', as the frontend is already prepared to receive these data separately.
 *
 * The return category for these data should be 'CHAMPION_SKIN_CHROMA'.
 */
export default class Store {
    constructor(){
        /**
         * The URL of the store.
         * @type {string}
         */
        this.storeURL = 'https://storb.lol/api/catalog';

        /**
         * The catalog of items in the store.
         * @type {Array}
         */
        this.catalog = [];

        /**
         * The available categories in the store.
         * @type {Array}
         */
        this.categories = this.getAvailablesCategories();

        /**
         * The current category selected in the store.
         * @type {string|null}
         */
        this.currentCategory = null;

        /**
         * The current icon selected in the store.
         * @type {string}
         */
        this.currentIcon = IconInvisible;

        /**
         * The total Riot Points (RP) owned by the user.
         * @type {number}
         */
        this.userTotalRP = 0;
    }

    /**
     * Fetches the catalog of items from the store.
     * @returns {Promise<void>}
     */
    async fetchCatalog(){
        const response = await axios.get(this.storeURL);
        this.catalog = response.data;
    }

    /**
     * Fetches the total Riot Points (RP) owned by the user.
     * @returns {Promise<void>}
     */
    async fetchRiotPoints(){
        // I dont know how, but this function needs to return the amount of rp that the user has.
        this.userTotalRP = 9000;
    }

    /**
     * Gets the total Riot Points (RP) owned by the user.
     * @returns {number} The total Riot Points (RP).
     */
    getRiotPoints(){
        return this.userTotalRP;
    }

    /**
     * Gets the full catalog of items in the store.
     * @returns {Array} The full catalog of items.
     */
    getFullCatalog() {
        return this.catalog;
    }

    /**
     * Searches for items in the catalog based on a search term.
     * @param {string} term - The search term.
     * @returns {Array} The search results.
     */
    searchItems(term) {
        const lowerCaseTerm = term.toLowerCase();
        const results = this.catalog.filter(item => 
            item.name.toLowerCase().includes(lowerCaseTerm)
        );
        return results;
    }

    /**
     * Gets the catalog of items in the store based on a specific type.
     * @param {string} type - The type of items to retrieve.
     * @returns {Array} The catalog of items of the specified type.
     * @throws {Error} If the specified type is invalid.
     */
    getCatalogByType(type) {
        const availableTypes = this.getAvailablesCategories().map(category => category.backendType);
        if (!availableTypes.includes(type)) {
            throw new Error(`Invalid type: ${type}. Must be one of ${availableTypes.join(', ')}`);  
        }
        const chosenCategory = backendDictionary.find(item => item.backendType === type);
        if (chosenCategory) {
            this.currentCategory = chosenCategory.name;
            this.currentIcon = chosenCategory.icon; 
        }
        return this.catalog
            .filter(item => item.type === type)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Gets the available categories in the store.
     * @returns {Array} The available categories.
     */
    getAvailablesCategories() {
        const types = this.catalog.map(item => item.type);
        const availableCategories = backendDictionary.filter(item => types.includes(item.backendType));
        return availableCategories;
    }
}
