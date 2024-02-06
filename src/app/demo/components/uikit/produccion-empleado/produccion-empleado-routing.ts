import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProduccionEmpleadoComponent } from "./produccion-empleado.component";

@NgModule({
    imports:[RouterModule.forChild([
        {path: '', component: ProduccionEmpleadoComponent}
    ])],
    exports: [RouterModule]
})

export class ProduccionEmpleadoRoutingModule {}