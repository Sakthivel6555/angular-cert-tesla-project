import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarImageComponent } from './car-image/car-image.component';
import { CarDataService } from './service/car-data.service';
import { SharedDataService } from './service/shared-data.service';
import { step1, step2, step3 } from './shared/constant/common.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CarImageComponent,ReactiveFormsModule, RouterOutlet,
    RouterLink, RouterLinkActive, HttpClientModule],
  providers: [CarDataService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  step2: boolean = true;
  step3: boolean = true;
  step1Text = step1; step2Text = step2; step3Text = step3;
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private carDataService: CarDataService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.carModelValidService.pipe(takeUntil(this.unSubscribe$)).subscribe((val) => {
      this.step2 = val;
    })

    this.sharedDataService.carConfigValidService.pipe(takeUntil(this.unSubscribe$)).subscribe((val) => {
      this.step3 = val;
    })
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.unsubscribe();
  }

}
