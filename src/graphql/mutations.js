/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLeden = /* GraphQL */ `
  mutation CreateLeden(
    $input: CreateLedenInput!
    $condition: ModelLedenConditionInput
  ) {
    createLeden(input: $input, condition: $condition) {
      id
      initials
      last_name
      full_name
      createdAt
      updatedAt
    }
  }
`;
export const updateLeden = /* GraphQL */ `
  mutation UpdateLeden(
    $input: UpdateLedenInput!
    $condition: ModelLedenConditionInput
  ) {
    updateLeden(input: $input, condition: $condition) {
      id
      initials
      last_name
      full_name
      createdAt
      updatedAt
    }
  }
`;
export const deleteLeden = /* GraphQL */ `
  mutation DeleteLeden(
    $input: DeleteLedenInput!
    $condition: ModelLedenConditionInput
  ) {
    deleteLeden(input: $input, condition: $condition) {
      id
      initials
      last_name
      full_name
      createdAt
      updatedAt
    }
  }
`;
export const createVaps = /* GraphQL */ `
  mutation CreateVaps(
    $input: CreateVapsInput!
    $condition: ModelVapsConditionInput
  ) {
    createVaps(input: $input, condition: $condition) {
      id
      num
      location
      date
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateVaps = /* GraphQL */ `
  mutation UpdateVaps(
    $input: UpdateVapsInput!
    $condition: ModelVapsConditionInput
  ) {
    updateVaps(input: $input, condition: $condition) {
      id
      num
      location
      date
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteVaps = /* GraphQL */ `
  mutation DeleteVaps(
    $input: DeleteVapsInput!
    $condition: ModelVapsConditionInput
  ) {
    deleteVaps(input: $input, condition: $condition) {
      id
      num
      location
      date
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createPbs = /* GraphQL */ `
  mutation CreatePbs(
    $input: CreatePbsInput!
    $condition: ModelPbsConditionInput
  ) {
    createPbs(input: $input, condition: $condition) {
      id
      movieurl
      location
      date
      movieyear
      history
      createdAt
      updatedAt
    }
  }
`;
export const updatePbs = /* GraphQL */ `
  mutation UpdatePbs(
    $input: UpdatePbsInput!
    $condition: ModelPbsConditionInput
  ) {
    updatePbs(input: $input, condition: $condition) {
      id
      movieurl
      location
      date
      movieyear
      history
      createdAt
      updatedAt
    }
  }
`;
export const deletePbs = /* GraphQL */ `
  mutation DeletePbs(
    $input: DeletePbsInput!
    $condition: ModelPbsConditionInput
  ) {
    deletePbs(input: $input, condition: $condition) {
      id
      movieurl
      location
      date
      movieyear
      history
      createdAt
      updatedAt
    }
  }
`;
export const createJaren = /* GraphQL */ `
  mutation CreateJaren(
    $input: CreateJarenInput!
    $condition: ModelJarenConditionInput
  ) {
    createJaren(input: $input, condition: $condition) {
      id
      members
      name
      year
      createdAt
      updatedAt
    }
  }
`;
export const updateJaren = /* GraphQL */ `
  mutation UpdateJaren(
    $input: UpdateJarenInput!
    $condition: ModelJarenConditionInput
  ) {
    updateJaren(input: $input, condition: $condition) {
      id
      members
      name
      year
      createdAt
      updatedAt
    }
  }
`;
export const deleteJaren = /* GraphQL */ `
  mutation DeleteJaren(
    $input: DeleteJarenInput!
    $condition: ModelJarenConditionInput
  ) {
    deleteJaren(input: $input, condition: $condition) {
      id
      members
      name
      year
      createdAt
      updatedAt
    }
  }
`;
export const createBesturen = /* GraphQL */ `
  mutation CreateBesturen(
    $input: CreateBesturenInput!
    $condition: ModelBesturenConditionInput
  ) {
    createBesturen(input: $input, condition: $condition) {
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
export const updateBesturen = /* GraphQL */ `
  mutation UpdateBesturen(
    $input: UpdateBesturenInput!
    $condition: ModelBesturenConditionInput
  ) {
    updateBesturen(input: $input, condition: $condition) {
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
export const deleteBesturen = /* GraphQL */ `
  mutation DeleteBesturen(
    $input: DeleteBesturenInput!
    $condition: ModelBesturenConditionInput
  ) {
    deleteBesturen(input: $input, condition: $condition) {
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
export const createPlayback = /* GraphQL */ `
  mutation CreatePlayback(
    $input: CreatePlaybackInput!
    $condition: ModelPlaybackConditionInput
  ) {
    createPlayback(input: $input, condition: $condition) {
      id
      year
      winner
      cancelled
      createdAt
      updatedAt
    }
  }
`;
export const updatePlayback = /* GraphQL */ `
  mutation UpdatePlayback(
    $input: UpdatePlaybackInput!
    $condition: ModelPlaybackConditionInput
  ) {
    updatePlayback(input: $input, condition: $condition) {
      id
      year
      winner
      cancelled
      createdAt
      updatedAt
    }
  }
`;
export const deletePlayback = /* GraphQL */ `
  mutation DeletePlayback(
    $input: DeletePlaybackInput!
    $condition: ModelPlaybackConditionInput
  ) {
    deletePlayback(input: $input, condition: $condition) {
      id
      year
      winner
      cancelled
      createdAt
      updatedAt
    }
  }
`;
export const createGalaAanwezigen = /* GraphQL */ `
  mutation CreateGalaAanwezigen(
    $input: CreateGalaAanwezigenInput!
    $condition: ModelGalaAanwezigenConditionInput
  ) {
    createGalaAanwezigen(input: $input, condition: $condition) {
      id
      year
      names
      createdAt
      updatedAt
    }
  }
`;
export const updateGalaAanwezigen = /* GraphQL */ `
  mutation UpdateGalaAanwezigen(
    $input: UpdateGalaAanwezigenInput!
    $condition: ModelGalaAanwezigenConditionInput
  ) {
    updateGalaAanwezigen(input: $input, condition: $condition) {
      id
      year
      names
      createdAt
      updatedAt
    }
  }
`;
export const deleteGalaAanwezigen = /* GraphQL */ `
  mutation DeleteGalaAanwezigen(
    $input: DeleteGalaAanwezigenInput!
    $condition: ModelGalaAanwezigenConditionInput
  ) {
    deleteGalaAanwezigen(input: $input, condition: $condition) {
      id
      year
      names
      createdAt
      updatedAt
    }
  }
`;
export const createOverig = /* GraphQL */ `
  mutation CreateOverig(
    $input: CreateOverigInput!
    $condition: ModelOverigConditionInput
  ) {
    createOverig(input: $input, condition: $condition) {
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
export const updateOverig = /* GraphQL */ `
  mutation UpdateOverig(
    $input: UpdateOverigInput!
    $condition: ModelOverigConditionInput
  ) {
    updateOverig(input: $input, condition: $condition) {
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
export const deleteOverig = /* GraphQL */ `
  mutation DeleteOverig(
    $input: DeleteOverigInput!
    $condition: ModelOverigConditionInput
  ) {
    deleteOverig(input: $input, condition: $condition) {
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
