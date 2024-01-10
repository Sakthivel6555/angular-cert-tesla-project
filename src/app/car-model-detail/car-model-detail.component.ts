import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarDataService } from '../service/car-data.service';
import { SharedDataService } from '../service/shared-data.service';
import { chooseDropdown, chooseModel, colorlDropdown, modelDropdown, step1 } from '../shared/constant/common.constant';
import { Color, Model, ModelWithoutColors } from '../shared/model.interface';

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
  selectedModel!: ModelWithoutColors;
  modelDropdown = modelDropdown; colorlDropdown = colorlDropdown; chooseDropdown = chooseDropdown;
  chooseModel = chooseModel; step1 = step1;
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  modelForm = new FormGroup({
    carModel: new FormControl('', [Validators.required]),
    modelColor: new FormControl('', [Validators.required]),
  })

  constructor(private carDataService: CarDataService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.modelForm.controls['carModel'].valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
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

    this.modelForm.controls['modelColor'].valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((code) => {
      const color = this.models.filter((model) => model.code === this.selectedModel.code)[0].colors
        .filter((color) =>
          color.code === code
        )[0]
      this.selectedModelDatail(this.selectedModel, color);
    })

    this.modelForm.valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
      if (this.modelForm?.valid) {
        this.sharedDataService.changeCarModelValid(false)
      } else {
        this.sharedDataService.changeCarModelValid(true)
      }
    })

    if (!this.sharedDataService.saveModelData) {
      this.carDataService.getModelData().pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
        this.models = data;
        this.sharedDataService.saveModelData = data;
      })

    } else {
      // to retain data between routes
      this.models = this.sharedDataService.saveModelData;
      this.modelForm.setValue({
        carModel: this.sharedDataService.saveCarModel.model.code,
        modelColor: this.sharedDataService.saveCarModel.color.code,
      })
    }
  }

  selectedModelDatail(model: ModelWithoutColors, color: Color) {
    if (color) {
      this.sharedDataService.changeCarModel({ model, color })
      this.sharedDataService.saveCarModel = { model, color };
    }
  }

  modelChange() {
    this.sharedDataService.changeCarConfigValid(true)
    this.sharedDataService.isModelChanged = true;
    this.sharedDataService.savechangeCarConfig = undefined;
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.unsubscribe();
  }

}
