import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Import AngularFirestoreModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { EmpleadoService } from './demo/service/empleado.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyDooXrFJIt4A94F9jfYhvNSaFc-Q9IyWY4",
            authDomain: "sistemacosecha.firebaseapp.com",
            projectId: "sistemacosecha",
            storageBucket: "sistemacosecha.appspot.com",
            messagingSenderId: "1058239380299",
            appId: "1:1058239380299:web:77e211929e9c77600b46ce",
            measurementId: "G-X65XCFTY4C"
        }),
        AngularFireAuthModule,
        AngularFirestoreModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        EmpleadoService,
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
