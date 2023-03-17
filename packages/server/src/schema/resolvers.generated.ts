/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { createForm as Mutation_createForm } from './questionnaire/resolvers/Mutation/createForm';
import    { createQuestion as Mutation_createQuestion } from './questionnaire/resolvers/Mutation/createQuestion';
import    { questionnaire as Query_questionnaire } from './questionnaire/resolvers/Query/questionnaire';
import    { Questionnaire } from './questionnaire/resolvers/Questionnaire';
import    { SelectQuestion } from './questionnaire/resolvers/SelectQuestion';
import    { TextQuestion } from './questionnaire/resolvers/TextQuestion';
    export const resolvers: Resolvers = {
      Query: { questionnaire: Query_questionnaire },
      Mutation: { createForm: Mutation_createForm,createQuestion: Mutation_createQuestion },
      
      Questionnaire: Questionnaire,
SelectQuestion: SelectQuestion,
TextQuestion: TextQuestion
    }