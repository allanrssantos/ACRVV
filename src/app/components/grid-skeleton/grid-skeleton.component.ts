import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-skeleton',
  templateUrl: './grid-skeleton.component.html',
  styleUrls: ['./grid-skeleton.component.scss'],
})
export class GridSkeletonComponent implements OnInit {
  items = [1];
  constructor() {
    this.items = Array(10).fill(this.items);
  }
  ngOnInit(): void {}
}
