import { NewUserComponent } from './user/newUser/newUser.component';
import { AuthGuard } from './guard/auth.component';
import { LogInComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: '', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
