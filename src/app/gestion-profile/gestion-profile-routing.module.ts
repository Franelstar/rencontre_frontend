import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { InformationsComponent } from './informations/informations.component';
import { GestionProfileComponent } from './gestion-profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../services/auth-guard.service';
import { SearchPartenerComponent } from './search-partner/search-partner.component';

const routes: Routes = [
    { path: 'profil', canActivate: [AuthGuard], component: GestionProfileComponent, 
      children: [
        { path: '', component: HomeComponent },
        { path: 'informations', component: InformationsComponent}
      ]
    },
    { path: 'search-partner' , component: SearchPartenerComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GestionProfileRoutingModule { }