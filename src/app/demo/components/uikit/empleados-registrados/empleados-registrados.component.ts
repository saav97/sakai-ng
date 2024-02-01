import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-empleados-registrados',
  templateUrl: './empleados-registrados.component.html',
  styleUrl: './empleados-registrados.component.scss'
})
export class EmpleadosRegistradosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService, private messageService: MessageService, private confirmationService: ConfirmationService){};

  ngOnInit(): void {
    this.empleadoService.getEmployees().subscribe((data)=>{
      this.empleados = data;
      console.log(data);
      
    })
  }

  deleteEmpleado(empleado: Empleado){
    console.log('eliminando');
    
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar a ' + empleado.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.empleadoService.deleteEmployee(empleado.id).then(()=>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Eliminado', life: 3000 });
          })
          .catch((error)=>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Error al eliminar', life: 3000 });
            console.error(error);
          })
      }
  });
  }
}
