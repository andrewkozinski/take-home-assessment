export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: {
    name: string;
    id: number;
  }[];
  production_companies: {
    name: string;
    id: number;
    logo_path: string;
  };
  runtime: number;
  popularity: number;
}