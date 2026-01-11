interface StatusCode  {
    OK:number ,
  CREATED:number ,
  BAD_REQUEST:number ,
  UNAUTHORIZED:number ,
  FORBIDDEN:number ,
  NOT_FOUND:number ,
  CONFLICT:number ,
  INTERNAL_SERVER_ERROR:number ,
}
export const statusCode : StatusCode = {
    OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}