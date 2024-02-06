import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProduccionEmpleadoComponent } from "./produccion-empleado.component";
import { ProduccionEmpleadoRoutingModule } from "./produccion-empleado-routing";
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';








@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        TableModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule,
        SkeletonModule,
        DialogModule,
        InputTextModule,
        InputMaskModule,
        ToastModule,
        ConfirmDialogModule,
        ProduccionEmpleadoRoutingModule,
        DropdownModule,
        InputNumberModule
    ],
    declarations: [ProduccionEmpleadoComponent],
})

export class ProduccionEmpleadoModule { }