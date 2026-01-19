import { NextResponse } from "next/server";
import { AppError } from "./appError";

export const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).reduce((acc, el) => {
    acc[el.path] = el.message;
    return acc;
  }, {});
  return new AppError("Invalid data supplied", errors, 400);
  // if (err.name === "ValidationError") {
  //   const errors = Object.values(err.errors).reduce((acc, el) => {
  //     acc[el.path] = el.message;
  //     return acc;
  //   }, {});
  //   return new AppError("Invalid data supplied", errors, 400);
  // }

  // if (err.code === 11000) {
  //   const field = Object.keys(err.keyValue)[0];
  //   return new AppError(
  //     "Duplicate field value",
  //     { [field]: `${field} already exists` },
  //     400
  //   );
  // }

  // return new AppError("Something went wrong", null, 500);
};

const handleCastErrorDb = err => {
  let error = {}

  if (err.name == "CastError" || err.reason == null) {
    error[err.path] = `Invalid data provided for ${err.path}. Expected ${err.kind} but got ${err.value}`
  }

  return new AppError('', error, 400)
}





// const handleValidationErrorDB = (err)=>{   
//     const errors= Object.values(err.errors).reduce((acc, el)=>{
//         if(el.name == "CastError" ){
//             acc[el.path] = `Invalid data provided for ${el.path}. Expected ${el.kind} but got (${el.value})`

//         }else{
//             acc[el.path] = el.message;
//         }

//       return acc;
//     }, {})

//     return new AppError('Invalid data supplied', errors, 400)

// }



const sendErrorProd = (err) => {
  // A) Operational, trusted error: Send error and message to client
  if (err.isOperational) {
    return NextResponse.json(
      {
        status: err.status,
        message: err.message,
        errors: err.errors,
      },
      { status: err.statusCode }
    );

  }
  // B) Programming or unknown error: Don't leak error details
  // 1) Log the error
  console.error('ERROR', err)
  return NextResponse.json(
    {
      status: 'error',
      message: 'Some went very wrong!',
      err
    },
    { status: 500 }
  );


}
const sendErrorDev = (err) => {
  // A) API
  return NextResponse.json(
    {
      status: err.status,
      message: err.message,
      errors: err,
    },
    { status: err.statusCode }
  );

}


export const sendError = (err) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.APP_ENV === 'development') {

    return sendErrorDev(err)

  } else if (process.env.APP_ENV === 'production') {
    let error = err;

    //Handle Mongoose Erros
    if (error.name === 'CastError') error = handleCastErrorDb(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldError(error);

    //Handle JWT Errors
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpireError();


    return sendErrorProd(error)
  }

};
