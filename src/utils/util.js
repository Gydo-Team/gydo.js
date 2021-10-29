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
}

module.exports = Util;