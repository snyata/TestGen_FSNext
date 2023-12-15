// Home page form in TSX format

import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FormFieldsProps {
  username: string;
  password: string;
  stack: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setStack: Dispatch<SetStateAction<string>>;
}

const FormFields: React.FC<FormFieldsProps> = ({ username, password, stack, setUsername, setPassword, setStack }) => {
  const handleInputChange = (setter: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleInputChange(setUsername)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange(setPassword)}
        className="p-2 border border-gray-300 rounded"
      />
      <select
        value={stack}
        onChange={handleInputChange(setStack)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="SAP">SAP</option>
        <option value="Angular">Angular</option>
      </select>
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default FormFields;
