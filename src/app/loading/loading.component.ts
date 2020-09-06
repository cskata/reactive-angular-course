import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  // public kell legyen a loadingService, különben nem éri el a html
  constructor(public loadingService: LoadingService) {
  }

  ngOnInit() {
  }
}
