import React, { useState } from 'react';
import { db, firestore } from '../firebase';  // Import Firestore
import { getDoc, doc } from 'firebase/firestore';
import { Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import './StudentPage.css'
const StudentPage = () => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);

  // Fetch student data from Firestore
  const handleSearch = async () => {
    try {
      const studentDocRef = doc(db, 'students', studentId);
      const studentSnapshot = await getDoc(studentDocRef);

      if (studentSnapshot.exists()) {
        setStudentData(studentSnapshot.data());
      } else {
        alert('No data found for this student ID.');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' , textAlign:'center' }}>
      <p></p>
      <p></p>


      <Typography variant="h4"    gutterBottom>
        Student Grades
      </Typography>
      <p></p>
      <p></p>

      <TextField
        label="Enter Student ID"
        variant="outlined"
        fullWidth
        color='info'
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
<p></p>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {studentData && (
        <div>
          <p></p>

          <Typography variant="h6" gutterBottom>
            Grades for {studentData.name}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grade</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData.grades.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell>{grade.grade}</TableCell>
                  <TableCell>{grade.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
