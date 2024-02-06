import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empleados-registrados', data: { breadcrumb: 'Empleados Registrados' }, loadChildren: () => import('./empleados-registrados/empledos-registrados.module').then(m => m.EmpleadoRegistradoModule) },
        { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
        { path: 'empleados-gestion', data: { breadcrumb: 'Empleados Gestión' }, loadChildren: () => import('./list-employee-asist/list-employee-asist.module').then(m => m.ListEmployeeAsistModule) },
        { path: 'empleado-asistencia/:id', data:{breadcrumb: 'Asistencia Empleado'}, loadChildren:()=> import('./asistencia-empleado/asistencia-empleado.module').then(m => m.AsistenciaEmpleadoModule)},
        { path: 'empleado-produccion/:id', data:{breadcrumb: 'Producciom Empleado'}, loadChildren:()=> import('./produccion-empleado/produccion-empleado.module').then(m => m.ProduccionEmpleadoModule)},

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
