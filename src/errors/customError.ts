
// Custom error constructor
export class customError extends Error {
    statusCode: number
    status: "fail" | "error"
    isOperational: boolean

    constructor(message: string = `Something went wrong!`, statusCode: number = 500) {
        super(message);          // Call the Error constructor
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Mark as operational error (vs programming error)

        Object.setPrototypeOf(this, new.target.prototype)
    }
}


