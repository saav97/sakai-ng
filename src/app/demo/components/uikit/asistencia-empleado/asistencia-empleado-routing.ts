import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AsistenciaEmpleadoComponent } from "./asistencia-empleado.component";

@NgModule({
    imports:[RouterModule.forChild([
        {path: '', component: AsistenciaEmpleadoComponent}
    ])],
    exports: [RouterModule]
})

export class AsistenciaEmpleadoRoutingModule {}