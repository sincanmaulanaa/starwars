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
