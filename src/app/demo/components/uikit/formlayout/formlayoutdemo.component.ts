import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';

@Component({
    templateUrl: './formlayoutdemo.component.html',
    providers: [MessageService]
})
export class FormLayoutDemoComponent {

    personalForm: FormGroup;


    constructor(private fb: FormBuilder, private empleadoService:EmpleadoService, private messageService: MessageService){
        this.personalForm = this.fb.group({
            nombre:['', Validators.required],
            apellido:['', Validators.required],
            correo:['', Validators.email],
            cuil:['', Validators.required],
            dni:['', Validators.required],
            direccion:[''],
            fechaNacimiento:[''],
            telefono:['', Validators.required],
            telefonoFamiliar:['', Validators.required],
            cbu:[''],
            alias:[''],
            legajo:['', Validators.required],
            codigo:[''],
            categoria:[''],
        })
    }


    addEmpleado(){
        let employee: Empleado = {
            ...this.personalForm.value
        };

        this.empleadoService.addEmployee(employee).then(()=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado Agregado con exito!' });
        })
        .catch((error)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        })
    }
    

}
