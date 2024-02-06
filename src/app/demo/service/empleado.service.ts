import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Empleado } from '../models/empleado';
import { Observable, map } from 'rxjs';

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

  getEmployee(idEmpleado):Observable<Empleado>{
    const employeeDoc = this.employeesCollection.doc<Empleado>(idEmpleado);

    return employeeDoc.valueChanges();
  }

  deleteEmployee(id: string): Promise<void> {
    console.log(id);
    return this.employeesCollection.doc(id).delete()
  }

  private async getEmployeedByDni(dni: string): Promise<Empleado | undefined> {
    const querySnapshot = await this.employeesCollection.ref.where('dni', '==', dni).get();

    if (querySnapshot.size > 0) {
      const existeEmployee = querySnapshot.docs[0].data() as Empleado;
      return existeEmployee;
    }
    else {
      return undefined
    }
  }

  async addEmployee(newEmployee: Empleado): Promise<void> {

    const existeEmployee = await this.getEmployeedByDni(newEmployee.dni);

    if (existeEmployee) {
      throw new Error('Ya existe un empleado con el mismo DNI');
    }

    const id = this.afs.createId();
    newEmployee.id = id;
    return this, this.employeesCollection.doc(id).set(newEmployee);
  }


  async editEmployee(employee: Empleado): Promise<void> {
    return this.employeesCollection.doc(employee.id).update(employee);
  }

  getTotalEmpleados(): Observable<number> {
    return this.employeesCollection.get().pipe(
      map(querySnapshot => querySnapshot.size)
    );
  }
}
