import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { EmpleadosRegistradosComponent } from './empleados-registrados.component';
import { EmpleadosRegistradosRoutingModule } from './empleados-registrados-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        InputTextModule,
        EmpleadosRegistradosRoutingModule,
        ConfirmDialogModule
    ],
    declarations: [EmpleadosRegistradosComponent]
})

export class EmpleadoRegistradoModule{}