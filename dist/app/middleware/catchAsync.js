"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
// catchAsync is a higher-order function that accepts an asynchronous function
const catchAsync = (fn) => {
    // It returns a new function that takes req, res, and next parameters
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Calling the input function fn and wrapping it in Promise.resolve()
        // This allows us to handle the promise returned by fn
        Promise.resolve(fn(req, res, next))
            .catch((error) => {
            // If an error occurs during the execution of fn, it is passed to the next middleware
            next(error);
        });
    });
};
exports.catchAsync = catchAsync;
// ----------------------------------------------
// Hint: For more details about this function and error handling practices,
// visit:docs.md 
// Solve number:1
// ----------------------------------------------
