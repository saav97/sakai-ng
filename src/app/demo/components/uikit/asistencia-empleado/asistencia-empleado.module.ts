import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { AsistenciaEmpleadoComponent } from "./asistencia-empleado.component";
import { AsistenciaEmpleadoRoutingModule } from "./asistencia-empleado-routing";
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';






@NgModule({
    imports:[
        CommonModule,
        CalendarModule,
        TableModule,
        ButtonModule,
        AsistenciaEmpleadoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule,
        SkeletonModule,
        DialogModule,
        InputTextModule,
        InputMaskModule,
        ToastModule,
        ConfirmDialogModule
    ],
    declarations:[AsistenciaEmpleadoComponent],
})

export class AsistenciaEmpleadoModule {}