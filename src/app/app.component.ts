  import {Component, ViewChild} from '@angular/core';
  import { CommonModule } from '@angular/common';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {CarDataService} from './service/car-data.service'
import { CarModelDetailComponent } from './car-model-detail/car-model-detail.component';
import { CarConfigDetailComponent } from './car-config-detail/car-config-detail.component';
import { CarSummaryComponent } from './car-summary/car-summary.component';
import { CarImageComponent } from './car-image/car-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({ 
  selector: 'app-root',
  standalone: true, 
  imports: [AsyncPipe, JsonPipe,CommonModule, CarImageComponent,
     ReactiveFormsModule,RouterOutlet,RouterLink,RouterLinkActive,
    HttpClientModule],
  providers: [CarDataService],
  templateUrl: './app.component.html',
  styleUrls : ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('modelDetail', {static: true}) modelDetail!: CarModelDetailComponent
  @ViewChild('configDetail', {static: true}) configDetail!: CarConfigDetailComponent
  name = 'Angular';
  isLinear = true;
  step2:boolean = true;
  step3:boolean = true;

  constructor(private carDataService: CarDataService) {  }


  ngOnInit() {
      this.carDataService.carModelValidService.subscribe((val) => {
        console.log(val)
        this.step2 = val;
      })
      
      this.carDataService.carConfigValidService.subscribe((val) => {
        console.log(val)
        this.step3 = val;
      })
  }

}
