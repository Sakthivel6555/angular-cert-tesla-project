import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarDataService } from '../service/car-data.service';
import { Color, Model, ModelWithoutColors } from '../shared/model.interface';
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-car-model-detail',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './car-model-detail.component.html',
  styleUrl: './car-model-detail.component.scss'
})
export class CarModelDetailComponent {
  models: Model[] = [];
  colors: Color[] = [];
  asynModel$: Model[] = []
  selectedModel!: ModelWithoutColors;
  selectedColor!: Color;

  modelForm = new FormGroup({
    carModel: new FormControl('', [Validators.required]),
    modelColor: new FormControl('', [Validators.required]),
  })

  constructor(private carDataService: CarDataService, private sharedDataService: SharedDataService) { }


  ngOnInit() {
    this.modelForm.controls['carModel'].valueChanges.subscribe((data) => {
      console.log(data)
      this.models.forEach((model) => {
        if (model.code === data) {
          this.selectedModel = {
            code: model.code,
            description: model.description
          };
          this.colors = model.colors;
          this.modelForm.controls['modelColor'].setValue(this.colors[0].code)
        }
      })
    })

    this.modelForm.controls['modelColor'].valueChanges.subscribe((code) => {
      console.log(this.models);
      console.log(code)
      const color = this.models.filter((model) => model.code === this.selectedModel.code)[0].colors
        .filter((color) =>
          color.code === code
        )[0]
      console.log(color)
      this.selectedModelDatail(this.selectedModel, color);
    })

    this.modelForm.valueChanges.subscribe((data) => {
      if(this.modelForm?.valid){
        this.carDataService.changeCarModelValid(false)
      } else {
        this.carDataService.changeCarModelValid(true)
      }
    })

    if(!this.sharedDataService.saveModelData){
    // this.asynModel$ = this.carDataService.getModelDataAsync();

    this.carDataService.getModelData().subscribe((data) => {
      console.log(data);
      this.models = data;
      this.sharedDataService.saveModelData = data;
    })
  } else {
    // to retain data between routes
    this.models = this.sharedDataService.saveModelData;
    this.modelForm.setValue({
      carModel : this.sharedDataService.saveCarModel.model.code,
      modelColor : this.sharedDataService.saveCarModel.color.code,
    })
  }
  }

  selectedModelDatail(model: ModelWithoutColors, color: Color) {
    if (color) {
      console.log(model);
      console.log(color)

      this.carDataService.changeCarModel({ model, color })
      this.sharedDataService.saveCarModel = { model, color };
    }
  }

  modelChange() {
    this.carDataService.changeCarConfigValid(true)
    this.sharedDataService.savechangeCarConfig = {
      configDetails : {
        id: 0,
        description: '',
        range: 0,
        speed: 0,
        price: 0
      },
      towHitch: false,
      steeringWheel: false
    }
  }


}
