'use client'
import React, { useState, useEffect } from "react";

const StudentPortal = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(dateRegex) !== null;
  };

  const isValidGrade = (gradeString) => {
    return !isNaN(gradeString) && parseInt(gradeString) >= 10 && parseInt(gradeString) <= 12;
  };

  const addStudent = (firstName, lastName, dateOfBirth, grade) => {
    if (!firstName || !lastName || !dateOfBirth || !grade) {
      alert('Please fill in all fields.');
      return;
    }

    if (!isValidDate(dateOfBirth)) {
      alert('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    if (!isValidGrade(grade)) {
      alert('Invalid grade. Please enter a grade between 10 and 12.');
      return;
    }

    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, dateOfBirth, grade }),
    })
      .then((res) => res.json())
      .then((newStudent) => setStudents((prevStudents) => [...prevStudents, newStudent]));
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE",
    }).then(() => {
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const grade = e.target.grade.value;

    addStudent(firstName, lastName, dateOfBirth, grade);

    // Clear input fields
    e.target.firstName.value = "";
    e.target.lastName.value = "";
    e.target.dateOfBirth.value = "";
    e.target.grade.value = "";
  };

  const updateStudent = (id, firstName, lastName, dateOfBirth, grade) => {
    if (!isValidDate(dateOfBirth)) {
      alert('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    if (!isValidGrade(grade)) {
      alert('Invalid grade. Please enter a number between 10 and 12.');
      return;
    }

    fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, dateOfBirth, grade }),
    }).then(() => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, firstName, lastName, dateOfBirth, grade } : student
        )
      );
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Students</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 mr-2"
            type="text"
            placeholder="First Name"
            name="firstName"
          />
          <input
            className="border p-2 mr-2"
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          <input
            className="border p-2 mr-2"
            type="text"
            placeholder="Date of Birth"
            name="dateOfBirth"
          />
          <input
            className="border p-2 mr-2"
            type="text"
            placeholder="Grade"
            name="grade"
          />
          <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2" type="submit">
            Add Student
          </button>
        </form>
        <ul className="mt-4">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center p-2 border border-black rounded mb-3"
            >
              <div>
                <span >{`${student.firstName} ${student.lastName}, Grade ${student.grade}`}</span>
                <p>Date of Birth: {student.dateOfBirth}</p>
              </div>
              <div>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-600 text-white py-1 px-2 rounded"
                  onClick={() =>
                    updateStudent(
                      student.id,
                      prompt("Enter new first name", student.firstName),
                      prompt("Enter new last name", student.lastName),
                      prompt("Enter new date of birth", student.dateOfBirth),
                      prompt("Enter new grade", student.grade)
                    )
                  }
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentPortal;
