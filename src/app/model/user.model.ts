export class User {
  photo: string;
  constructor(public id: number,
              public nom: string,
              public prenom: string,
              public email: string,
              public password: string,
              public sexe: string,
              public dateNaissnance: Date) {
  }
}
