import { Component } from '@angular/core';
import { SelectedConfig } from '../shared/model.interface';
import { CarDataService } from '../service/car-data.service';

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss'
})
export class CarImageComponent {
  modelCode = '';
  colorCode = '';
  imageUrl = '';
  constructor(private carDataService: CarDataService) { }
  ngOnInit() {
    this.carDataService.carModelService.subscribe((data: SelectedConfig) => {
      console.log(data)
      this.colorCode = data.color.code;
      this.modelCode = data.model.code;
      this.imageUrl = '/assets/images/'+this.modelCode+'/'+this.colorCode+'.jpg'
    })
  }
}
