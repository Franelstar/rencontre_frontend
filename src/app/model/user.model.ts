export class User {
  constructor(public id: number,
              public email: string,
              public infosPersos: InfosPersonelle) {
  }
}

export class InfosPersonelle {
  constructor(public nom: string,
              public prenom: string,
              public sexe: string,
              public o_sexuele: number,
              public date_naissance: Date,
              public apropro: string,
              public sexe_cherche: string,
              public age_min: number,
              public age_max: number,
              public photo?: string) {
  }
}
