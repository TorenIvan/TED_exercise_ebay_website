import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WaitingAcceptanceComponent } from './waiting-acceptance/waiting-acceptance.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalAuctionsComponent } from './personal-auctions/personal-auctions.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ApplicationsComponent } from './applications/applications.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { AgmCoreModule } from '@agm/core';
import { SlideshowModule } from 'ng-simple-slideshow';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RefreshDearComponent } from './refresh-dear/refresh-dear.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    WaitingAcceptanceComponent,
    NewPasswordComponent,
    IndexUserComponent,
    PersonalInfoComponent,
    PersonalAuctionsComponent,
    IndexAdminComponent,
    UsersListComponent,
    ApplicationsComponent,
    FilterPipe,
    RefreshDearComponent,
    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9hKyE1edZ4iq75XsQHxIcFqZfRbO1k7I'
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
