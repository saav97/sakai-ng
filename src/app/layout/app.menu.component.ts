import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Gestión Administración',
                items: [
                    { label: 'Agregar Empleado', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Empleados Registrados', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/empleados-registrados'] },
                ]
            },
            {
                label: 'Asistencia',
                items: [
                    { label: 'Registro Asistencia Manual', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Lista Empleados', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                ]
            },
            {
                label: 'Producción',
                items: [
                    { label: 'Producción por empleado', icon: 'pi pi-fw pi-eye' },
                    { label: 'Producción General', icon: 'pi pi-fw pi-globe'},
                ]
            },
        ];
    }
}
