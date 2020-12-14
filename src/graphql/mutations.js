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
      quaestor
      abactis
      assessor
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
      quaestor
      abactis
      assessor
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
      quaestor
      abactis
      assessor
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
      link
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
      link
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
      link
      winner
      cancelled
      createdAt
      updatedAt
    }
  }
`;
