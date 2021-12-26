import { buildSchema } from 'graphql';

export default buildSchema(`
  type Offer {
    _id: ID!,
    make: Make!,
    model: Model!,
    generation: String,
    fuel: Fuel,
    year: Int!,
    kms: Int!,
    volume: Int!,
    power: Int!
    price: Int!,
    shortDescription: String!,
    longDescription: String!,
    photos: [String!]!,
    date: String!,
    creator: User,
    isDeleted: Boolean,
  }
  input OfferInput {
    make: String!,
    model: String!,
    generation: String,
    fuel: String,
    year: Int!,
    kms: Int!,
    volume: Int!,
    power: Int!
    price: Int!,
    shortDescription: String!,
    longDescription: String!,
    photos: [String!]!,
    date: String!,
    creator: String,
  }

  type User {
    _id: ID!,
    email: String!,
    password: String!,
    createdOffers: [Offer!],
    observedOffers: [Offer!],
    isDeleted: Boolean,
    isAdmin: Boolean,
  } 
  input UserInput {
    email: String!,
    password: String!,
  }
  input UserEditInput {
    email: String,
    password: String,
    userId: ID!,
    isAdmin: Boolean,
  }
  input FavoritesInput {
    userId: ID!,
    offerId: ID!,
  }

  type Origin {
    _id: ID!,
    origin: String!,
    isDeleted: Boolean
  }
  input OriginInput {
    origin: String!,
  }
  input OriginEditInput {
    origin: String!,
    id: ID!,
  }

  type Make {
    _id: ID!,
    make: String!,
    origin: Origin!,
    isDeleted: Boolean
  }
  input MakeInput {
    make: String!,
    originId: ID!,
  }
  input MakeEditInput {
    make: String,
    originId: ID,
    makeId: ID!,
  }

  type Model {
    _id: ID!,
    model: String!,
    make: Make!,
    isDeleted: Boolean
  }
  input ModelInput {
    model: String!,
    makeId: ID!,
  }
  input ModelEditInput {
    model: String,
    makeId: ID,
    modelId: ID!,
  }

  type Fuel {
    _id: ID!,
    fuel: String!,
    isDeleted: Boolean
  }
  input FuelInput {
    fuel: String!,
  }
  input FuelEditInput {
    fuel: String!,
    id: ID!,
  }

  type AuthData {
    user: User!,
    token: String!,
    tokenExpiration: Int!,
  }

  type RootQuery {
    offers: [Offer!]!
    offerDetails(offerId: ID!): Offer!
    offersOfId(offersIds: [ID!]!): [Offer!]!
    makes: [Make!]!
    models(makeId: ID!): [Model!]!
    fuels: [Fuel!]!
    origins: [Origin!]!
    login(email: String!, password: String!): AuthData
    users: [User]!
  }
  type RootMutation {
    createOffer(offerInput: OfferInput): Offer
    deleteOffer(offerId: ID!): Offer

    createUser(userInput: UserInput): User
    editUser(userEditInput: UserEditInput): User
    changeRole(userEditInput: UserEditInput): User
    toggleFavoriteOffer(favoritesInput: FavoritesInput): User

    createOrigin(originInput: OriginInput): Origin
    editOrigin(originEditInput: OriginEditInput): Origin
    deleteOrigin(originId: ID!): Origin

    createFuel(fuelInput: FuelInput): Fuel
    editFuel(fuelEditInput: FuelEditInput): Fuel
    deleteFuel(fuelId: ID!): Fuel

    createMake(makeInput: MakeInput): Make
    editMake(makeEditInput: MakeEditInput): Make
    deleteMake(makeId: ID!): Make

    createModel(modelInput: ModelInput): Model
    editModel(modelEditInput: ModelEditInput): Model
    deleteModel(modelId: ID!): Model
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
