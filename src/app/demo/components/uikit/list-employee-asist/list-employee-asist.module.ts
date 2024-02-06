import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { ListEmployeeAsistComponent } from './list-employee-asist.component';
import { ListEmployeeAsistRoutingModule } from './list-employee-asist-routing.module';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		TableModule,
		ButtonModule,
		
        ListEmployeeAsistRoutingModule

		
	],
	declarations: [ListEmployeeAsistComponent]
})
export class ListEmployeeAsistModule { }
