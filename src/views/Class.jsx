import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import SwitchComponent from "../components/SwitchComponent";
import RecordsComponent from "../components/RecordsComponent";
import SearchBar from "../components/SearchBar";
import InteractiveListItem from "../components/InteractiveListItem";
import List from "../components/List";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import Modal from "../components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateRecord } from "../utils/validate";
import SecondaryButton from "../components/SecondaryButton";

const Class = () => {
  const { classId } = useParams();

  const [bClass, setBClass] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [switchState, setSwitchState] = useState(1);

  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);

  const [addRecordModal, setAddRecordModal] = useState(false);
  const [deleteRecordModal, setDeleteRecordModal] = useState(false);
  const [deleteStudentModal, setDeleteStudentModal] = useState(false);

  const switchOptions = ["Students", "Assistances"];

  useEffect(() => {
    axios
      .get(`http://localhost:3000/classes/${classId}`)
      .then((response) => {
        setBClass(response.data);
        setStudents(response.data.students);
        setVisibleStudents(response.data.students);
        setRecords(response.data.formattedRecords);
        setVisibleRecords(response.data.formattedRecords);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  const handleRemoveStudents = () => {
    setDataLoaded(false);
    axios
      .delete(`http://localhost:3000/classes/${bClass._id}/remove-student`, {
        data: { students: selectedStudents },
      })
      .then((res) => {
        setStudents(res.data);
        setVisibleStudents(res.data);
        setSelectedStudents([]);
        setDeleteStudentModal(false);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddRecord = (date, { resetForm }) => {
    setDataLoaded(false);
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
            setDataLoaded(true);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveRecords = () => {
    setDataLoaded(false);
    axios
      .delete(`http://localhost:3000/assistances`, {
        data: { assistances: selectedRecords },
      })
      .then((res) => {
        setRecords(res.data);
        setVisibleRecords(res.data);
        setSelectedRecords([]);

        axios
          .get(`http://localhost:3000/classes/${classId}`)
          .then((response) => {
            setBClass(response.data);
            setStudents(response.data.students);
            setVisibleStudents(response.data.students);
          })
          .catch((err) => {
            console.log(err);
          });

        setDeleteRecordModal(false);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formattedRecords = visibleRecords.map((record) => {
    return (
      <InteractiveListItem
        selectedItems={selectedRecords}
        setSelectedItems={setSelectedRecords}
        key={record._id}
        id={record._id}
      >
        <p className="font-bold">{record.date}</p>
        <p className="italic">
          Students: {record.students > 0 ? record.students : "0"}
        </p>
      </InteractiveListItem>
    );
  });

  const formattedStudents = visibleStudents.map((student) => {
    return (
      <InteractiveListItem
        key={student._id}
        id={student._id}
        selectedItems={selectedStudents}
        setSelectedItems={setSelectedStudents}
      >
        <p className="font-bold capitalize">
          {student.firstName} {student.lastName}
        </p>
        <p className="italic">Age: {student.age}</p>
        <p className="capitalize italic">Gender: {student.gender}</p>
        <p className="italic">Assistances: {student.records.length}</p>
      </InteractiveListItem>
    );
  });

  return (
    <div className="h-full flex flex-col">
      <Header headingText={bClass ? bClass.name : ""} />
      <h1 className="mx-auto mt-7 text-3xl font-bold text-center">
        {switchOptions[switchState - 1]}
      </h1>
      <SwitchComponent
        switchState={switchState}
        setSwitchState={setSwitchState}
        options={switchOptions}
      />
      {switchState === 1 ? (
        <div className="h-full flex flex-col">
          <SearchBar
            searchableData={students}
            setResultMethod={setVisibleStudents}
            searchingParams={["firstName", "lastName", "age"]}
          />
          <List data={formattedStudents} selectedItems={selectedStudents} />
          <NavLink
            className={`${
              selectedStudents.length <= 0 ? "hidden" : "flex"
            } pt-4`}
            onClick={() => setDeleteStudentModal(true)}
          >
            <PrimaryButton
              color="var(--danger-color)"
              text={`Remove ${selectedStudents.length} student(s)`}
            />
          </NavLink>
          <NavLink
            className={`${
              selectedStudents.length > 0 ? "hidden" : "flex"
            } pt-4`}
            to={`/classes/${classId}/add-student`}
          >
            <PrimaryButton text={`Add ${selectedStudents} student(s)`} />
          </NavLink>

          <Modal show={deleteStudentModal}>
            <div className="flex flex-col space-y-4 items-center">
              <div className="flex flex-col items-center mb-8 space-y-4">
                <h1 className="text-3xl font-bold">Are you sure?</h1>
                <p className="text-gray-600">
                  You are about to remove {selectedStudents.length} student(s).
                  This action is irreversbile.{" "}
                  <span className="italic">Be cautious!</span>
                </p>
              </div>
              <div className="flex space-y-2 flex-col w-full">
                <PrimaryButton
                  text="Delete"
                  color="var(--danger-color)"
                  handleOnClick={handleRemoveStudents}
                />
                <SecondaryButton
                  color="var(--danger-color)"
                  handleOnClick={() => setDeleteStudentModal(false)}
                >
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <SearchBar
            searchableData={records}
            setResultMethod={setVisibleRecords}
            searchingParams={["date"]}
          />
          <List data={formattedRecords} />
          <div className="flex justify-around">
            <NavLink
              className={`${
                selectedRecords.length != 1 ? "hidden" : "flex"
              } pt-4 w-full mr-4`}
              to={`/classes/assistances/${selectedRecords[0]}`}
            >
              <PrimaryButton color="var(--info-color)" text="Edit" />
            </NavLink>
            <NavLink
              className={`${
                selectedRecords.length <= 0 ? "hidden" : "flex"
              } pt-4 w-full`}
              onClick={() => setDeleteRecordModal(true)}
            >
              <PrimaryButton color="var(--danger-color)" text="Remove" />
            </NavLink>
          </div>
          <NavLink
            className={`${selectedRecords.length > 0 ? "hidden" : "flex"} pt-4`}
            onClick={() => setAddRecordModal(true)}
          >
            <PrimaryButton text={`Add record`} />
          </NavLink>

          <Modal show={addRecordModal}>
            <div className="flex flex-col space-y-4 items-center">
              <Formik
                initialValues={{
                  date: "",
                }}
                validate={validateRecord}
                onSubmit={handleAddRecord}
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
                    <SecondaryButton
                      handleOnClick={() => setAddRecordModal(false)}
                    >
                      Cancel
                    </SecondaryButton>
                  </div>
                </Form>
              </Formik>
            </div>
          </Modal>

          <Modal show={deleteRecordModal}>
            <div className="flex flex-col space-y-4 items-center">
              <div className="flex flex-col items-center mb-8 space-y-4">
                <h1 className="text-3xl font-bold">Are you sure?</h1>
                <p className="text-gray-600">
                  You are about to delete {selectedRecords.length} class(es).
                  This action is irreversbile.{" "}
                  <span className="italic">Be cautious!</span>
                </p>
              </div>
              <div className="flex space-y-2 flex-col w-full">
                <PrimaryButton
                  text="Delete"
                  color="var(--danger-color)"
                  handleOnClick={handleRemoveRecords}
                />
                <SecondaryButton
                  color="var(--danger-color)"
                  handleOnClick={() => setDeleteRecordModal(false)}
                >
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Class;
