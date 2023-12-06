import { ISelectOption } from "@/dtos/common.dto";
import {
  Dispatch,
  FC,
  KeyboardEventHandler,
  SetStateAction,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

interface Props {
  label: string;
  labelCustomClasses?: string;
  id: string;
  wrapperCustomClasses?: string;
  value: ISelectOption[];
  setValue: Dispatch<SetStateAction<ISelectOption[]>>;
}

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    borderColor: "#e5e7eb",
    borderRadius: "6px",
    padding: "5px 8px",
  }),
};

const FormOptimizedCreatableInput: FC<Props> = ({
  label,
  labelCustomClasses,
  wrapperCustomClasses,
  id,
  value,
  setValue,
}): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };
  return (
    <div className={`mb-4 ${wrapperCustomClasses}`}>
      <label htmlFor={id} className={`form-input-label ${labelCustomClasses}`}>
        {label}
      </label>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue as any)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập từng thẻ và nhấn Enter..."
        value={value}
        styles={customStyles}
      />
    </div>
  );
};

export default FormOptimizedCreatableInput;
