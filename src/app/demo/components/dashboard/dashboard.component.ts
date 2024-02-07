import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    totalEmpleados: number = 0;

    constructor(private productService: ProductService, public layoutService: LayoutService, private empleadoService: EmpleadoService) {
        
        this.empleadoService.getTotalEmpleados().subscribe((total)=>{
            this.totalEmpleados = total;
        })
        
        this.empleadoService.getEmpleadosAsistenciaEnFecha('22-3-2023').subscribe((resp)=>{
            console.log(resp);
            
        })

        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
        });
    }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
