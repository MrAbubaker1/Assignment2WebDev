import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Form from "./Components/Form";

const StudentPortal = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="container mx-auto p-4">
          <Form />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPortal;
