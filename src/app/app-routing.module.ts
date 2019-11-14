import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { CounterContentComponent } from './counter-content/counter-content.component';

const routes: Routes = [
  {path: '', component :HomeComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'counter/:id', component: CounterContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }