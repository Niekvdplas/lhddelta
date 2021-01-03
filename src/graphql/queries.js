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
      seq_num
      name
      praeses
      pfoto
      qfoto
      abfoto
      assfoto
      quaestor
      abactis
      assessor
      abmail
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
        seq_num
        name
        praeses
        pfoto
        qfoto
        abfoto
        assfoto
        quaestor
        abactis
        assessor
        abmail
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayback = /* GraphQL */ `
  query GetPlayback($id: ID!) {
    getPlayback(id: $id) {
      id
      year
      link
      winner
      cancelled
      createdAt
      updatedAt
    }
  }
`;
export const listPlaybacks = /* GraphQL */ `
  query ListPlaybacks(
    $filter: ModelPlaybackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaybacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
        link
        winner
        cancelled
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGalaAanwezigen = /* GraphQL */ `
  query GetGalaAanwezigen($id: ID!) {
    getGalaAanwezigen(id: $id) {
      id
      year
      names
      createdAt
      updatedAt
    }
  }
`;
export const listGalaAanwezigens = /* GraphQL */ `
  query ListGalaAanwezigens(
    $filter: ModelGalaAanwezigenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGalaAanwezigens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
        names
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOverig = /* GraphQL */ `
  query GetOverig($id: ID!) {
    getOverig(id: $id) {
      id
      dkcpraeses
      dkcpraesesemail
      dkcpraesesnummer
      dkcpraesesfoto
      dkcquaestor
      dkcquaestoremail
      dkcquaestornummer
      dkcquaestorfoto
      createdAt
      updatedAt
    }
  }
`;
export const listOverigs = /* GraphQL */ `
  query ListOverigs(
    $filter: ModelOverigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOverigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dkcpraeses
        dkcpraesesemail
        dkcpraesesnummer
        dkcpraesesfoto
        dkcquaestor
        dkcquaestoremail
        dkcquaestornummer
        dkcquaestorfoto
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
