import AppError from './appError'; // AppError ক্লাসটি আমদানি করা হচ্ছে

class CastError extends AppError {
    constructor(value: any, path: string) {
        super(400, `Invalid value '${value}' for path '${path}'`); // 400 Bad Request স্ট্যাটাস কোড সহ বার্তা সেট করা হচ্ছে
    }
}

export default CastError;
