import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

import { HomeComponent } from './components/home/home.component';
import { CompletedOrdersComponent } from './oemp/components/completed-orders/completed-orders.component';
import { DashboardComponent } from './oemp/components/dashboard/dashboard.component';
import { ExecOrdersComponent } from './oemp/components/exec-orders/exec-orders.component';
import { NewOrdersComponent } from './oemp/components/new-orders/new-orders.component';

import { LoginComponent } from './users/components/login/login.component';
import { ResetPwdComponent } from './users/components/login/reset-pwd/reset-pwd.component';
import { NewRegisterComponent } from './users/components/new-register/new-register.component';
import { UserDashboardComponent } from './users/components/dashboard/dashboard.component';
import { NewUserComponent } from './users/components/dashboard/new-user/new-user.component';
import { UpdateUserComponent } from './users/components/dashboard/update-user/update-user.component';
import { ValidateComponent } from './users/components/validate/validate.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users/reset-pwd/:id/:token', component: ResetPwdComponent },
  { path: 'users/new-register', component: NewRegisterComponent },
 
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'oemp', component: DashboardComponent },
      { path: 'oemp/new-orders', component: NewOrdersComponent },
      { path: 'oemp/new-orders/:id', component: NewOrdersComponent },
      { path: 'oemp/exec-orders', component: ExecOrdersComponent },
      { path: 'oemp/exec-orders/:id', component: ExecOrdersComponent },
      { path: 'oemp/completed-orders', component: CompletedOrdersComponent },
    ]
  },
  {
    path: 'home-admin', component: HomeAdminComponent, children: [
      { path: 'users', component: UserDashboardComponent },
      { path: 'users/new', component: NewUserComponent },
      { path: 'users/update/:id', component: UpdateUserComponent },
      { path: 'users/no-validate/:id', component: ValidateComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }