import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpleadosRegistradosComponent } from './empleados-registrados.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmpleadosRegistradosComponent }
	])],
	exports: [RouterModule]
})
export class EmpleadosRegistradosRoutingModule { }
