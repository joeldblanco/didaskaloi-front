import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateStudent } from "../utils/validate";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { useState } from "react";

const EditStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/students/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [studentId]);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  const handleOnSubmit = async (studentData, { resetForm }) => {
    axios
      .put(`http://localhost:3000/students/${studentId}`, studentData)
      .then((res) => {
        navigate("/students");
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Header />
      <Formik
        initialValues={{
          firstName: student.firstName,
          lastName: student.lastName,
          age: student.age,
          gender: student.gender,
        }}
        validate={validateStudent}
        onSubmit={handleOnSubmit}
      >
        <Form className="h-full flex flex-col justify-between items-center">
          <h1 className="mx-auto mt-7 text-3xl font-bold text-center">
            Edit Student
          </h1>
          <div className="flex flex-col space-y-4 w-full">
            <div>
              <Field
                type="text"
                name="firstName"
                className="input"
                placeholder="Name"
              />
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="firstName" />
              </span>
            </div>

            <div>
              <Field
                type="text"
                name="lastName"
                className="input"
                placeholder="Last Name"
              />
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="lastName" />
              </span>
            </div>

            <div>
              <Field
                type="number"
                name="age"
                className="input"
                placeholder="Age"
                min="0"
                max="100"
              />
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="age" />
              </span>
            </div>

            <div>
              <Field
                className="input"
                placeholder="Age"
                as="select"
                name="gender"
              >
                <option defaultValue hidden>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="gender" />
              </span>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <PrimaryButton type="submit" text="Save" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditStudent;
