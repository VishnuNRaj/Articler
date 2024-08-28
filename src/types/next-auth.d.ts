
declare module "next-auth" {
  interface Session {
      user: {
          id: string;
          email: string;
          name: string;
          image?: string;
      };
  }

  interface User {
      id?: string;
      email: string;
      name: string;
      profile?: string;
  }

  interface JWT {
      id?: string;
      email?: string;
      name?: string;
      profile?: string;
  }
}

export default "next-auth"