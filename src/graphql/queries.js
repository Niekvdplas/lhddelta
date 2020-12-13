/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLeden = /* GraphQL */ `
  query GetLeden($id: ID!) {
    getLeden(id: $id) {
      id
      initials
      last_name
      full_name
      createdAt
      updatedAt
    }
  }
`;
export const listLedens = /* GraphQL */ `
  query ListLedens(
    $filter: ModelLedenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLedens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        initials
        last_name
        full_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJaren = /* GraphQL */ `
  query GetJaren($id: ID!) {
    getJaren(id: $id) {
      id
      members
      name
      year
      createdAt
      updatedAt
    }
  }
`;
export const listJarens = /* GraphQL */ `
  query ListJarens(
    $filter: ModelJarenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJarens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        members
        name
        year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBesturen = /* GraphQL */ `
  query GetBesturen($id: ID!) {
    getBesturen(id: $id) {
      id
      name
      praeses
      quaestor
      abactis
      assessor
      createdAt
      updatedAt
    }
  }
`;
export const listBesturens = /* GraphQL */ `
  query ListBesturens(
    $filter: ModelBesturenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBesturens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        praeses
        quaestor
        abactis
        assessor
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
