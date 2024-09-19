import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreateBinComponent } from './components/create-bin/create-bin.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ViewSnippetComponent } from './components/view-snippet/view-snippet.component';

export const routes: Routes = [
    {path: 'create-bin', component: CreateBinComponent, canActivate:[authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component:SignupComponent },
    {path: '', component:HomeComponent },
    {path: 'snippet/:id', component:ViewSnippetComponent },
    {path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)},


    {path: '**', component:NotfoundComponent}

];
