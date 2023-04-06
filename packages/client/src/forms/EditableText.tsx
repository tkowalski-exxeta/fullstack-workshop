import React, { useState } from "react";

export const EditableText: React.FC<{ text: string, setText: Function}> = ({
    text,
    setText,
  }) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(text);
    
    const saveChanges = () => {
      if(inputValue !== text) setText(inputValue);
      setEditing(false);
    };
    
    return (
      <div
        className="w-full "
        onClick={() => setEditing(true)}
        >
        {editing ?
          <input 
            className="w-full bg-inherit backdrop-brightness-90 p-1 rounded outline-0 border-b-white border-b-2"
            autoFocus
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            onBlur={saveChanges}
          />
          :
          <div className="p-1 border-b-transparent border-b-2">{inputValue}</div>
        }
      </div>
    );
  };