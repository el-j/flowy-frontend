import React from 'react';

const CheckBox = ({checked,checkBoxId,label,handleChange}) => {
  return (
      <div className="col-12" >
        <input type="checkbox" className="" onChange={handleChange} id={checkBoxId} />
        <label className="" htmlFor={checkBoxId}>{label}</label>
      </div>
  )
}

export default CheckBox;
