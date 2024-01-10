import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Model, SelectedConfig } from '../shared/model.interface';
import { ConfigDetail, ModelConfig } from '../shared/modelConfigData.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private carModel = new Subject<SelectedConfig>();
  carModelService = this.carModel.asObservable();

  private carModelValid = new BehaviorSubject(true)
  carModelValidService = this.carModelValid.asObservable();

  private carConfigValid = new BehaviorSubject(true)
  carConfigValidService = this.carConfigValid.asObservable();

  saveCarModel!: SelectedConfig;
  saveModelData!: Model[];
  savechangeCarConfig!: ConfigDetail | undefined;
  saveSelectedModelConfig!: ModelConfig;
  isModelChanged = false;

  constructor() { }

  changeCarModel(data: SelectedConfig) {
    this.carModel.next(data)
  }

  changeCarModelValid(value: boolean) {
    this.carModelValid.next(value);
  }

  changeCarConfigValid(value: boolean) {
    this.carConfigValid.next(value);
  }

}
