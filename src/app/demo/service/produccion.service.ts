import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject, catchError, concatMap, forkJoin, from, map, of, startWith, switchMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  private updateSubject = new Subject<void>();


  constructor(private afs: AngularFirestore) { }


  obtenerFechas(idEmpleado: string) {
    return from(this.afs.collection(`empleados/${idEmpleado}/cosecha`).get()).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => doc.id)),
      catchError(error => {
        console.error('Error en la consulta de fechas:', error);
        return of([]); // Manejar el error devolviendo un array vacío o un valor predeterminado
      })
    );
  }
  
  obtenerProduccionFecha(idEmpleado: string, fecha: string) {
    return this.afs.collection(`empleados/${idEmpleado}/cosecha/${fecha}/bines`).valueChanges({ idField: 'id' }).pipe(
      catchError(error => {
        console.error(`Error en la consulta de producción para la fecha ${fecha}:`, error);
        return of([]); // Manejar el error devolviendo un array vacío o un valor predeterminado
      })
    );
  }

  obtenerProduccionActualizado(idEmpleado: string): Observable<any[]> {
    return this.updateSubject.pipe(
      startWith(null), // Para que se ejecute al menos una vez
      switchMap(() => this.obtenerFechas(idEmpleado)),
      switchMap(fechas => forkJoin(fechas.map(fecha => this.obtenerProduccionFecha(idEmpleado, fecha))))
    );
  }

  editBins(idEmpleado:string, fecha:string, idBins:string, newBins:string){
    return this.afs.collection(`empleados/${idEmpleado}/cosecha/${fecha}/bines`).doc(idBins).update(newBins);
  }

  deleteBins(idEmpleado:string, fecha:string, idBins:string){
    console.log(idBins)
    return this.afs.collection(`empleados/${idEmpleado}/cosecha/${fecha}/bines`).doc(idBins).delete();

  }

  agregarBins(idEmpleado:string, fecha:string, newBins:any){
    const id = this.afs.createId();
    newBins.id = id;
    newBins.tamanio = newBins.tamanio.tamanio;
    return this.afs.collection(`empleados/${idEmpleado}/cosecha/${fecha}/bines`).doc(newBins.id).set(newBins);
  }

  obtenerBines(){
    return this.afs.collection('lotes').valueChanges();
  }
}

