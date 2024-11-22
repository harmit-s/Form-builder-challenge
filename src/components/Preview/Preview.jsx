import React from 'react';

import './Preview.css'

const FormPreview = ({ fields }) => {
  return (
    <div className="form-preview">
      <h3 className='title'>Form Preview</h3>
      {fields.map((field, index) => {
        const { label, name, placeholder, required, type, options } = field;

        return (
          <div className="form-group" key={index}>
            <label>{label}</label>
            {type === 'textarea' ? (
              <textarea name={name} placeholder={placeholder} required={required} disabled />
            ) : type === 'select' ? (
              <select name={name} required={required}>
                {options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : type === 'radio' || type === 'checkbox' ? (
              <>
                {options.map((opt, idx) => (
                  <div key={idx} className="option-group">
                    <input type={type} name={name} value={opt} />
                    <label>{opt}</label>
                  </div>
                ))}
              </>
            ) : (
              <input type={type} name={name} placeholder={placeholder} required={required} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormPreview;