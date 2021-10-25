/**
 * Gets the value of a slash command option
 * @param {CommandInteractionOptionResolver} options
 * @param {GetOptionsTypes} getType
 * @param {string} key - The name of the option
 * @returns {*|null}
 */
function getOptions(options, getType, key) {
    let getResults;
    switch(getType) {
        case 'string':
            getResults = options.getString(key);
            break;
            
        case 'number':
            getResults = options.getNumber(key);
            break;
    }
    
    return getResults;
}

module.exports = getOptions;