import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private afs: AngularFirestore) { }

  obtenerRegistroAsistencia(empleadoId: string): Observable<Asistencia[]>{
    return this.afs.collection<Asistencia>(`empleados/${empleadoId}/asistencias`).valueChanges();
  }

  async editAsistencia(empleadoId: string, newAsistencia: Asistencia): Promise<void> { 
    return this.afs.collection<Asistencia>(`empleados/${empleadoId}/asistencias`).doc(newAsistencia.fecha).update(newAsistencia);
  }

  deleteAsistencia(empleadoId: string, fecha:string){
    return this.afs.collection<Asistencia>(`empleados/${empleadoId}/asistencias`).doc(fecha).delete();
  }
}
