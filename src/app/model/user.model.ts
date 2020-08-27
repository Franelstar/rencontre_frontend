export class User {
  constructor(public id: number,
              public email: string,
              public infosPersos: InfosPersonelle,
              public infosPhysique?: InfosPhysique) {
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

export class InfosPhysique {
  constructor(public continent: string,
              public couleur_peau: string,
              public taille: number,
              public silhouette: string,
              public couleur_yeux: string,
              public couleur_cheuveux: string) {
  }
}
