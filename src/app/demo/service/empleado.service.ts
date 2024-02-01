import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private employeesCollection: AngularFirestoreCollection<Empleado>;

  constructor(private afs: AngularFirestore) {
    this.employeesCollection = this.afs.collection<Empleado>('empleados');
  }

  getEmployees(): Observable<Empleado[]> {
    return this.employeesCollection.valueChanges();
  }

  deleteEmployee(id:string): Promise<void>{
    return this.employeesCollection.doc(id).delete()
  }
}
