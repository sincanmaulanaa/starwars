import { PageInfo } from './pageInfo';

export interface Character {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  mass: string;
  skinColor: string;
  species: {
    name: string;
  };
  homeworld: {
    name: string;
  };
  filmConnection: {
    films: {
      title: string;
    }[];
  };
}

export interface CharacterEdge {
  node: Character;
}

export interface AllPeopleData {
  allPeople: {
    edges: CharacterEdge[];
    pageInfo: PageInfo;
  };
}

export interface CharacterProps {
  person: Character;
}
