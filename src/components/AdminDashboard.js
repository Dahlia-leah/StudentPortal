import React, { useState } from 'react';
import UploadPage from './UploadPage';
import ArchivePage from './ArchivePage';
import './AdminDashboard.css'
const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('upload');

  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadPage />;
      case 'archive':
        return <ArchivePage />;
      default:
        return <UploadPage />;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav>
        <button className='btn' onClick={() => setCurrentPage('upload')}>Upload</button>
        <button className='btn'  onClick={() => setCurrentPage('archive')}>Archive</button>
      </nav>
      
      <div className="dashboard-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;
