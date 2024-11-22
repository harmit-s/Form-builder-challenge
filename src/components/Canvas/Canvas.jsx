import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

import './Canvas.css'

const Canvas = ({ fields, handleFieldChange, toggleRequired, addOption, removeOption, handleOptionChange, deleteField, moveField }) => {
  
  const [, drop] = useDrop(() => ({
    accept: 'formField',
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = monitor.getItem().index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex; 
    },
  }));

  return (
    <div className="canvas" ref={drop}>
      <h3>Canvas</h3>
      {fields.map((field, index) => (
        <DraggableField
          key={field.field}
          field={field}
          index={index}
          handleFieldChange={handleFieldChange}
          toggleRequired={toggleRequired}
          addOption={addOption}
          removeOption={removeOption}
          handleOptionChange={handleOptionChange}
          deleteField={deleteField}
        />
      ))}
    </div>
  );
};

const DraggableField = ({ field, index, handleFieldChange, toggleRequired, addOption, removeOption, handleOptionChange, deleteField }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'formField',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`form-field ${isDragging ? 'dragging' : ''}`}>
      <button className="delete-button" onClick={() => deleteField(index)}>X</button>
      <input
        type="text"
        name="label"
        value={field.label}
        onChange={(e) => handleFieldChange(index, e)}
        placeholder="Label"
      />
      <input
        type="text"
        name="name"
        value={field.name}
        onChange={(e) => handleFieldChange(index, e)}
        placeholder="Field Name"
      />
      <input
        type="text"
        name="placeholder"
        value={field.placeholder}
        onChange={(e) => handleFieldChange(index, e)}
        placeholder="Placeholder"
      />
      <label className="required-label">
        Required
        <input
          type="checkbox"
          checked={field.required}
          onChange={() => toggleRequired(index)}
        />
      </label>

      {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
        <div className="option-area">
          <button className="add-option-button" onClick={() => addOption(index)}>Add Option</button>
          {field.options.map((opt, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, optionIndex, e)}
                placeholder="Option"
              />
              <button 
                className="remove-option-button"
                onClick={() => removeOption(index, optionIndex)}>Remove Option</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Canvas;