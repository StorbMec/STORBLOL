
/**
 * Controller module for the Card component.
 * @module CardController
 */

module.exports = {
    /**
     * Returns the fill color based on the given tier.
     * @param {string} tier - The tier name.
     * @returns {string} The corresponding fill color.
     */
    getFillColor: (tier) => {
        /**
         * Map of tier names to their corresponding color values.
         * @type {Object.<string, string>}
         */
        const tierColorMap = {
            'ULTIMATE': 'red',
            'MYTHIC': 'blue',
            'PRESTIGE': '#ECD53C',
            'LEGENDARY': 'purple',
            'EPIC': 'green',
            'COMMON': 'gray'
        };

        return tierColorMap[tier] || 'gray';
    },

    /**
     * Capitalizes the first letter of a word.
     * @param {string} word - The word to capitalize.
     * @returns {string} The capitalized word.
     */
    capitalizeFirstLetter: (word) => {
        if (typeof word !== 'string') return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}