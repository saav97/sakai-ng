import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListEmployeeAsistComponent } from './list-employee-asist.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListEmployeeAsistComponent }
	])],
	exports: [RouterModule]
})
export class ListEmployeeAsistRoutingModule { }
