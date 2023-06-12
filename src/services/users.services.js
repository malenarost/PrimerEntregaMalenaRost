import { UserModel } from "../DAO/models/users.model";

class userService {
  async getAllUsers() {
    const users = await UserModel.find({});
    return users;
  }
}

export const userService = new userService();
