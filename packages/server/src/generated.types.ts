import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Form = {
  __typename?: "Form";
  _id: Scalars["ID"];
  questions: Array<Question>;
  title: Scalars["String"];
};

export type FormInput = {
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createForm?: Maybe<Form>;
  createQuestion?: Maybe<Question>;
  deleteForm?: Maybe<Scalars["Boolean"]>;
  deleteQuestion?: Maybe<Scalars["Boolean"]>;
  updateForm?: Maybe<Form>;
  updateQuestion?: Maybe<Question>;
};

export type MutationCreateFormArgs = {
  form: FormInput;
};

export type MutationCreateQuestionArgs = {
  formId: Scalars["ID"];
  question: QuestionInput;
};

export type MutationDeleteFormArgs = {
  formId: Scalars["ID"];
};

export type MutationDeleteQuestionArgs = {
  formId: Scalars["ID"];
  questionId: Scalars["ID"];
};

export type MutationUpdateFormArgs = {
  form: FormInput;
  formId: Scalars["ID"];
};

export type MutationUpdateQuestionArgs = {
  formId: Scalars["ID"];
  question: QuestionInput;
  questionId: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  form?: Maybe<Form>;
  forms: Array<Form>;
};

export type QueryFormArgs = {
  id: Scalars["ID"];
};

export type Question = {
  _id: Scalars["ID"];
  text: Scalars["String"];
};

export type QuestionInput = {
  select?: InputMaybe<SelectQuestionInput>;
  text?: InputMaybe<TextQuestionInput>;
};

export type SelectQuestion = Question & {
  __typename?: "SelectQuestion";
  _id: Scalars["ID"];
  multiSelect: Scalars["Boolean"];
  options: Array<Scalars["String"]>;
  text: Scalars["String"];
};

export type SelectQuestionInput = {
  multiSelect: Scalars["Boolean"];
  options: Array<Scalars["String"]>;
  text: Scalars["String"];
};

export type TextQuestion = Question & {
  __typename?: "TextQuestion";
  _id: Scalars["ID"];
  text: Scalars["String"];
};

export type TextQuestionInput = {
  text: Scalars["String"];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

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
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

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
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

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
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Form: ResolverTypeWrapper<FormDbObject>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  FormInput: FormInput;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<QuestionDbInterface>;
  QuestionInput: QuestionInput;
  SelectQuestion: ResolverTypeWrapper<SelectQuestion>;
  SelectQuestionInput: SelectQuestionInput;
  TextQuestion: ResolverTypeWrapper<TextQuestion>;
  TextQuestionInput: TextQuestionInput;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Form: FormDbObject;
  ID: Scalars["ID"];
  String: Scalars["String"];
  FormInput: FormInput;
  Mutation: {};
  Boolean: Scalars["Boolean"];
  Query: {};
  Question: QuestionDbInterface;
  QuestionInput: QuestionInput;
  SelectQuestion: SelectQuestion;
  SelectQuestionInput: SelectQuestionInput;
  TextQuestion: TextQuestion;
  TextQuestionInput: TextQuestionInput;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars["String"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars["String"];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars["Boolean"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars["String"]>;
};

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = IdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars["String"]>;
};

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars["String"];
};

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = MapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type FormResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Form"] = ResolversParentTypes["Form"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes["Question"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createForm?: Resolver<
    Maybe<ResolversTypes["Form"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateFormArgs, "form">
  >;
  createQuestion?: Resolver<
    Maybe<ResolversTypes["Question"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateQuestionArgs, "formId" | "question">
  >;
  deleteForm?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFormArgs, "formId">
  >;
  deleteQuestion?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteQuestionArgs, "formId" | "questionId">
  >;
  updateForm?: Resolver<
    Maybe<ResolversTypes["Form"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFormArgs, "form" | "formId">
  >;
  updateQuestion?: Resolver<
    Maybe<ResolversTypes["Question"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateQuestionArgs,
      "formId" | "question" | "questionId"
    >
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  form?: Resolver<
    Maybe<ResolversTypes["Form"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFormArgs, "id">
  >;
  forms?: Resolver<Array<ResolversTypes["Form"]>, ParentType, ContextType>;
};

export type QuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Question"] = ResolversParentTypes["Question"]
> = {
  __resolveType: TypeResolveFn<
    "SelectQuestion" | "TextQuestion",
    ParentType,
    ContextType
  >;
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type SelectQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SelectQuestion"] = ResolversParentTypes["SelectQuestion"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  multiSelect?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TextQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TextQuestion"] = ResolversParentTypes["TextQuestion"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Form?: FormResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  SelectQuestion?: SelectQuestionResolvers<ContextType>;
  TextQuestion?: TextQuestionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from "mongodb";
export type FormDbObject = {
  _id: ObjectId;
  questions: QuestionDbInterface;
  title: string;
};

export type QuestionDbInterface = {
  questionType: string;
};

export type SelectQuestionDbObject = QuestionDbInterface & {
  _id: ObjectId;
  multiSelect: boolean;
  options: Array<string>;
  text: string;
};

export type TextQuestionDbObject = QuestionDbInterface & {
  _id: ObjectId;
  text: string;
};
