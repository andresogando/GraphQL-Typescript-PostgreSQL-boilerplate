import { User } from "src/models/User";
import { BaseEntity } from "typeorm";

export default class UserDatasource extends BaseEntity<User> {
  constructor() {
    super()
  }

  async findById(id: String) {
    return await this.find({ where: { id: id } })[0];
  }
}
