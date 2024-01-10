import { CurrencyPipe, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedDataService } from '../service/shared-data.service';
import { chooseDropdown, maxSpeed, miles, range, summary, teslaModel, totalCost, towHitchPack, towHitchPackage, yokePackage, yokeWheelPack } from '../shared/constant/common.constant';
import { Color, ModelWithoutColors } from '../shared/model.interface';
import { ConfigDetail } from '../shared/modelConfigData.interface';

@Component({
  selector: 'app-car-summary',
  standalone: true,
  imports: [JsonPipe, HttpClientModule, CurrencyPipe],
  templateUrl: './car-summary.component.html',
  styleUrl: './car-summary.component.scss'
})
export class CarSummaryComponent {
  currentConfigDetail!: ConfigDetail;
  towHitchPackage = towHitchPackage;
  yokeSteeringWheelPackage = yokePackage;
  carModelPrice: number = 0;
  carConfigPrice: number = 0;
  carConfig = [];
  modelDetail!: ModelWithoutColors;
  carModelDetail!: Color;
  chooseDropdown = chooseDropdown; range = range; miles = miles; maxSpeed = maxSpeed;
  totalCost = totalCost; summary = summary; teslaModel = teslaModel; towHitchPack = towHitchPack; yokeWheelPack = yokeWheelPack;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    if (this.sharedDataService.saveCarModel) {
      this.modelDetail = this.sharedDataService.saveCarModel.model;
      this.carModelDetail = this.sharedDataService.saveCarModel.color;
      this.carModelPrice = this.carModelDetail?.price;
    }
    if (this.sharedDataService.savechangeCarConfig) {
      this.currentConfigDetail = this.sharedDataService.savechangeCarConfig;
      this.carConfigPrice = this.currentConfigDetail?.configDetails?.price;
    }
  }
}
