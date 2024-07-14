// This component is where an admin can manage and view student details

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        dateOfEnrollment: '',
        areaOfStudy: ''
    });

    // Fetch students when component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('/api/students');
                setStudents(res.data);
            } catch (err) {
                console.error('Error fetching students', err);
            }
        };

        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.post('/api/students', body, config);
            setStudents([...students, res.data]);  // Add new student to state
            alert('Student added successfully!');
        } catch (err) {
            console.error('Failed to add student', err.response.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/students/${id}`);
            setStudents(students.filter(student => student._id !== id));
            alert('Student deleted successfully!');
        } catch (err) {
            console.error('Failed to delete student', err.response.data);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Students</h2>
            <ul>
                {students.map(student => (
                    <li key={student._id}>
                        {student.name} - {student.email}
                        <button onClick={() => handleDelete(student._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                {/* Repeat for other fields */}
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default Dashboard;

