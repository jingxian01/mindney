import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  spends?: Maybe<Array<Spend>>;
};

export type CreateSpendInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSpend: Spend;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: User;
  removeSpend: Spend;
  updateSpend: Spend;
};


export type MutationCreateSpendArgs = {
  createSpendInput: CreateSpendInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemoveSpendArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateSpendArgs = {
  updateSpendInput: UpdateSpendInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  spend: Spend;
  spends: Array<Spend>;
  testQuery: Scalars['String'];
};


export type QuerySpendArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Spend = {
  __typename?: 'Spend';
  amount: Scalars['Float'];
  category: Category;
  date: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  user: User;
};

export type UpdateSpendInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  spends?: Maybe<Array<Spend>>;
  username: Scalars['String'];
};

export type TestQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', testQuery: string };


export const TestQueryDocument = gql`
    query TestQuery {
  testQuery
}
    `;

export function useTestQueryQuery(options: Omit<Urql.UseQueryArgs<TestQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TestQueryQuery>({ query: TestQueryDocument, ...options });
};