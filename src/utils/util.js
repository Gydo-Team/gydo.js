class Util {
    /**
     * To mention a user/role/VC
     * @param {string} target
     * @param {string} mentionType
     * @returns {string|null}
     */
    static mention(target, mentionType) {
        let res;
        
        switch(mentionType) {
            case 'user':
                res = `<@${target}>`
                break;
            
            case 'role':
                res = `<@&${target}>`
                break;
                
            case 'channel':
                res = `<#${target}>`
                break;
                
            case 'vc':
                res = `<#!${target}>`
                break;
                
            default:
                res = `<@${target}>`
        }
        
        return res;
    }
    
    /**
     * Gets the value of a slash command option
     * @param {CommandInteractionOptionResolver} options
     * @param {GetOptionsTypes} getType
     * @param {string} key - The name of the option
     * @returns {*|null}
     */
    static getOptions(options, getType, key) {
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
}

module.exports = Util;