import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Filmes } from 'src/app/shared/models/filmes';

@Component({
  selector: 'app-grid-movie',
  templateUrl: './grid-movie.component.html',
  styleUrls: ['./grid-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridMovieComponent implements OnInit {

  @Input() moviesList!: Filmes[];

  public baseUrlImage = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
  public indexHover: number = -1;
  public indexCard: number = -1;

  constructor() {}
  ngOnInit(): void {}

}
