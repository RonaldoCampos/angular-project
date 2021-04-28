import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../core/auth/login.guard';
import { HomeComponent } from './home.component';
import { SingInComponent } from './singIn/singin.component';
import { SignUpComponent } from './singup/signup.component';

const routes: Routes = [
    { 
        path: '', 
        component:  HomeComponent,
        canActivate: [
            LoginGuard
        ],
        children:[
            { 
                path: '', 
                component:  SingInComponent,
                data:{
                    title: 'Sign in'
                }
            },
            {
              path:'signup',
              component: SignUpComponent,
              data:{
                title: 'Sign up'
            } 
            },
        ] 
    }, 
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

