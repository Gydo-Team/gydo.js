/**
 * Array of Arguments in a message, if any
 */
const args = async (client, code, author, args, message, currentCommand) => {
    if(!args.length) return code;
    
    const rawCode = `${code}`;
    
    let argNum;
    let argRes;
    let m;
    await rawCode.replaceAll("$[args;", (match) => {
        m += `${match}`
    });
    
    if(!m) return code;
    if(args.length && currentCommand != undefined) { 
        argNum = rawCode.split("$[args;")[1].split("]")[0];
    
        argRes = code
            .replaceAll(`$[args;${argNum}]`, args[argNum]);
    } else if (!args.length) argRes = "";
    
    if(argRes) return argRes
    else return code
}

module.exports = args;