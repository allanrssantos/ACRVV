import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { AutoUnsubscribe } from '../core/utils/auto-unsubscribe';
import { MovieService } from './../services/movie.service';
import { Filmes } from './../shared/models/filmes';
import { Resposta } from './../shared/models/resposta';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent extends AutoUnsubscribe implements OnInit {
  searchForm!: FormGroup;
  filteredOptions$!: Observable<any>;
  movies: Filmes[] = [];
  isLoading: boolean = false;
  isSeeking: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.movieSearch();
    this.comicList();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  get form() {
    return this.searchForm.controls;
  }

  private movieSearch() {
    this.filteredOptions$ = this.searchForm.get('search')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1500),
      filter((result) => {
        if (result.length === 0) {
          this.onReset();
          return false;
        }
        return result.length > 2;
      }),
      tap(() => (this.isLoading = true)),
      switchMap((value) =>
        this.movieService.search(value.toLowerCase()).pipe(
          finalize(() => {
            this.isLoading = false;
            this.isSeeking = true;
          }),
          this.unsubsribeOnDestroy
        )
      )
    );
  }

  private comicList() {
    this.isLoading = true;

    this.movieService
      .getNowPlaying()
      .pipe(
        switchMap((movies: Resposta) => {
          if (movies.results.length > 0) {
            return this.joinImages(movies);
          }
          return of([]);
        }),
        this.unsubsribeOnDestroy
      )
      .subscribe(
        (response: Filmes[]) => {
          this.movies = response;
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
  }

  private joinImages(movies: Resposta) {
    return forkJoin(
      movies.results.map((movie: Filmes) => {
        return this.movieService.getImagem(movie.id).pipe(
          map((image: any) => {
            movie.image = image;
            return movie;
          })
        );
      })
    );
  }

  private onReset() {
    this.isLoading = false;
    this.isSeeking = false;
  }

}
