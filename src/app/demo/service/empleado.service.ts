import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private EmpleadosCollection: AngularFirestoreCollection<Empleado>

  constructor(private afs: AngularFirestore) {
    this.EmpleadosCollection = this.afs.collection<Empleado>('empleados');
   }

   getEmpleados(): Observable<Empleado[]>{
    return this.EmpleadosCollection.valueChanges();
   }
}
