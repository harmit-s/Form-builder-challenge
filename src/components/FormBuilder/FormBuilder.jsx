import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx'
import Canvas from '../Canvas/Canvas.jsx';
import Preview from '../Preview/Preview.jsx';
import './FormBuilder.css';


const generateField = () => Math.floor(Math.random() * (100000 - 1 + 1) + 57);


const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formList, setFormList] = useState([]); 
  const [currentForm, setCurrentForm] = useState(null);
  const [message, setMessage] = useState("");

  const addField = (dataType) => {
    const newField = {
      field: generateField(),
      type: dataType,
      label: '',
      name: '',
      placeholder: '',
      required: false,
      options: [],
    };
    setFields((prevFields) => [...prevFields, newField]);
  };

  const handleFieldChange = (fieldIndex, e) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex][e.target.name] = e.target.value;
    setFields(updatedFields);
  };

  const toggleRequired = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].required = !updatedFields[fieldIndex].required;
    setFields(updatedFields);
  };

  const addOption = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.push('');
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, e) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = e.target.value;
    setFields(updatedFields);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  const deleteField = (fieldIndex) => {
    setFields(fields.filter((_, index) => index !== fieldIndex));
  };

  const moveField = (fromIndex, toIndex) => {
    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(fromIndex, 1);
    updatedFields.splice(toIndex, 0, movedField);
    setFields(updatedFields);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/forms/list');
      if (!response.ok) throw new Error('Failed to fetch forms');
      const data = await response.json();
      setFormList(data);
    } catch (error) {
      setMessage(error.message);
    }
  };


  const saveForm = async () => {
    const data = {
      id: currentForm ? currentForm.id : generateField(), 
      fields: fields,
    };

    try {
      const response = await fetch('http://localhost:5000/api/forms/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message); 
        setFields([]);
        setCurrentForm(null);
        
        fetchForms();
      } else {
        throw new Error('Failed to save form');
      }
    } catch (error) {
      setMessage(error.message); 
    }
  };

  const loadForm = (form) => {
    setCurrentForm(form); 
    setFields(form.fields); 
  };

  return (
    <div className="form-builder">
      <h1>Form Builder with React Drag and Drop</h1>
      <div className="layout">
        <Sidebar addField={addField} />
        <Canvas
          fields={fields}
          handleFieldChange={handleFieldChange}
          toggleRequired={toggleRequired}
          addOption={addOption}
          removeOption={removeOption}
          handleOptionChange={handleOptionChange}
          deleteField={deleteField}
          moveField={moveField}
        />
        <Preview fields={fields} />
      </div>
      <div className="form-controls">
        <button onClick={saveForm}>Save Form</button>
        <h3>Forms</h3>
        <ul>
          {formList.map((form) => (
            <li key={form.id} onClick={() => loadForm(form)}>
              Form ID: {form.id} ({form.fields.length} fields)
            </li>
          ))}
        </ul>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default FormBuilder;