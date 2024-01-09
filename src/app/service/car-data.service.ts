import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Model, SelectedConfig } from '../shared/model.interface';
import { ModelConfig, ConfigDetail } from '../shared/modelConfigData.interface'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../shared/configDetail.interface';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  
  saveCarModel!:SelectedConfig;
  saveModelData!:Model[];
  savechangeCarConfig!:ConfigDetail;
  saveSelectedModelConfig!:ModelConfig;
  
  private carModel = new Subject<SelectedConfig>();
  carModelService = this.carModel.asObservable();

  private carConfig = new Subject<Config>();
  carConfigService = this.carConfig.asObservable();

  private carModelValid = new BehaviorSubject(true)
  carModelValidService = this.carModelValid.asObservable();

  private carConfigValid = new BehaviorSubject(true)
  carConfigValidService = this.carConfigValid.asObservable();

  constructor(private httpClient: HttpClient ) { }

  public getModelData(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models')
  }

  public getModelConfigData(code:string): Observable<ModelConfig> {
    console.log(code)
    return this.httpClient.get<ModelConfig>('/options/'+code)
  }

  changeCarModel(data:SelectedConfig) {
    this.carModel.next(data)
  }

  // changeCarConfig(config: any) {
  //   this.carConfig.next(config)
  // }

  changeCarModelValid(value: boolean) {
    this.carModelValid.next(value);
  }

  changeCarConfigValid(value: boolean) {
    this.carConfigValid.next(value);
  }
}
