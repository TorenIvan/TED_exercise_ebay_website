import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WaitingAcceptanceComponent } from './waiting-acceptance/waiting-acceptance.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { IndexUserComponent } from './index-user/index-user.component';

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
  },
  {
    path: 'indexuser', component: IndexUserComponent
  },
  {
    path: 'waiting', component: WaitingAcceptanceComponent
  },
  {
    path: 'newpassword', component: NewPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
