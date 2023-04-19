import React from "react";
import { EditableText } from "./EditableText";
import { QuestionInput } from "gql/graphql";

interface FormQuestionProps {
    __typename: "SelectQuestion" | "TextQuestion";
    _id: string;
    text: string;
    options?: string[];
    multiSelect?: boolean;
    updateQuestion: (question: QuestionInput) => void;
}

export const FormQuestion: React.FC<FormQuestionProps> = ({
    __typename,
    _id,
    text,
    options,
    multiSelect,
    updateQuestion
}) => {

    const createQuestionInput = ({text: questionText = text, questionType = __typename,  options: questionOptions = options || [], multiSelect: questionMultiSelect = multiSelect || false} 
        : {text?: string, questionType?: "SelectQuestion" | "TextQuestion", options?: string[], multiSelect?: boolean}): QuestionInput => {
        switch (questionType) {
            case "SelectQuestion":
                return {
                    select: {
                        text: questionText,
                        options: questionOptions,
                        multiSelect: questionMultiSelect
                    }
                };
            case "TextQuestion":
                return {
                    text: {
                        text: questionText
                    }
                };
        }
    };

    const setQuestionText = (text: string) => {
        updateQuestion(createQuestionInput({text}));
    };

    const setQuestionType = (questionType: "SelectQuestion" | "TextQuestion") => {
        updateQuestion(createQuestionInput({questionType}));
    };

    const addQuestionOption = () =>  {
        updateQuestion(createQuestionInput({options: [...options || [], "Untitled Option"]}));
    }

    return (
        <div className="bg-gray-700 w-full p-6 text-lg rounded drop-shadow">
            <FormQuestionHeader text={text} questionType={__typename} setQuestionText={setQuestionText} setQuestionType={setQuestionType}/>
            <div className="py-4">
                {__typename === "TextQuestion" ?
                    <FormTextQuestionBody/>
                : 
                    <FormSelectQuestionBody questionOptions={options || []} addQuestionOption={addQuestionOption}/>
                }
            </div>
        </div>
    );
};

export const FormQuestionHeader: React.FC<{text: string, questionType: "SelectQuestion" | "TextQuestion", setQuestionText: (text: string) => void,  setQuestionType: (questionType: "SelectQuestion" | "TextQuestion") => void}> = (
    {
        text,
        questionType,
        setQuestionType,
        setQuestionText
    }) => {
    return (
        <div className="flex gap-2 justify-between">
            <div className="w-3/4">
                <EditableText text={text} setText={setQuestionText}/>
            </div>
            <select 
                className="p-1 outline-0 rounded"
                name="type"
                id="type"
                value={questionType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuestionType(e.target.value as "SelectQuestion" | "TextQuestion")}
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

export const FormSelectQuestionBody: React.FC<{questionOptions: string[], addQuestionOption: () => void}> = ({
        questionOptions,
        addQuestionOption
    }) => { 
    return (
        <div>
            {questionOptions.map((questionOption, index) => (
                <div key={index} className="flex gap-2 align-baseline">
                    <input type="radio" value={questionOption} disabled/>
                    <EditableText text={questionOption} setText={(text:string) => console.log(text)}/>
                </div>
            ))}
            <div onClick={addQuestionOption} className="pl-6 pt-2 cursor-pointer">                            
                <span className="underline">+ Add Option</span>
            </div>
        </div>
    );
};