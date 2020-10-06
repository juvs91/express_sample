import createError from "http-errors"
// export default class JWTAuth {
//   constructor(tokenService, notNeedAuthRoutes){
//     this.tokenService = tokenService
//     this.notNeedAuthRoutes = notNeedAuthRoutes
//   }
//   async authenticate(req, _, next) {
//     try {
//       //  check the notNeedAuthRoutes with the rout in req, if it's in it just call next
//       console.log(this)
//       let byPass = this.notNeedAuthRoutes[req.originalUrl]
//       if(byPass) {
//         next()
//       }
//       const token = this.extractCredentials(req)
//       const userProfile = await this.tokenService.verifyToken(token)
//       req.userProfile = userProfile
//       next()
//     } catch (error) {
//       next(error)
//     }
//   }
//   async extractCredentials(request) {
//     if (!request.headers.authorization) {
//       // throw new HttpErrors.Unauthorized(`Authorization header not found.`);
//       throw createError(401, `Authorization header not found.`)
//     }

//     // for example : Bearer xxx.yyy.zzz
//     const authHeaderValue = request.headers.authorization;

//     if (!authHeaderValue.startsWith('Bearer')) {
//       throw createError(401, `Authorization header is not of type 'Bearer'.`)
//     }

//     //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
//     const parts = authHeaderValue.split(' ');
//     if (parts.length !== 2) {
//       throw createError(401, `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,)
//     }
//     const token = parts[1];

//     return token;
//   }
// }


export default (tokenService, notNeedAuthRoutes) => {
  return async (req, _, next) => {
    let extractCredentials = (request) => {
      if (!request.headers.authorization) {
        // throw new HttpErrors.Unauthorized(`Authorization header not found.`);
        throw createError(401, `Authorization header not found.`)
      }
    
      // for example : Bearer xxx.yyy.zzz
      const authHeaderValue = request.headers.authorization;
    
      if (!authHeaderValue.startsWith('Bearer')) {
        throw createError(401, `Authorization header is not of type 'Bearer'.`)
      }
    
      //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
      const parts = authHeaderValue.split(' ');
      if (parts.length !== 2) {
        throw createError(401, `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,)
      }
      const token = parts[1];
    
      return token;
    }
    try {
      //  check the notNeedAuthRoutes with the rout in req, if it's in it just call next

      let byPass = notNeedAuthRoutes[req.originalUrl]
      if(byPass !== undefined && byPass !== null) {
        return next()
      }
      const token = extractCredentials(req)
      const userProfile = await tokenService.verifyToken(token)
      req.userProfile = userProfile
      return next()
    } catch (error) {
      return next(error)
    }
  }
}

