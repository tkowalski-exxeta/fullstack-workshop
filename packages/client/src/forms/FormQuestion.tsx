import { QuestionInput } from "gql/graphql";
import React from "react";
import { EditableText } from "./EditableText";

type QuestionType = "SelectQuestion" | "TextQuestion";

interface FormQuestionProps {
  __typename: QuestionType;
  _id: string;
  text: string;
  options?: string[];
  multiSelect?: boolean;
  updateQuestion: (question: QuestionInput) => void;
  deleteQuestion: () => void;
}

export const FormQuestion: React.FC<FormQuestionProps> = ({
  __typename,
  _id,
  text,
  options,
  multiSelect,
  updateQuestion,
  deleteQuestion,
}) => {
  const createQuestionInput = ({
    text: questionText = text,
    questionType = __typename,
    options: questionOptions = options || [],
    multiSelect: questionMultiSelect = multiSelect || false,
  }: {
    text?: string;
    questionType?: QuestionType;
    options?: string[];
    multiSelect?: boolean;
  }): QuestionInput => {
    switch (questionType) {
      case "SelectQuestion":
        return {
          select: {
            text: questionText,
            options: questionOptions,
            multiSelect: questionMultiSelect,
          },
        };
      case "TextQuestion":
        return {
          text: {
            text: questionText,
          },
        };
    }
  };

  const updateQuestionText = (text: string) => {
    updateQuestion(createQuestionInput({ text }));
  };

  const updateQuestionType = (questionType: QuestionType) => {
    updateQuestion(createQuestionInput({ questionType }));
  };

  const addQuestionOption = () => {
    updateQuestion(
      createQuestionInput({ options: [...(options || []), "Untitled Option"] })
    );
  };

  const updateQuestionOptions = (options: string[]) => {
    updateQuestion(createQuestionInput({ options }));
  };

  const updateMultiSelect = (multiSelect: boolean) => {
    updateQuestion(createQuestionInput({ multiSelect }));
  };

  return (
    <div className="bg-gray-700 w-full p-6 text-lg rounded drop-shadow">
      <FormQuestionHeader
        text={text}
        questionType={__typename}
        onChangeQuestionText={updateQuestionText}
        onChangeQuestionType={updateQuestionType}
        onDeleteQuestion={deleteQuestion}
      />
      <div className="py-4">
        {__typename === "TextQuestion" ? (
          <FormTextQuestionBody />
        ) : (
          <FormSelectQuestionBody
            questionOptions={options || []}
            multiSelect={multiSelect ?? false}
            onChangeQuestionOptions={updateQuestionOptions}
            addQuestionOption={addQuestionOption}
            onChangeMultiSelect={updateMultiSelect}
          />
        )}
      </div>
    </div>
  );
};

export const FormQuestionHeader: React.FC<{
  text: string;
  questionType: QuestionType;
  onChangeQuestionText: (text: string) => void;
  onChangeQuestionType: (questionType: QuestionType) => void;
  onDeleteQuestion: () => void;
}> = ({
  text,
  questionType,
  onChangeQuestionType,
  onChangeQuestionText,
  onDeleteQuestion,
}) => {
  return (
    <div className="flex gap-2 justify-between">
      <div className="w-3/4">
        <EditableText text={text} onChangeText={onChangeQuestionText} />
      </div>
      <img
        onClick={onDeleteQuestion}
        className="m-1 flex-none invert-[0.5] cursor-pointer"
        src="/src/assets/trash.svg"
        title="Delete question"
        height={20}
        width={20}
      />
      <select
        className="p-1 outline-0 rounded"
        name="type"
        id="type"
        value={questionType}
        onChange={(e) => onChangeQuestionType(e.target.value as QuestionType)}
      >
        <option value="SelectQuestion">Select Question</option>
        <option value="TextQuestion">Text Question</option>
      </select>
    </div>
  );
};

export const FormTextQuestionBody: React.FC = () => {
  return (
    <input
      className="w-full bg-inherit backdrop-brightness-90 p-1 rounded outline-0"
      disabled
      placeholder="Text input"
    />
  );
};

export const FormSelectQuestionBody: React.FC<{
  questionOptions: string[];
  multiSelect: boolean;
  addQuestionOption: () => void;
  onChangeQuestionOptions: (options: string[]) => void;
  onChangeMultiSelect: (multiSelect: boolean) => void;
}> = ({
  questionOptions,
  multiSelect,
  addQuestionOption,
  onChangeQuestionOptions,
  onChangeMultiSelect,
}) => {
  const updateQuestionOption = (index: number, text: string) => {
    var options = questionOptions.slice();
    options[index] = text;
    onChangeQuestionOptions(options);
  };

  return (
    <div>
      <div className="float-right mr-1">
        <label>
          <input
            defaultChecked={multiSelect}
            type="checkbox"
            onChange={(e) => onChangeMultiSelect(e.target.checked)}
          />
          <span className="ml-2">Multi-Select</span>
        </label>
      </div>
      <div className="w-3/4">
        {questionOptions.map((questionOption, index) => (
          <div key={index} className="flex gap-2 align-baseline">
            <input type="radio" value={questionOption} disabled />
            <EditableText
              text={questionOption}
              onChangeText={(text: string) => updateQuestionOption(index, text)}
            />
          </div>
        ))}
        <div onClick={addQuestionOption} className="pl-6 pt-2 cursor-pointer">
          <span className="underline">+ Add Option</span>
        </div>
      </div>
    </div>
  );
};
