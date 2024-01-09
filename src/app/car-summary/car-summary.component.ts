import { Component } from '@angular/core';
import { CarDataService } from '../service/car-data.service';
import { Model, SelectedConfig, ModelWithoutColors, Color } from '../shared/model.interface';
import { Config } from '../shared/configDetail.interface'
import { ModelConfig, ModelConfigData, ConfigDetail } from '../shared/modelConfigData.interface'
import {JsonPipe, CurrencyPipe} from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { towHitchPackage, yokePackage } from '../shared/constant/common.constant';
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-car-summary',
  standalone: true,
  imports: [JsonPipe, HttpClientModule, CurrencyPipe ],
  templateUrl: './car-summary.component.html',
  styleUrl: './car-summary.component.scss'
})
export class CarSummaryComponent {
  currentConfigDetail!:ConfigDetail;
  towHitchPackage = towHitchPackage;
  yokeSteeringWheelPackage = yokePackage;
  carModelPrice: number = 0;
  carConfigPrice: number = 0;
  carConfig = [];
  modelDetail!: ModelWithoutColors;
  carModelDetail!:Color;
  constructor(private carDataService:CarDataService, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    console.log(this.sharedDataService.saveCarModel);
    console.log(this.sharedDataService.savechangeCarConfig);
    if(this.sharedDataService.saveCarModel){
      console.log(this.sharedDataService.saveCarModel)
      this.modelDetail = this.sharedDataService.saveCarModel.model;
      this.carModelDetail = this.sharedDataService.saveCarModel.color;
      this.carModelPrice = this.carModelDetail?.price;
    }
    if(this.sharedDataService.savechangeCarConfig){
      this.currentConfigDetail = this.sharedDataService.savechangeCarConfig;
      console.log(this.currentConfigDetail)
      this.carConfigPrice = this.currentConfigDetail?.configDetails?.price;
    }
    // this.carDataService.carConfigService.subscribe((data: ConfigDetail) => {
    //   this.currentConfigDetail = data;
    //   console.log(this.currentConfigDetail)
    //   this.carConfigPrice = this.currentConfigDetail?.configDetails?.price;
    // })
    // this.carDataService.carModelService.subscribe((data: SelectedConfig) => {
    //   console.log(data)
    //   this.modelDetail = data.model;
    //   this.carModelDetail = data.color;
    //   this.carModelPrice = this.carModelDetail?.price;
    // })
  }
}
