export interface Imagem {
  posters: {
    file_path: string;
  }[];
}

export interface Filmes {
  status: string;
  id: number;
  imdb_id: string;
  backdrop_path: string;
  budget: number;
  title: string;
  genres: {
    id: number;
    name: string;
  }[];
  genre_ids: number;
  homepage: string;
  overview: string;
  image: Imagem;
  original_language: string;
  original_title: string;
  ovierview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    name: string;
  }[];
  release_date: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
