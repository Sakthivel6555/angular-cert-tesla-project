import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from '../service/shared-data.service';
import { SelectedConfig } from '../shared/model.interface';

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss'
})
export class CarImageComponent {
  imageUrl = '';
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.carModelService.pipe(takeUntil(this.unSubscribe$)).subscribe((data: SelectedConfig) => {
      this.imageUrl = '/assets/images/' + data.model.code + '/' + data.color.code + '.jpg'
    })
  }
}
