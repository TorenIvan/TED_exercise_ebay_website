import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
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
