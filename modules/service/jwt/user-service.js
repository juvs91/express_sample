import createError from "http-errors"
export default class UserService {
  constructor(userRepository, passwordHasher){
    this.userRepository = userRepository
    this.passwordHasher = passwordHasher
  }
  async verifyCredentials(credentials) {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.get({
      filter:{email: credentials.email}
    });
    if (!foundUser) {
      throw createError(401, invalidCredentialsError)
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.get("password"),
    );

    if (!passwordMatched) {
      throw createError(401, invalidCredentialsError)
    }
    return foundUser;
  }
}