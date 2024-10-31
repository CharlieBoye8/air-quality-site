import React, { useState } from 'react';
import '../styles/Admin.css';

const Admin = () => {
  const [alerts, setAlerts] = useState([{ id: 1, module: 'Gettysburg Hotel', message: 'Air quality sensor failure', date: '2024-10-15' }]);
  const [serviceLog, setServiceLog] = useState([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ module: 'Gettysburg Hotel', date: new Date().toISOString().split('T')[0], notes: '' });

  const handleResolve = (alertId) => {
    const alertToResolve = alerts.find((alert) => alert.id === alertId);
    setServiceLog([
      ...serviceLog,
      { module: alertToResolve.module, date: alertToResolve.date, notes: alertToResolve.message, relatedAlert: true }
    ]);
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  const handleAddServiceInfo = () => {
    setIsAddingService(true);
  };

  const handleServiceSubmit = () => {
    setServiceLog([...serviceLog, { ...newService, relatedAlert: false }]);
    setNewService({ module: 'Gettysburg Hotel', date: new Date().toISOString().split('T')[0], notes: '' });
    setIsAddingService(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1 className="admin-title">Admin Console</h1>

        <div className="alert-center">
          <h2>Alert Center</h2>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id} className="alert-bubble">
                <p>{alert.message} at {alert.module}</p>
                <p><strong>Date:</strong> {alert.date}</p>
                <button className="resolve-button" onClick={() => handleResolve(alert.id)}>Resolve</button>
              </div>
            ))
          ) : (
            <p>No active alerts.</p>
          )}
        </div>

        <div className="service-info">
          <h2>Module Service Information</h2>
          <table className="service-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Service Date</th>
                <th>Service Notes</th>
              </tr>
            </thead>
            <tbody>
              {serviceLog.map((log, index) => (
                <tr key={index} className={log.relatedAlert ? 'highlight' : ''}>
                  <td>{log.module}</td>
                  <td>{log.date}</td>
                  <td>{log.notes}</td>
                </tr>
              ))}
              {isAddingService && (
                <tr>
                  <td>
                    <select value={newService.module} onChange={(e) => setNewService({ ...newService, module: e.target.value })}>
                      <option value="Gettysburg Hotel">Gettysburg Hotel</option>
                      <option value="Gettysburger">Gettysburger</option>
                      <option value="West Building">West Building</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={newService.date}
                      onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                    />
                  </td>
                  <td className="notes-submit-cell">
                    <input
                      type="text"
                      value={newService.notes}
                      placeholder="Enter service notes"
                      onChange={(e) => setNewService({ ...newService, notes: e.target.value })}
                    />
                    <button className="submit-button" onClick={handleServiceSubmit}>Submit</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!isAddingService && (
            <button className="add-service-button" onClick={handleAddServiceInfo}>Add New Service Info</button>
          )}
        </div>

        <div className="service-notification">
          <h2>Service Notification Settings</h2>
          <p>Configure regular service notifications to be sent to the admin.</p>
          <button className="configure-button">Configure Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
