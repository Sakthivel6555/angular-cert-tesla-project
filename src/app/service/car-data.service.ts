import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../shared/model.interface';
import { ModelConfig } from '../shared/modelConfigData.interface';

@Injectable()

export class CarDataService {

  constructor(private httpClient: HttpClient) { }

  public getModelData(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models')
  }

  public getModelConfigData(code: string): Observable<ModelConfig> {
    return this.httpClient.get<ModelConfig>('/options/' + code)
  }

}
