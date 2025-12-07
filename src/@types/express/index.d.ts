declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: "SUPERADMIN" | "ADMIN" | "PROFESSIONAL" | "USER";
    };
  }
}
