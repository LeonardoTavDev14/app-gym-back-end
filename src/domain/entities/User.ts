export const userRoles = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  PROFESSIONAL: "PROFESSIONAL",
  USER: "USER",
} as const;

export type userRoles = (typeof userRoles)[keyof typeof userRoles];

export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public role: userRoles;
  public age: number;

  constructor(
    name: string,
    email: string,
    password: string,
    role: userRoles,
    age: number,
    id?: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.age = age;

    if (id) this.id = id;
  }
}
