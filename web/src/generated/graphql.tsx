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

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']>;
  fieldError?: Maybe<FieldError>;
  user?: Maybe<User>;
};

/** field to fetch spends */
export enum By {
  /** fetch by amount */
  Amount = 'AMOUNT',
  /** fetch by date */
  Date = 'DATE'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  spends?: Maybe<Array<Spend>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSpend: Spend;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  register: AuthResponse;
  removeSpend: Scalars['Boolean'];
  updateSpend: Spend;
};


export type MutationCreateSpendArgs = {
  spendInput: SpendInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemoveSpendArgs = {
  spendId: Scalars['Int'];
};


export type MutationUpdateSpendArgs = {
  spendId: Scalars['Int'];
  spendInput: SpendInput;
};

/** order to fetch spends */
export enum Order {
  /** by ascending order */
  Asc = 'ASC',
  /** by descending order */
  Desc = 'DESC'
}

export type OrderByRange = {
  by: By;
  order: Order;
  range: TimeRange;
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getSpendsByRange: Array<Spend>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetSpendsByRangeArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  orderByRange: OrderByRange;
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

export type SpendInput = {
  amount: Scalars['Float'];
  categoryId: Scalars['Int'];
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** time range to fetch spends */
export enum TimeRange {
  /** day interval */
  Day = 'DAY',
  /** month interval */
  Month = 'MONTH',
  /** week interval */
  Week = 'WEEK'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  spends?: Maybe<Array<Spend>>;
  username: Scalars['String'];
};

export type CreateSpendMutationVariables = Exact<{
  spendInput: SpendInput;
}>;


export type CreateSpendMutation = { __typename?: 'Mutation', createSpend: { __typename?: 'Spend', id: number, name: string, description?: string | null | undefined, amount: number, date: string, category: { __typename?: 'Category', id: number, name: string } } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetSpendsByRangeQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  orderByRange: OrderByRange;
}>;


export type GetSpendsByRangeQuery = { __typename?: 'Query', getSpendsByRange: Array<{ __typename?: 'Spend', id: number, name: string, description?: string | null | undefined, amount: number, date: string, category: { __typename?: 'Category', id: number, name: string } }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken?: string | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined, fieldError?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string, username: string } | null | undefined };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', accessToken?: string | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined, fieldError?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };


export const CreateSpendDocument = gql`
    mutation CreateSpend($spendInput: SpendInput!) {
  createSpend(spendInput: $spendInput) {
    id
    name
    description
    amount
    category {
      id
      name
    }
    date
  }
}
    `;

export function useCreateSpendMutation() {
  return Urql.useMutation<CreateSpendMutation, CreateSpendMutationVariables>(CreateSpendDocument);
};
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  getAllCategories {
    id
    name
  }
}
    `;

export function useGetAllCategoriesQuery(options: Omit<Urql.UseQueryArgs<GetAllCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllCategoriesQuery>({ query: GetAllCategoriesDocument, ...options });
};
export const GetSpendsByRangeDocument = gql`
    query GetSpendsByRange($cursor: String, $limit: Int!, $orderByRange: OrderByRange!) {
  getSpendsByRange(cursor: $cursor, limit: $limit, orderByRange: $orderByRange) {
    id
    name
    description
    amount
    date
    category {
      id
      name
    }
  }
}
    `;

export function useGetSpendsByRangeQuery(options: Omit<Urql.UseQueryArgs<GetSpendsByRangeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSpendsByRangeQuery>({ query: GetSpendsByRangeDocument, ...options });
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    user {
      id
      username
      email
    }
    accessToken
    fieldError {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    user {
      id
      username
      email
    }
    fieldError {
      field
      message
    }
    accessToken
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};