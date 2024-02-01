import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './formlayoutdemo.component.html'
})
export class FormLayoutDemoComponent {

    personalForm: FormGroup;


    constructor(private fb: FormBuilder){
        this.personalForm = this.fb.group({
            nombre:['', Validators.required],
            apellido:['', Validators.required],
            correo:['', Validators.email],
            cuil:['', Validators.required],
            dni:['', Validators.required],
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
    

}
