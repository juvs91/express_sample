export default class UserController {
  constructor(user_datasource, userService, jwtService, passwordHasher){
    this.user_datasource = user_datasource
    this.userService = userService
    this.jwtService = jwtService
    this.passwordHasher = passwordHasher
  }
  async login(credentials) {
    const user = await this.userService.verifyCredentials(credentials);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(user);
    return {token};
  }
  async signup(credentials) {
    const password = await this.passwordHasher.hashPassword(credentials.password)
    credentials.password = password
    let user = await this.user_datasource.create(credentials)
    return this.jwtService.generateToken(user)
  }
}