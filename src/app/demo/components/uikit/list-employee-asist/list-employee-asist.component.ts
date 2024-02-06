import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';

@Component({
  selector: 'app-list-employee-asist',
  templateUrl: './list-employee-asist.component.html',
  styleUrl: './list-employee-asist.component.scss'
})
export class ListEmployeeAsistComponent implements OnInit {

  empleados: Empleado[] = [];
  
  constructor(private empleadoService: EmpleadoService, private router:Router) {

  }

  verAsistencia(empleadoId: string){
    
    this.router.navigate(['/uikit/empleado-asistencia', empleadoId]);
  }

  verProduccion(empleadoId: string){
    this.router.navigate(['/uikit/empleado-produccion', empleadoId]);
  }

  ngOnInit(): void {
    this.empleadoService.getEmployees().subscribe((data) => {
      this.empleados = data;
    })
  }

}
