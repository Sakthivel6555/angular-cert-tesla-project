import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CarDataService } from '../service/car-data.service';
import { SharedDataService } from '../service/shared-data.service';
import { chooseDropdown, configText, cost, maxSpeed, miles, range, selectConfigText, step2, towHitch, yokeWheel } from '../shared/constant/common.constant';
import { Config, ModelConfig } from '../shared/modelConfigData.interface';

@Component({
  selector: 'app-car-config-detail',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, JsonPipe, AsyncPipe, CurrencyPipe],
  templateUrl: './car-config-detail.component.html',
  styleUrl: './car-config-detail.component.scss'
})
export class CarConfigDetailComponent {
  selectedModelConfig!: ModelConfig;
  isComponentedDetroyed: boolean = false;
  selectedDetails!: Config;
  initialValues: {} = {};
  chooseDropdown = chooseDropdown; range = range; miles = miles; maxSpeed = maxSpeed; selectConfigText = selectConfigText;
  cost = cost; towHitch = towHitch; yokeWheel = yokeWheel; configText = configText; step2 = step2;
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  configForm = new FormGroup({
    configSelected: new FormControl('', [Validators.required]),
    towHitch: new FormControl(false, []),
    steeringWheel: new FormControl(false, []),
  })

  constructor(private carDataService: CarDataService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.initialValues = this.configForm.value;
    if (this.sharedDataService.savechangeCarConfig && !this.sharedDataService.isModelChanged) {
      if (this.sharedDataService?.savechangeCarConfig?.configDetails?.id != 0) {
        this.selectedDetails = this.sharedDataService?.savechangeCarConfig?.configDetails;
      }
      this.configForm.setValue({
        configSelected: this.sharedDataService?.savechangeCarConfig?.configDetails?.id.toString() ?? '',
        towHitch: this.sharedDataService.savechangeCarConfig.towHitch ?? false,
        steeringWheel: this.sharedDataService.savechangeCarConfig.steeringWheel ?? false
      })
    }

    let saveCarModel = this.sharedDataService.saveCarModel;
    if (this.sharedDataService.isModelChanged) {
      this.sharedDataService.isModelChanged = false;
      this.configForm.reset(this.initialValues);
      this.getModelConfigDetails(saveCarModel.model.code)
    } else {
      this.selectedModelConfig = this.sharedDataService.saveSelectedModelConfig;
    }

    this.configForm.valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
      if (this.configForm.valid) {
        this.sharedDataService.changeCarConfigValid(false)
      } else {
        this.sharedDataService.changeCarConfigValid(true)
      }
      if (!this.isComponentedDetroyed && data?.configSelected) {
        this.selectedDetails = this.getConfigDetails(data?.configSelected);
        let selectedConfigDetails = {
          configDetails: this.getConfigDetails(data?.configSelected) ?? '',
          towHitch: data?.towHitch ?? false,
          steeringWheel: data?.steeringWheel ?? false
        }
        this.sharedDataService.savechangeCarConfig = selectedConfigDetails;
      }
    })
  }

  getConfigDetails(id: string) {
    let configDetailIndividual = this.selectedModelConfig.configs.filter((val) => {
      return val.id == +id
    })
    return configDetailIndividual[0]
  }

  getModelConfigDetails(selectedModelCode: string) {
    this.carDataService.getModelConfigData(selectedModelCode).pipe(takeUntil(this.unSubscribe$)).subscribe((data: ModelConfig) => {
      this.selectedModelConfig = data;
      this.sharedDataService.saveSelectedModelConfig = data;
    })
  }

  ngOnDestroy() {
    this.isComponentedDetroyed = true;
    this.unSubscribe$.next(true);
    this.unSubscribe$.unsubscribe();
  }

}
