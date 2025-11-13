import React from 'react';

interface CheckBoxProps {
  checked?: boolean;
  checkBoxId: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, checkBoxId, label, handleChange }) => {
  return (
    <div className="col-12">
      <input 
        type="checkbox" 
        className="" 
        onChange={handleChange} 
        id={checkBoxId}
        checked={checked}
      />
      <label className="" htmlFor={checkBoxId}>{label}</label>
    </div>
  );
};

export default CheckBox;
