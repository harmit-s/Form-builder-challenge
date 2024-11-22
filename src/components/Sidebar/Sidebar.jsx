import React from 'react';
import { useDrag } from 'react-dnd';
import { FaTextWidth, FaRegFileAlt, FaLock, FaEnvelope, FaListUl, FaCheckCircle, FaRegCalendarAlt, FaRegEdit, FaDotCircle, FaUpload } from 'react-icons/fa';

const SidebarItem = ({ type, addField, icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'formField',
    item: { type },
  }));

  return (
    <div
      ref={drag}
      className="sidebar-item"
      onClick={() => addField(type)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {icon} {label}
    </div>
  );
};

const Sidebar = ({ addField }) => {
  return (
    <div className="sidebar">
      <h3>Form Fields</h3>
      <SidebarItem type="text" addField={addField} icon={<FaTextWidth />} label="Text" />
      <SidebarItem type="number" addField={addField} icon={<FaRegFileAlt />} label="Number" />
      <SidebarItem type="email" addField={addField} icon={<FaEnvelope />} label="Email" />
      <SidebarItem type="password" addField={addField} icon={<FaLock />} label="Password" />
      <SidebarItem type="textarea" addField={addField} icon={<FaRegEdit />} label="Textarea" />
      <SidebarItem type="select" addField={addField} icon={<FaListUl />} label="Select" />
      <SidebarItem type="radio" addField={addField} icon={<FaDotCircle />} label="Radio" />
      <SidebarItem type="checkbox" addField={addField} icon={<FaCheckCircle />} label="Checkbox" />
      <SidebarItem type="date" addField={addField} icon={<FaRegCalendarAlt />} label="Date" />
      <SidebarItem type="file" addField={addField} icon={<FaUpload />} label="File Upload" />
    </div>
  );
};

export default Sidebar;