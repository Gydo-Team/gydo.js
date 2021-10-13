class Util {
    /**
     * To mention a user/role/VC
     * @param {string} target
     * @param {stribg} mentionType
     */
    static mention(target, mentionType) {
        if (mentionType === "user") {
            return `<@!` + target + `>`
        } else if (mentionType === "role") {
            return `<@&` + target `>`
        } else if (mentionType === 'channel') {
            return '<#' + target + '>'
        } else if (mentionType === 'vc') {
            return '<#!' + target + '>'
        }
    }
}

module.exports = Util;