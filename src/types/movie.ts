import { Character } from './character';
import { PageInfo } from './pageInfo';
import { Planet } from './planet';

export interface Movie {
  id: string;
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
  characterConnection: {
    characters: Character[];
  };
  planetConnection: {
    planets: Planet[];
  };
}

export interface MovieEdge {
  node: Movie;
}

export interface AllMoviesData {
  allFilms: {
    edges: MovieEdge[];
    pageInfo: PageInfo;
  };
}

export interface MovieProps {
  movie: Movie;
}
