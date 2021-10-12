class Util {
    static mention(target, mentionType) {
        if (mentionType === "user") {
            return `<@!` + target + `>`
        } else if (mentionType === "role") {
            return `<@&` + target `>`
        }
    }
}

module.exports = Util;