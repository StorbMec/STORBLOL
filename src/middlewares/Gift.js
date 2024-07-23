import React from "react";
import { useCookies } from 'react-cookie';
/**
 * Represents a Gift object.
 */
export default class Gift {
    /**
     * Creates a new Gift object.
     * @param {string} username - The username of the sender.
     * @param {string} password - The password of the sender.
     */
    constructor(username, password) {
        this.id = 0;
        this.username = username;
        this.password = password;
        this.message = '';
        this.receiver = '';
    }

    /**
     * Sets the parameters of the gift.
     * @param {number} id - The ID of the gift.
     * @param {string} message - The message of the gift.
     * @param {string} receiver - The receiver of the gift.
     */
    setGiftParameters(id, message, receiver) {
        [this.id, this.message, this.receiver] = [id, message, receiver];
        console.log(this.id, this.username, this.password, this.message, this.receiver);
    }

    /**
     * Sends the gift.
     * @returns {Promise} - A promise that resolves when the gift is sent.
     */
    async sendGift() {
        // This function expects a JSON object with the gift parameters - it is an API Request. It's the only async function because it needs to fetch the data from the back-end.
    }
}