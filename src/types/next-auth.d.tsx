import NextAuth from "next-auth";

/**
 * Declaração do módulo "next-auth".
 *
 * Este módulo contém as definições de tipos personalizados para o NextAuth.js.
 *
 * @module next-auth
 */
declare module "next-auth" {
  /**
   * Interface que representa um usuário.
   *
   * @interface User
   * @property {string} id - O ID do usuário.
   * @property {string} role - A função do usuário (por exemplo, "customer" ou "admin").
   */
  interface User {
    id: string;
    role: string;
  }

  /**
   * Interface que representa uma sessão.
   *
   * @interface Session
   * @property {User & { id: string; role: string }} user - O usuário da sessão.
   */
  interface Session {
    user: User & {
      id: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  /**
   * Interface que representa o JWT.
   *
   * @interface JWT
   * @property {string} id - O ID do usuário.
   * @property {string} role - A função do usuário.
   */
  interface JWT {
    id: string;
    role: string;
  }
}
