import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationComponent } from './formation/formation.component';
import { SessionComponent } from './session/session.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'employe', component: ListEmployeeComponent },
  { path: 'formations', component:FormationComponent },
  { path: 'sessions', component: SessionComponent},
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
