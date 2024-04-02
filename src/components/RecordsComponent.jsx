import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateRecord } from "../utils/validate";

const RecordsComponent = ({ data = [], bClass = false }) => {
  const [records, setRecords] = useState(data);
  const [visibleRecords, setVisibleRecords] = useState(data);
  const [addRegistryModal, setAddRegistryModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/classes/${bClass._id}/assistance`)
      .then((response) => {
        setRecords(response.data);
        setVisibleRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/students`, {
        data: { studentsIds: selectedStudents },
      })
      .then((res) => {
        axios.get("http://localhost:3000/students").then((response) => {
          setStudents(response.data);
          setVisibleRecords(response.data);
          setSelectedStudents([]);
          setDeleteModal(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (date, { resetForm }) => {
    const classId = bClass._id;

    //Convertir de YYYY-MM-DD a DD/MM/YYYY
    const dateParts = date.date.split("-");
    date.date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    axios
      .post(`http://localhost:3000/classes/${classId}/assistance`, date)
      .then((res) => {
        axios
          .get(`http://localhost:3000/classes/${classId}/assistance`)
          .then((response) => {
            setRecords(response.data);
            setVisibleRecords(response.data);
            resetForm();
            setAddRecordModal(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center w-full space-y-6 pb-4">
        <div className="w-full flex space-x-4">
          <SearchBar
            searchableData={records}
            setResultMethod={setVisibleRecords}
            searchingParams={["date"]}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-6 overflow-y-scroll h-full">
        <div className="flex flex-col items-center">
          {visibleRecords?.length > 0 && (
            <div className="w-full">
              {visibleRecords.map((record) => (
                <Link
                  to={`/classes/${bClass._id}/${record._id}`}
                  key={record._id}
                  className={`border-b border-[var(--gray-2)] text-gray-700 py-4 w-full text-sm flex space-x-4 ${
                    selectedRecords.includes(record._id) ? "bg-gray-200" : ""
                  }`}
                >
                  <div>
                    <p className="font-bold">{record.date}</p>
                    <p className="capitalize">
                      Assistances:
                      {record.classes?.length > 0 ? (
                        <span>
                          {record.classes
                            .map((bBlass) => bBlass.name)
                            .join(", ")}
                        </span>
                      ) : (
                        <span className="italic"> None</span>
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {visibleRecords?.length <= 0 && <p>There are no records.</p>}
        </div>
      </div>
      <NavLink className={`flex pt-4`} onClick={() => setAddRecordModal(true)}>
        <PrimaryButton text={`Add record`} />
      </NavLink>

      <Modal show={addRecordModal}>
        <div className="flex flex-col space-y-4 items-center">
          <Formik
            initialValues={{
              date: "",
            }}
            validate={validateRecord}
            onSubmit={handleAdd}
          >
            <Form className="h-full flex flex-col justify-between items-center">
              <div className="flex flex-col items-center mb-8 space-y-4">
                <h1 className="text-3xl font-bold">New record</h1>
                <div className="flex flex-col space-y-4 w-full">
                  <div className="w-full flex flex-col">
                    <Field
                      type="date"
                      name="date"
                      className="input"
                      placeholder="Date"
                    />
                    <span className="text-red-500 text-xs pl-2">
                      <ErrorMessage name="date" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-y-2 flex-col w-full">
                <PrimaryButton type="submit" text="Add" />
                <SecondaryButton handleOnClick={() => setAddRecordModal(false)}>
                  Cancel
                </SecondaryButton>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default RecordsComponent;
