export interface Planet {
  id: string;
  name: string;
  diameter: string;
  gravity: string;
  terrain: string;
  population: string;
}

export interface AllPlanetsData {
  allPlanets: {
    planets: Planet[];
  };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PlanetData {
  planet: {
    id: string;
    name: string;
    diameter: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surfaceWater: string;
    rotationPeriod: string;
    orbitalPeriod: string;
  };
}

export interface Character {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  mass: string;
}

export interface CharacterEdge {
  node: Character;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface AllPeopleData {
  allPeople: {
    edges: CharacterEdge[];
    pageInfo: PageInfo;
  };
}

export interface CharacterProps {
  character: Character;
}
