import { userRoles } from "./User";

export class RefreshToken {
  public id?: string;
  public userRole: userRoles;
  public userId: string;

  constructor(userRole: userRoles, userId: string, id?: string) {
    this.userRole = userRole;
    this.userId = userId;

    if (id) this.id = id;
  }
}
