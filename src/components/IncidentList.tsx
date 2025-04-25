import React, { useState, useEffect } from "react";
import { Incident } from "../types/Incident";

interface Props {
  incidents: Incident[];
}

const IncidentList: React.FC<Props> = ({ incidents }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [newIncidentIds, setNewIncidentIds] = useState<number[]>([]);

  // Track new incidents for animation
  useEffect(() => {
    const currentIds = incidents.map(incident => incident.id);
    const previousIds = currentIds.filter(id => !newIncidentIds.includes(id));
    const addedIds = currentIds.filter(id => !previousIds.includes(id));
    
    if (addedIds.length > 0) {
      setNewIncidentIds(addedIds);
      
      // Remove the highlight after animation completes
      const timer = setTimeout(() => {
        setNewIncidentIds([]);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [incidents]);

  const toggleDetails = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "Low":
        return "severity-low";
      case "Medium":
        return "severity-medium";
      case "High":
        return "severity-high";
      default:
        return "severity-low";
    }
  };

  return (
    <div>
      <h2>AI Safety Incidents</h2>
      <div className="incident-list">
        {incidents.length === 0 ? (
          <div className="no-incidents">
            <p>No incidents found. Try adjusting your filters or add a new incident.</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="incident-card">
              <div className="incident-card-header">
                <h3>{incident.title}</h3>
              </div>
              <div className="incident-card-body">
                <div className="incident-meta">
                  <span className={`severity-badge ${getSeverityClass(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className="incident-date">
                    {new Date(incident.reported_at).toLocaleDateString()} at {new Date(incident.reported_at).toLocaleTimeString()}
                  </span>
                </div>
                
                {expandedId === incident.id && (
                  <div className="incident-description">
                    <p><strong>Description:</strong> {incident.description}</p>
                  </div>
                )}
                
                <button 
                  className="view-details-btn"
                  onClick={() => toggleDetails(incident.id)}
                >
                  {expandedId === incident.id ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentList;
