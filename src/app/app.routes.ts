import { Routes } from '@angular/router';
import { CarModelDetailComponent } from './car-model-detail/car-model-detail.component';
import { CarConfigDetailComponent } from './car-config-detail/car-config-detail.component';
import { CarSummaryComponent } from './car-summary/car-summary.component';
import { carModelGuard } from './car-model.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/car-model', pathMatch: 'full' },
    { path: 'car-model', component: CarModelDetailComponent },
    { path: 'car-config', component: CarConfigDetailComponent, canActivate: [carModelGuard] },
    { path: 'car-summary', component: CarSummaryComponent, canActivate: [carModelGuard] },
    { path: '**', component: CarModelDetailComponent },
];
