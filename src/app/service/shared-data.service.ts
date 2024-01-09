import { Injectable } from '@angular/core';
import { SelectedConfig, Model } from '../shared/model.interface';
import { ConfigDetail, ModelConfig } from '../shared/modelConfigData.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  saveCarModel!:SelectedConfig;
  saveModelData!:Model[];
  savechangeCarConfig!:ConfigDetail;
  saveSelectedModelConfig!:ModelConfig;
  constructor() { }
}
