import React, { useState } from "react";

interface Props {
  onSubmit: (title: string, description: string, severity: string) => void;
}

const ReportIncidentForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [severity, setSeverity] = useState<string>("Low");
  const [errors, setErrors] = useState<{title?: string, description?: string}>({});

  const validateForm = () => {
    const newErrors: {title?: string, description?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(title, description, severity);
      setTitle("");
      setDescription("");
      setSeverity("Low");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Report New Incident</h3>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter incident title"
          className={errors.title ? "error" : ""}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide detailed information about the incident"
          className={errors.description ? "error" : ""}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit">Submit Incident</button>
    </form>
  );
};

export default ReportIncidentForm;
