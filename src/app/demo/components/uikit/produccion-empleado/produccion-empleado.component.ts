import { Component, OnInit, LOCALE_ID } from '@angular/core';
import * as FileSaver from 'file-saver';

import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { Empleado } from 'src/app/demo/models/empleado';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { ProduccionService } from 'src/app/demo/service/produccion.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-produccion-empleado',
  templateUrl: './produccion-empleado.component.html',
  styleUrl: './produccion-empleado.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, MessageService, ConfirmationService]
})
export class ProduccionEmpleadoComponent implements OnInit {

  title: string = '';

  buttonAccion: string = '';

  private destroy$ = new Subject<void>();

  empleadoId: string = '';

  produccion: any[] = [];

  fechas: any[] = [];

  empleado!: Empleado

  dateRange: Date[];

  ProduccionFiltradas: any[];

  visible: boolean = false;

  binesForm: FormGroup;

  bines: any[] = [];

  nuevo: boolean = true;

  listaFechas: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private fb: FormBuilder, private location: Location, private produccionService: ProduccionService, private route: ActivatedRoute, private empleadoService: EmpleadoService) {
    this.binesForm = this.fb.group({
      fecha: [''],
      horarioRealizado: [''],
      tamanio: ['', Validators.required],
      precioSugerido: [''],
      id: ['']
    })
  }

  ngOnInit(): void {
    this.empleadoId = this.route.snapshot.paramMap.get('id');

    this.empleadoService.getEmployee(this.empleadoId).subscribe((resp) => {
      this.empleado = resp;
    })

    this.produccionService.obtenerBines().subscribe((bines) => {
      this.bines = bines;
    })
    this.produccionService.obtenerFechas(this.empleadoId).subscribe(
      (fechas: string[]) => {
        console.log(fechas);

        this.obtenerProduccionInicial(this.empleadoId, fechas);
      },
      error => {
        console.error('Error al obtener las fechas:', error);
      }
    );
  }

  obtenerProduccionInicial(idEmpleado: string, fechas: string[]): void {
    const llamadasProduccion = fechas.map(fecha => this.produccionService.obtenerProduccionFecha(idEmpleado, fecha));

    combineLatest(llamadasProduccion).subscribe(
      produccionesPorFecha => {
        produccionesPorFecha.forEach((produccionFecha, index) => {
          // Actualizar la lista local de manera incremental
          this.actualizarListaIncremental(fechas[index], produccionFecha);
        });

        // Agregar las nuevas fechas si es que las hay

        const nuevasFechas = fechas.filter(fecha => !this.listaFechas.includes(fecha));
        nuevasFechas.forEach(nuevaFecha => {
          this.produccionService.obtenerProduccionFecha(idEmpleado, nuevaFecha).subscribe(
            nuevaProduccion => {
              this.actualizarListaIncremental(nuevaFecha, nuevaProduccion);
            },
            error => {
              console.error('Error al obtener la producción para la nueva fecha:', error);
            }
          );
        });
      },
      error => {
        console.error('Error al obtener la producción:', error);
      }
    );
  }
  private actualizarListaIncremental(fecha: string, nuevosElementos: any[]): void {
    const index = this.produccion.findIndex(item => item.fecha === fecha);

    if (nuevosElementos.length > 0) {
      if (index !== -1) {
        // Si la fecha ya existe, actualiza los bines
        this.produccion[index].bines = nuevosElementos;
      } else {
        // Si la fecha no existe, agrega un nuevo elemento a la lista
        this.produccion.push({ fecha, bines: nuevosElementos });

        this.ProduccionFiltradas = this.produccion.sort((a, b) => {
          const fechaA = a.fecha.split('-').reverse().join('-');
          const fechaB = b.fecha.split('-').reverse().join('-');

          // Compara las fechas y devuelve el resultado de la comparación
          return new Date(fechaB).getTime() - new Date(fechaA).getTime();
        });
      }
    } else {
      // Si nuevosElementos está vacío, puedes manejarlo según tus necesidades
      console.log(`No se agregó la fecha ${fecha} porque no tiene elementos.`);
    }
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
      this.ProduccionFiltradas = this.produccion.filter(p =>
        this.estaEnRango(p.fecha, fechaInicio, fechaFin)
      );
    } else {
      // Si no se ha seleccionado un rango de fechas, muestra todas las asistencias
      this.ProduccionFiltradas = this.produccion;
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

  exportExcel() {
    import('xlsx').then((xlsx) => {
      // Crear un nuevo array para almacenar los datos formateados
      const excelData = [];

      // Iterar sobre las producciones filtradas y formatear los datos
      this.ProduccionFiltradas.forEach(produccion => {
        // Crear un nuevo objeto para cada fecha
        const fechaData = {
          Fecha: produccion.fecha  // Agregar la fecha al objeto
        };

        // Iterar sobre los bines y agregarlos al objeto
        produccion.bines.forEach((bin, index) => {
          // Crear un nuevo objeto para cada bin
          const binData = {
            [`Bin${index + 1}_HorarioRealizado`]: bin.horarioRealizado,   // Ajusta según la estructura de tu objeto Bin
            [`Bin${index + 1}_Tamanio`]: bin.tamanio,   // Ajusta según la estructura de tu objeto Bin
            // ... Agrega más propiedades según la estructura de tu objeto Bin
          };

          // Fusionar el objeto BinData en el objeto FechaData
          Object.assign(fechaData, binData);
        });

        // Agregar el objeto de fecha al array principal
        excelData.push(fechaData);
      });

      // Convertir el array formateado a una hoja de cálculo
      const worksheet = xlsx.utils.json_to_sheet(excelData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Produccion');
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

  showDialog(bines?: any) {
    if (bines) {
      this.title = 'Editar Bins';
      this.buttonAccion = 'Editar';

      if (!bines.precioSugerido) {
        this.binesForm.removeControl('precioSugerido');
      }
      this.binesForm.setValue({
        ...bines
      })
      console.log(this.binesForm.value);
      this.nuevo = false;

    } else {
      this.title = 'Agregar Bins'
      this.buttonAccion = 'Agregar';
    }

    this.visible = true;
    this.binesForm.reset();
  }

  deleteBins(idBins: string, fecha: string) {

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el bins en la fecha ' + fecha + ' ?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.produccionService.deleteBins(this.empleadoId, fecha, idBins).then(() => {
          const index = this.ProduccionFiltradas.findIndex(item => item.fecha === fecha);

          if (index !== -1 && this.ProduccionFiltradas[index].bines.length === 0) {
            // Si la fecha ya no tiene bines después de la eliminación, elimínala de la lista
            this.ProduccionFiltradas.splice(index, 1);

            this.ProduccionFiltradas = this.ProduccionFiltradas.sort((a, b) => {
              const fechaA = a.fecha.split('-').reverse().join('-');
              const fechaB = b.fecha.split('-').reverse().join('-');
              return new Date(fechaB).getTime() - new Date(fechaA).getTime();
            });
          }
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bin Eliminado', life: 3000 });
          // Después de borrar el bin, verifica si la fecha aún tiene bines

        })
          .catch((error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar', life: 3000 });
          });
      }
    });


  }

  editar() {

    if (typeof (this.binesForm.value.fecha) === 'object') {
      const fechaPcalendar: Date = this.binesForm.value.fecha;

      const dd: string = String(fechaPcalendar.getDate());
      const mm: string = String(fechaPcalendar.getMonth() + 1);
      const aaaa: string = String(fechaPcalendar.getFullYear());

      const fechaFormateada: string = `${dd}-${mm}-${aaaa}`;
      this.binesForm.patchValue({
        fecha: fechaFormateada
      })

    }

    if (typeof (this.binesForm.value.horarioRealizado) === 'object') {
      const horarioPcalendar: Date = this.binesForm.value.horarioRealizado;

      const horas: number = horarioPcalendar.getHours();
      const minutos: string = String(horarioPcalendar.getMinutes()).padStart(2, '0');
      const segundos: string = String(horarioPcalendar.getSeconds()).padStart(2, '0');

      // Determina si es AM o PM
      const amPm: string = horas >= 12 ? 'PM' : 'AM';

      // Convierte el formato de 24 horas a 12 horas
      const horas12: number = horas % 12 || 12;

      const horarioFormateado: string = `${horas12}:${minutos}:${segundos} ${amPm}`;

      // Actualiza el valor de 'horarioRealizado' en el formulario
      this.binesForm.patchValue({
        horarioRealizado: horarioFormateado
      });
    }


    if (this.nuevo) {
      this.produccionService.agregarBins(this.empleadoId, this.binesForm.value.fecha, this.binesForm.value).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bin Agregado con exito', life: 3000 });
        this.visible = false;
      })
        .catch((error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Agregar', life: 3000 });
        })
    }
    else {
      this.produccionService.editBins(this.empleadoId, this.binesForm.value.fecha, this.binesForm.value.id, this.binesForm.value).
        then(() => {
          this.visible = false;
          this.binesForm.reset();
        })
        .catch((error) => {
          console.log(error);

        })
    }
  }
}