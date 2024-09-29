import React, { useState } from 'react';
import { storage, db } from '../firebase';  // Import initialized Firestore and Storage
import * as XLSX from 'xlsx';
import { Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { writeBatch, doc, arrayUnion } from 'firebase/firestore';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewDataa, setPreviewDataa] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const rowsa = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const parsedDataa = rowsa.slice(1).map(row => ({
       id: row[0],
       name: row[1],
       grade: row[2],
       date: row[3]
     }));
      setPreviewDataa(parsedDataa);
      setPreviewData(parsedData);
      setFile(selectedFile);
    };
  };

  const handleUpload = async () => {
    if (!file || previewData.length === 0) {
      alert('Please select a file and preview it before uploading.');
      return;
    }

    try {
      setLoading(true);
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);
      await db.collection('uploads').add({
        fileURL,
        uploadDate: new Date().toISOString(),
        data: previewDataa
      });
 
      const batch = writeBatch(db);
      previewData.forEach((row) => {
        const studentDoc = doc(db, 'students', row.ID.toString());
        batch.set(studentDoc, {
          name: row.Name,
          grades: arrayUnion({
            grade: row.Grade,
            date: row.Date,
          }),
        }, { merge: true });
      });

      await batch.commit();
      alert('File uploaded and data saved successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
                <p></p>
                <p></p>

      <Typography variant="h4" gutterBottom>
        Upload Student Grades
      </Typography>
      <p></p>
      <p></p>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
     

      {previewData.length > 0 && (
        <div>
          <p></p>
           <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Confirm Upload'}
      </Button>
          <Typography variant="h6" gutterBottom>
            Preview Data
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previewData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ID}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Grade}</TableCell>
                  <TableCell>{row.Date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
