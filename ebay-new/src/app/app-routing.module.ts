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
import { ApplicationsComponent } from './applications/applications.component';

const routes: Routes = [
  {
    path: '', component: SignInComponent
  },
  {
    path: 'signin', component: SignInComponent
  },
  {
    path: 'signup', component: SignUpComponent, pathMatch: 'full'
  },
  {
    path: 'forgotpassword', component: ForgotPasswordComponent, pathMatch: 'full'
  },
  {
    path: 'index', component: IndexComponent, pathMatch: 'full'
  },
  {
    path: 'indexuser/:id', component: IndexUserComponent, pathMatch: 'full'
  },
  {
    path: 'indexadmin', component: IndexAdminComponent, pathMatch: 'full'
  },
  {
    path: 'waiting', component: WaitingAcceptanceComponent, pathMatch: 'full'
  },
  {
    path: 'newpassword', component: NewPasswordComponent, pathMatch: 'full'
  },
  {
    path: 'personalinfo/:id', component: PersonalInfoComponent, pathMatch: 'full'
  },
  {
    path: 'personalauctions/:id', component: PersonalAuctionsComponent, pathMatch: 'full'
  },
  {
    path: 'userslist', component: UsersListComponent, pathMatch: 'full'
  },
  {
    path: 'applications', component: ApplicationsComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
