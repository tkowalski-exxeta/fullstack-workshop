import React from "react";
import { EditableText } from "./EditableText";

interface FormQuestionProps {
    __typename: "SelectQuestion" | "TextQuestion";
    _id: string;
    text: string;
    options?: string[];
    multiSelect?: boolean;
}

export const FormQuestion: React.FC<FormQuestionProps> = ({
    __typename,
    _id,
    text,
    options,
    multiSelect,
}) => {
    const [questionType, setQuestionType] = React.useState<"SelectQuestion" | "TextQuestion">(__typename);
    const [questionOptions, setQuestionOptions] = React.useState<string[]>(options || []);

    const changeQuestionsType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuestionType(e.target.value as "SelectQuestion" | "TextQuestion");
    };

    const addQuestionOption = () =>  {
        setQuestionOptions([...questionOptions, "Untitled Option"]);
    }

    return (
        <div className="bg-gray-700 w-full p-6 text-lg rounded drop-shadow">
            <FormQuestionHeader text={text} questionType={questionType} setQuestionType={changeQuestionsType}/>
            <div className="py-4">
                {questionType === "TextQuestion" ?
                    <FormTextQuestionBody/>
                : 
                    <FormSelectQuestionBody questionOptions={questionOptions} addQuestionOption={addQuestionOption}/>
                }
            </div>
        </div>
    );
};

export const FormQuestionHeader: React.FC<{text: string, questionType: "SelectQuestion" | "TextQuestion", setQuestionType: (e: React.ChangeEvent<HTMLSelectElement>) => void}> = (
    {
        text,
        questionType,
        setQuestionType}
    ) => {
    return (
        <div className="flex gap-2 justify-between">
            <div className="w-3/4">
                <EditableText text={text} setText={(text:string) => console.log(text)}/>
            </div>
            <select 
                className="p-1 outline-0 rounded"
                name="type"
                id="type"
                value={questionType}
                onChange={setQuestionType}
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