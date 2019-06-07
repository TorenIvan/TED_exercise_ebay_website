import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '', component: SignInComponent
  },
  {
    path: 'signin', component: SignInComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'forgotpassword', component: ForgotPasswordComponent
  },
  {
    path: 'index', component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
