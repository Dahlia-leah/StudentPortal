// src/components/ArchivePage.js
import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import './ArchivePage.css';
const ArchivePage = () => {
  const [uploads, setUploads] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    const snapshot = await db.collection('uploads').get();
    const fetchedUploads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUploads(fetchedUploads);
  };

  const handleDelete = async (id, fileURL) => {
    try {
      await db.collection('uploads').doc(id).delete();
      const fileRef = storage.refFromURL(fileURL);
      await fileRef.delete();
      alert('Upload deleted');
      fetchUploads();
    } catch (error) {
      console.error('Error deleting upload:', error);
      alert('Error deleting upload');
    }
  };

  const filteredUploads = uploads.filter(upload =>
    filterDate ? new Date(upload.uploadDate).toDateString() === new Date(filterDate).toDateString() : true
  );

  return (
    <div>
      <h2>Uploads Archive</h2>
      <label>Filter by Date: </label>
      <input type="date" onChange={(e) => setFilterDate(e.target.value)} />

      {filteredUploads.length > 0 ? (
        filteredUploads.map((upload) => (
          <div key={upload.id}>
            <h3>Upload Date: {new Date(upload.uploadDate).toDateString()}</h3>
            <a href={upload.fileURL} target="_blank" rel="noopener noreferrer">Download File</a>
            <button onClick={() => handleDelete(upload.id, upload.fileURL)}>Delete Upload</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {upload.data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.grade}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No uploads found.</p>
      )}
    </div>
  );
};

export default ArchivePage;
