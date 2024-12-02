import { gql } from '@apollo/client';

export const ALL_PLANETS = gql`
  query AllPlanets {
    allPlanets {
      planets {
        id
        name
        diameter
        gravity
      }
    }
  }
`;

export const GET_PLANET = gql`
  query GetPlanet($id: ID!) {
    planet(id: $id) {
      id
      name
      diameter
      gravity
      population
      climates
      terrains
      surfaceWater
      rotationPeriod
      orbitalPeriod
    }
  }
`;

export const ALL_CHARACTERS = gql`
  query AllCharacters($first: Int, $after: String) {
    allPeople(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          birthYear
          eyeColor
          gender
          hairColor
          height
          mass
        }
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    person(id: $id) {
      id
      name
      birthYear
      gender
      height
      mass
      skinColor
      eyeColor
      hairColor
      species {
        name
      }
      homeworld {
        name
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;

export const ALL_MOVIES = gql`
  query AllMovies($first: Int, $after: String) {
    allFilms(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          episodeID
          releaseDate
          director
          producers
        }
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    film(id: $id) {
      id
      title
      episodeID
      openingCrawl
      director
      producers
      releaseDate
      characterConnection {
        characters {
          id
          name
        }
      }
      planetConnection {
        planets {
          id
          name
        }
      }
    }
  }
`;
