/**
 * Gets the value of a slash command option
 * @param {CommandInteractionOptionResolver} options
 * @param {'string'|'number'} getType
 * @param {string} key - The name of the option
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