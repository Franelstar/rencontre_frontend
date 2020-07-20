export class User {
  photo: string;
  constructor(public id: number,
              public username: string,
              public password: string,
              public firstname: string,
              public lastnale: string,
              public email: string,
              public token?: string) {
  }
}
