import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateClass } from "../utils/validate";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const RegisterClass = () => {
  const navigate = useNavigate();

  const handleOnSubmit = async (classData, { resetForm }) => {
    axios
      .post(`http://localhost:3000/classes`, classData)
      .then((res) => {
        navigate("/classes");
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
          name: "",
          day: "",
          time: "",
        }}
        validate={validateClass}
        onSubmit={handleOnSubmit}
      >
        <Form className="h-full flex flex-col justify-between items-center">
          <h1 className="mx-auto mt-7 text-3xl font-bold text-center">
            Register Class
          </h1>
          <div className="flex flex-col space-y-4 w-full">
            <div>
              <Field
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="name" />
              </span>
            </div>

            <div>
              <Field className="input" placeholder="Day" as="select" name="day">
                <option defaultValue hidden>
                  Day
                </option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </Field>
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="day" />
              </span>
            </div>

            <div>
              <Field
                className="input"
                placeholder="Time"
                as="select"
                name="time"
              >
                <option defaultValue hidden>
                  Time
                </option>
                <option value="00:00">00:00</option>
                <option value="01:00">01:00</option>
                <option value="02:00">02:00</option>
                <option value="03:00">03:00</option>
                <option value="04:00">04:00</option>
                <option value="05:00">05:00</option>
                <option value="06:00">06:00</option>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
              </Field>
              <span className="text-red-500 text-xs pl-2">
                <ErrorMessage name="time" />
              </span>
            </div>
          </div>

          <div
            style={{
              margin: "0 auto 1rem auto",
            }}
            className="flex justify-end w-full"
          >
            <PrimaryButton type="submit" text="Save" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterClass;
