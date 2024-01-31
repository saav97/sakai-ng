import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';

@Component({
  selector: 'app-empleados-registrados',
  templateUrl: './empleados-registrados.component.html',
  styleUrl: './empleados-registrados.component.scss'
})
export class EmpleadosRegistradosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService){};

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((data)=>{
      this.empleados = data;
    })
  }
}
