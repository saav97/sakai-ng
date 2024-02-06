import { Component, OnInit, LOCALE_ID } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from 'src/app/demo/service/asistencia.service';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Asistencia } from 'src/app/demo/models/asistencia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-asistencia-empleado',
  templateUrl: './asistencia-empleado.component.html',
  styleUrl: './asistencia-empleado.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, MessageService, ConfirmationService]
})
export class AsistenciaEmpleadoComponent implements OnInit {

  visible: boolean = false;

  asistenciaForm: FormGroup;

  empleadoId: string = '';

  asistencias: Asistencia[] = [];

  empleado: Empleado;

  dateRange: Date[];

  asistenciasFiltradas: Asistencia[];

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private route: ActivatedRoute, private location: Location, private asistenciaService: AsistenciaService, private empleadoService: EmpleadoService, private fb: FormBuilder) {

    this.asistenciaForm = this.fb.group({
      fecha: ['', Validators.required],
      horarioEntrada: [''],
      horarioSalida: [''],
      observacionEntrada: [''],
      observacionSalida: ['Sin datos']
    })
  }


  ngOnInit(): void {

    this.empleadoId = this.route.snapshot.paramMap.get('id');

    this.empleadoService.getEmployee(this.empleadoId).subscribe((data) => {

      this.empleado = data;
    })

    this.asistenciaService.obtenerRegistroAsistencia(this.empleadoId).subscribe((data) => {

      this.asistencias = data.sort((a, b) => {
        const fechaA = a.fecha.split('-').reverse().join('-');
        const fechaB = b.fecha.split('-').reverse().join('-');

        // Compara las fechas y devuelve el resultado de la comparación
        return new Date(fechaB).getTime() - new Date(fechaA).getTime();
      })

      this.asistenciasFiltradas = this.asistencias;
    })
  }

  volverAtras() {
    this.location.back();
  }

  filtrarPorFechas(): void {
    console.log('Filtrando');

    if (this.dateRange && this.dateRange.length === 2) {
      const fechaInicio = this.dateRange[0];
      const fechaFin = this.dateRange[1];

      // Filtra las asistencias basadas en el rango de fechas
      this.asistenciasFiltradas = this.asistencias.filter(asistencia =>
        this.estaEnRango(asistencia.fecha, fechaInicio, fechaFin)
      );
    } else {
      // Si no se ha seleccionado un rango de fechas, muestra todas las asistencias
      this.asistenciasFiltradas = this.asistencias;
    }
  }

  estaEnRango(fechaAsistencia: string, inicio: Date, fin: Date): boolean {
    const partesInicio = this.formatearFecha(inicio).split('-');
    const partesFin = this.formatearFecha(fin).split('-');
    const partesFechaAsistencia = fechaAsistencia.split('-');

    const anioInicio = parseInt(partesInicio[2], 10);
    const mesInicio = parseInt(partesInicio[1], 10);
    const diaInicio = parseInt(partesInicio[0], 10);

    const anioFin = parseInt(partesFin[2], 10);
    const mesFin = parseInt(partesFin[1], 10);
    const diaFin = parseInt(partesFin[0], 10);

    const anioFechaAsistencia = parseInt(partesFechaAsistencia[2], 10);
    const mesFechaAsistencia = parseInt(partesFechaAsistencia[1], 10);
    const diaFechaAsistencia = parseInt(partesFechaAsistencia[0], 10);

    const fechaInicio = new Date(anioInicio, mesInicio - 1, diaInicio);
    const fechaFin = new Date(anioFin, mesFin - 1, diaFin);
    const fechaAsistenciaObj = new Date(anioFechaAsistencia, mesFechaAsistencia - 1, diaFechaAsistencia);

    return fechaAsistenciaObj >= fechaInicio && fechaAsistenciaObj <= fechaFin;
  }

  formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();

    return `${dia}-${mes}-${anio}`;
  }

  showDialog(asistencia: Asistencia) {
    if (!asistencia.observacionSalida) {
      asistencia = {
        observacionSalida: 'SIN OBSERVACION',
        ...asistencia
      }
    }

    const { horarioEntrada, fecha, horarioSalida, observacionEntrada, observacionSalida } = asistencia;

    this.asistenciaForm.setValue({
      horarioEntrada,
      fecha,
      horarioSalida,
      observacionEntrada,
      observacionSalida
    });
    this.visible = true;
  }


  editar() {

    let asistencia: Asistencia = this.asistenciaForm.value;
    if (typeof this.asistenciaForm.value.horarioEntrada === 'object') {
      let valor = this.asistenciaForm.value.horarioEntrada;
      const fecha = new Date(valor);
      const horas = fecha.getHours();
      const minutos = fecha.getMinutes();
      const segundos = fecha.getSeconds();
      const formatoHora = `${horas}:${minutos}:${segundos} ${horas >= 12 ? 'p.m.' : 'a.m.'}`;
      asistencia.horarioEntrada = formatoHora;
    }

    if (typeof this.asistenciaForm.value.horarioSalida === 'object') {
      let valor = this.asistenciaForm.value.horarioSalida;
      const fecha = new Date(valor);
      const horas = fecha.getHours();
      const minutos = fecha.getMinutes();
      const segundos = fecha.getSeconds();
      const formatoHora = `${horas}:${minutos}:${segundos} ${horas >= 12 ? 'p.m.' : 'a.m.'}`;
      console.log(formatoHora);

      asistencia.horarioSalida = formatoHora;
    }

    console.log(asistencia);


    this.asistenciaService.editAsistencia(this.empleadoId, asistencia).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asistencia editada con exito!' });
      this.visible = false;
    })
      .catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      })
  }


  deleteAsistencia(fecha: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar la siguiente fecha ' + fecha + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.asistenciaService.deleteAsistencia(this.empleadoId, fecha).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Asistencia Eliminada', life: 3000 });
        })
          .catch((error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar', life: 3000 });
            console.error(error);
          })
      }
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.asistenciasFiltradas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Asistencia');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + ` ${this.empleado.apellido} ${this.empleado.nombre}` + new Date().getTime() + EXCEL_EXTENSION);
  }
}
