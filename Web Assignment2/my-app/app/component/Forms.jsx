"use client";

import React, { useState, useEffect } from "react";

const Forms = () => {
  const [students, setStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    currentGrade: "",
  });

  const addStudent = (studentData) => {
    fetch("http://localhost:3001/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((newStudent) => {
        console.log("New Student:", newStudent);
        setStudents((prevStudents) => [...prevStudents, newStudent]);
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:3001/student/${id}`, {
      method: "DELETE",
    }).then(() => {
      setStudents((prevStudent) =>
        prevStudent.filter((student) => student.id !== id)
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const currentGrade = e.target.currentGrade.value;

    const newError = {
      firstName: firstName === "" ? "First Name is required" : "",
      lastName: lastName === "" ? "Last Name is required" : "",
      dateOfBirth: dateOfBirth === "" ? "Date of Birth is required" : "",
      currentGrade: currentGrade === "" ? "Current Grade is required" : "",
    };
    
    setError(newError);

    const grade = parseInt(currentGrade);
    if (isNaN(grade) || grade < 1 || grade > 12) {
      setError((prevError) => ({
        ...prevError,
        currentGrade: "Current Grade must be between 1 and 12",
      }));
      return;
    }
    
    const hasError = Object.values(newError).some((err) => err !== "");
    if (!hasError) {
      const studentData = { firstName, lastName, dateOfBirth, currentGrade };
      addStudent(studentData);
      e.target.reset();
    }
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const currentGrade = e.target.currentGrade.value;

    // Parse the grade to an integer
    const grade = parseInt(currentGrade);

    // Check if grade is not a number or not within the range
    if (isNaN(grade) || grade < 1 || grade > 12) {
      setError((prevError) => ({
        ...prevError,
        currentGrade: "Current Grade must be between 1 and 12",
      }));
      return;
    }

    const updatedStudent = { firstName, lastName, dateOfBirth, currentGrade };

    fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then(() => {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === id ? { ...student, ...updatedStudent } : student
          )
        );
        setUpdateFormVisible(null);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Student</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            className="border p-2 mr-2 mt-2 w-full"
          />
          {error.firstName && (
            <span style={{ color: "red" }}>{error.firstName}</span>
          )}
          <br />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            className="border p-2 mr-2 mt-2 w-full"
          />
          {error.lastName && (
            <span style={{ color: "red" }}>{error.lastName}</span>
          )}
          <br />
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="dateOfBirth"
            className="border p-2 mr-2 mt-2 w-full"
          />
          {error.dateOfBirth && (
            <span style={{ color: "red" }}>{error.dateOfBirth}</span>
          )}
          <br />
          <input
            type="text"
            placeholder="Current Grade"
            name="currentGrade"
            className="border p-2 mr-2 mt-2 w-full"
          />
          {error.currentGrade && (
            <span style={{ color: "red" }}>{error.currentGrade}</span>
          )}
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
          >
            Add Student
          </button>
        </form>
        <div className="mt-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">First Name</th>
                <th className="border px-4 py-2">Last Name</th>
                <th className="border px-4 py-2">Date of Birth</th>
                <th className="border px-4 py-2">Current Grade</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border px-4 py-2">{student.firstName}</td>
                  <td className="border px-4 py-2">{student.lastName}</td>
                  <td className="border px-4 py-2">{student.dateOfBirth}</td>
                  <td className="border px-4 py-2">{student.currentGrade}</td>
                  <td className="border px-4 py-2">
                    {updateFormVisible === student.id ? (
                      <form onSubmit={(e) => handleUpdate(e, student.id)}>
                        <input
                          type="text"
                          defaultValue={student.firstName}
                          name="firstName"
                          className="border p-2 mr-2 mt-2 w-full"
                        />
                        <input
                          type="text"
                          defaultValue={student.lastName}
                          name="lastName"
                          className="border p-2 mr-2 mt-2 w-full"
                        />
                        <input
                          type="text"
                          defaultValue={student.dateOfBirth}
                          name="dateOfBirth"
                          className="border p-2 mr-2 mt-2 w-full"
                        />
                        <input
                          type="text"
                          defaultValue={student.currentGrade}
                          name="currentGrade"
                          className="border p-2 mr-2 mt-2 w-full"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
                        >
                          Update
                        </button>
                      </form>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                          onClick={() => setUpdateFormVisible(student.id)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forms;
