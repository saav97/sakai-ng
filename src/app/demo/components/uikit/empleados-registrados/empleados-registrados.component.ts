import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-empleados-registrados',
  templateUrl: './empleados-registrados.component.html',
  styleUrl: './empleados-registrados.component.scss',
  providers: [MessageService]
})
export class EmpleadosRegistradosComponent implements OnInit {

  empleados: Empleado[] = [];
  personalForm: FormGroup;
  visible: boolean = false;


  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: [''],
      cuil: [''],
      dni: ['', Validators.required],
      direccion: [''],
      fechaNacimiento: [''],
      telefono: [''],
      telefonoFamiliar: [''],
      cbu: [''],
      alias: [''],
      legajo: [''],
      codigo: [''],
      categoria: [''],
      id: ['']
    })
  };

  ngOnInit(): void {
    this.empleadoService.getEmployees().subscribe((data) => {
      this.empleados = data;
    })
  }

  deleteEmpleado(empleado: Empleado) {
    console.log(empleado.id);

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar a ' + empleado.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.empleadoService.deleteEmployee(empleado.id).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Eliminado', life: 3000 });
        })
          .catch((error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar', life: 3000 });
            console.error(error);
          })
      }
    });
  }


  showDialog(empleado: Empleado) {
    this.personalForm.setValue({
      ...empleado
    })
    this.visible = true;
  }

  editEmpleado() {
    if (!this.personalForm.invalid) {
      this.empleadoService.editEmployee(this.personalForm.value).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Editado con exito', life: 3000 });
        this.visible = false;
      }).catch((error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Editar:'+error, life: 3000 });
        })
    }
  }

}
