import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WaitingAcceptanceComponent } from './waiting-acceptance/waiting-acceptance.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalAuctionsComponent } from './personal-auctions/personal-auctions.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { UsersListComponent } from './users-list/users-list.component';

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
    path: 'indexadmin', component: IndexAdminComponent
  },
  {
    path: 'waiting', component: WaitingAcceptanceComponent
  },
  {
    path: 'newpassword', component: NewPasswordComponent
  },
  {
    path: 'personalinfo', component: PersonalInfoComponent
  },
  {
    path: 'personalauctions', component: PersonalAuctionsComponent
  },
  {
    path: 'userslist', component: UsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
