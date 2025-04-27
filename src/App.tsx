import { useState, useEffect } from "react";
import { mockIncidents } from "./data/mockIncidents";
import { Incident } from "./types/Incident";
import IncidentList from "./components/IncidentList";
import FilterControls from "./components/FilterControls";
import SortControls from "./components/SortControls";
import ReportIncidentForm from "./components/ReportIncidentForm";
import './App.css';

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(mockIncidents);
  const [sortOrder, setSortOrder] = useState<"Newest First" | "Oldest First">("Newest First");
  const [severityFilter, setSeverityFilter] = useState<"All" | "Low" | "Medium" | "High">("All");

  useEffect(() => {
    setFilteredIncidents(incidents);
  }, [incidents]);

  // Fix type issue by making the function accept string and then casting it
  const handleFilterChange = (severity: string) => {
    setSeverityFilter(severity as "All" | "Low" | "Medium" | "High");
  };

  // Fix type issue by making the function accept string and then casting it
  const handleSortChange = (order: string) => {
    setSortOrder(order as "Newest First" | "Oldest First");
  };

  // Fix type issue by making the function accept string and then casting it
  const handleReportIncident = (title: string, description: string, severity: string) => {
    const newIncident: Incident = {
      id: incidents.length + 1, // Increment ID for new incident
      title,
      description,
      severity: severity as "Low" | "Medium" | "High",
      reported_at: new Date().toISOString(),
    };
    setIncidents((prevIncidents) => [...prevIncidents, newIncident]);
  };

  const filteredData = filteredIncidents.filter((incident) =>
    severityFilter === "All" ? true : incident.severity === severityFilter
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
  });
 
  return (
    <div className="App">
      <h1>AI Safety Incident Dashboard</h1>
      
      <div className="controls-container">
        <FilterControls onFilterChange={handleFilterChange} />
        <SortControls onSortChange={handleSortChange} />
      </div>
      
      <IncidentList incidents={sortedData} />
      <ReportIncidentForm onSubmit={handleReportIncident} />
    </div>
  );
}

export default App;