import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Resposta } from '../shared/models/resposta';
import { Filmes } from '../shared/models/filmes';
import { HandleObservableService } from '../core/utils/handle-observable-service';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HandleObservableService {

  private readonly API: string = 'https://api.themoviedb.org/3';
  private readonly  api_key: string = '32b2538fae9d6a2e14d1539dde85893f';
  private readonly language: string = 'pt-BR';

constructor(private httpClient: HttpClient) {
  super();
}

public getNowPlaying(page: number = 1) {
  const URL = `${this.API}/movie/now_playing?api_key=${this.api_key}&language=${this.language}&page=${page}`;
  return this.httpClient.get<Resposta>(URL)
  .pipe(
    retry(2),
    map((movie) => { return movie}),
    catchError(this.error)
  );
}

public getImagem(movie_id: number): Observable<Resposta>{
  const URL = `${this.API}/movie/${movie_id}/images?api_key=${this.api_key}`;
  return this.httpClient.get<Resposta>(URL)
  .pipe(
    retry(2),
    map((data) => data),
    catchError(this.error)
  );
}

public search(
  search: string = 'marvel',
  page: number = 1
): Observable<Filmes[]> {
  const URL = `${this.API}/search/movie?api_key=${this.api_key}&language=${this.language}&query=${search}&page=${page}`;
  return this.httpClient.get<Resposta>(URL).pipe(
    retry(2),
    map((response: Resposta) => {
      return response.results.filter((item) => item.poster_path !== null);
    }),
    catchError(this.error)
  );
}

error(error: Resposta | any) {
  let errorMessage = '';
  if (error.status_code instanceof ErrorEvent) {
    errorMessage = `Erro: ${error.status_message}`;
  } else {
    errorMessage = `Código do erro: ${error.status_code}\nMensagem: ${error.status_code}`;
  }
  return throwError(errorMessage);
}

}
