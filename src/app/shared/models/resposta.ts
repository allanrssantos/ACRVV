import { Filmes } from "./filmes";

export class Resposta {
  results!: Filmes[];
  page?: number;
  total_results?: number;
  total_pages?: number;
  movie_id?: number;
  status_message?: string;
  status_code!: number;
}
