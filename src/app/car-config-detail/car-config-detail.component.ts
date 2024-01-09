import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarDataService } from '../service/car-data.service';
import { SharedDataService } from '../service/shared-data.service';
import { SelectedConfig } from '../shared/model.interface';
import { ModelConfig, ConfigDetail, Config } from '../shared/modelConfigData.interface';

@Component({
  selector: 'app-car-config-detail',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, JsonPipe, AsyncPipe],
  templateUrl: './car-config-detail.component.html',
  styleUrl: './car-config-detail.component.scss'
})
export class CarConfigDetailComponent {
  selectedModelConfig!: ModelConfig;
  isComponentedDetroyed = false;
  selectedDetails!:Config;
  // configDetail = [];
  // configDetail!:ModelConfigData = {};

  configForm = new FormGroup({
    configSelected: new FormControl({}, [Validators.required]),
    towHitch: new FormControl(false, []),
    steeringWheel: new FormControl(false, []),
  })

  constructor(private carDataService: CarDataService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    console.log(this.sharedDataService.saveCarModel)
    if(this.sharedDataService.saveCarModel) {
      var saveCarModel = this.sharedDataService.saveCarModel;
      if(!this.sharedDataService.saveSelectedModelConfig){
        this.getModelConfigDetails(saveCarModel.model.code)
      } else {
        this.selectedModelConfig = this.sharedDataService.saveSelectedModelConfig;
      }
    }

    if(this.sharedDataService.savechangeCarConfig) {
      console.log(this.sharedDataService.savechangeCarConfig)
      if(this.sharedDataService?.savechangeCarConfig?.configDetails?.id != 0) {
        this.selectedDetails = this.sharedDataService?.savechangeCarConfig?.configDetails;
      }
      this.configForm.setValue({
        configSelected : this.sharedDataService?.savechangeCarConfig?.configDetails?.id?? null,
        towHitch : this.sharedDataService.savechangeCarConfig.towHitch?? false,
        steeringWheel : this.sharedDataService.savechangeCarConfig.steeringWheel?? false
      })
    }
    // this.carDataService.carModelService.subscribe((data: SelectedConfig) => {
    //   console.log(data)
    //   // if (data?.model?.code) {
    //   //   this.getModelConfigDetails(data.model.code)
    //   // }
    //   // this.configForm.reset();
    // })

    this.configForm.valueChanges.subscribe((data) => {
        // if(!data.configSelected)
        if(!this.isComponentedDetroyed) {
        console.log(this.getConfigDetails(data?.configSelected))
        this.selectedDetails = this.getConfigDetails(data?.configSelected);
          if (this.configForm.valid ) { 
            this.carDataService.changeCarConfigValid(false)
          } else {
            this.carDataService.changeCarConfigValid(true)
          }
          var selectedConfigDetails:ConfigDetail = {
            configDetails : this.getConfigDetails(data?.configSelected),
            towHitch : data?.towHitch,
            steeringWheel : data?.steeringWheel
          }
          // this.carDataService.changeCarConfig(selectedConfigDetails)
        // }
          this.sharedDataService.savechangeCarConfig = selectedConfigDetails;
      }
    })
  }

  getConfigDetails(id: any) {
    let configDetailIndividual = this.selectedModelConfig.configs.filter((val) => {
      return val.id == id
    })
    return configDetailIndividual[0]
  }

  getModelConfigDetails(selectedModelCode: string) {
    this.carDataService.getModelConfigData(selectedModelCode).subscribe((data:ModelConfig) => {
      console.log(data);
      this.selectedModelConfig = data;
      this.sharedDataService.saveSelectedModelConfig = data;
    })
  }

  ngOnDestroy() {
    this.isComponentedDetroyed = true;
  }

}
