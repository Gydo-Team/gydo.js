/**
 * Interpreter Error class for Interpreter's Error in Functions
 */
class InterpreterError extends Error {
    /**
     * Error on the Interpreter's Function
     * @param {string} message
     * @param {string} params
     */
    constructor(message, ...params) {
        super(...params);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InterpreterError);
        }
        
        this.name = 'InterpreterError';
        this.message = message;
    }
}

module.exports = InterpreterError;