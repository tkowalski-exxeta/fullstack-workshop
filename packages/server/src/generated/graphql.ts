import { GraphQLResolveInfo } from "graphql"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: "Mutation"
  createForm?: Maybe<Questionnaire>
  createQuestion?: Maybe<Question>
}

export type MutationCreateFormArgs = {
  form: QuestionnaireInput
}

export type MutationCreateQuestionArgs = {
  formId: Scalars["ID"]
  question: QuestionInput
}

export type Query = {
  __typename?: "Query"
  questionnaire?: Maybe<Questionnaire>
}

export type QueryQuestionnaireArgs = {
  id: Scalars["ID"]
}

export type Question = {
  _id: Scalars["ID"]
  question: Scalars["String"]
}

export type QuestionInput = {
  select?: InputMaybe<SelectQuestionInput>
  text?: InputMaybe<TextQuestionInput>
}

export type Questionnaire = {
  __typename?: "Questionnaire"
  _id: Scalars["ID"]
  questions: Array<Question>
  title: Scalars["String"]
}

export type QuestionnaireInput = {
  title: Scalars["String"]
}

export type SelectQuestion = Question & {
  __typename?: "SelectQuestion"
  _id: Scalars["ID"]
  multiSelect: Scalars["Boolean"]
  options: Array<Scalars["String"]>
  question: Scalars["String"]
}

export type SelectQuestionInput = {
  multiSelect: Scalars["Boolean"]
  options: Array<Scalars["String"]>
  question: Scalars["String"]
}

export type TextQuestion = Question & {
  __typename?: "TextQuestion"
  _id: Scalars["ID"]
  question: Scalars["String"]
}

export type TextQuestionInput = {
  question: Scalars["String"]
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Question: ResolversTypes["SelectQuestion"] | ResolversTypes["TextQuestion"]
  QuestionInput: QuestionInput
  Questionnaire: ResolverTypeWrapper<Questionnaire>
  QuestionnaireInput: QuestionnaireInput
  SelectQuestion: ResolverTypeWrapper<SelectQuestion>
  SelectQuestionInput: SelectQuestionInput
  String: ResolverTypeWrapper<Scalars["String"]>
  TextQuestion: ResolverTypeWrapper<TextQuestion>
  TextQuestionInput: TextQuestionInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]
  ID: Scalars["ID"]
  Mutation: {}
  Query: {}
  Question:
    | ResolversParentTypes["SelectQuestion"]
    | ResolversParentTypes["TextQuestion"]
  QuestionInput: QuestionInput
  Questionnaire: Questionnaire
  QuestionnaireInput: QuestionnaireInput
  SelectQuestion: SelectQuestion
  SelectQuestionInput: SelectQuestionInput
  String: Scalars["String"]
  TextQuestion: TextQuestion
  TextQuestionInput: TextQuestionInput
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createForm?: Resolver<
    Maybe<ResolversTypes["Questionnaire"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateFormArgs, "form">
  >
  createQuestion?: Resolver<
    Maybe<ResolversTypes["Question"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateQuestionArgs, "formId" | "question">
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  questionnaire?: Resolver<
    Maybe<ResolversTypes["Questionnaire"]>,
    ParentType,
    ContextType,
    RequireFields<QueryQuestionnaireArgs, "id">
  >
}

export type QuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Question"] = ResolversParentTypes["Question"]
> = {
  __resolveType: TypeResolveFn<
    "SelectQuestion" | "TextQuestion",
    ParentType,
    ContextType
  >
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  question?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}

export type QuestionnaireResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Questionnaire"] = ResolversParentTypes["Questionnaire"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  questions?: Resolver<
    Array<ResolversTypes["Question"]>,
    ParentType,
    ContextType
  >
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SelectQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SelectQuestion"] = ResolversParentTypes["SelectQuestion"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  multiSelect?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  options?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  question?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TextQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TextQuestion"] = ResolversParentTypes["TextQuestion"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  question?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Question?: QuestionResolvers<ContextType>
  Questionnaire?: QuestionnaireResolvers<ContextType>
  SelectQuestion?: SelectQuestionResolvers<ContextType>
  TextQuestion?: TextQuestionResolvers<ContextType>
}
