import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import List from "../components/List";
import InteractiveListItem from "../components/InteractiveListItem";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Modal from "../components/Modal";

const Record = () => {
  const { assistanceId } = useParams();
  const [bClass, setBClass] = useState({});
  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [assistanceDate, setAssistanceDate] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [removeStudentModal, setRemoveStudentModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/assistances/${assistanceId}`)
      .then((res) => {
        setBClass(res.data.class);
        setStudents(res.data.students);
        setVisibleStudents(res.data.students);
        setAssistanceDate(res.data.date);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dataLoaded) {
    return <p>Loading...</p>;
  }

  const handleRemoveStudents = () => {
    axios
      .delete(
        `http://localhost:3000/assistances/${assistanceId}/remove-student`,
        {
          data: { students: selectedStudents },
        }
      )
      .then((res) => {
        setStudents(
          students.filter((student) => !selectedStudents.includes(student._id))
        );
        setVisibleStudents(
          visibleStudents.filter(
            (student) => !selectedStudents.includes(student._id)
          )
        );
        setSelectedStudents([]);
        setRemoveStudentModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formattedStudents = visibleStudents.map((student) => {
    return (
      <InteractiveListItem
        selectedItems={selectedStudents}
        setSelectedItems={setSelectedStudents}
        key={student._id}
        id={student._id}
      >
        <p className="font-bold capitalize">
          {student.firstName} {student.lastName}
        </p>
        <p className="italic">Age: {student.age}</p>
        <p className="capitalize italic">Gender: {student.gender}</p>
      </InteractiveListItem>
    );
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      <Header headingText={bClass.name} />
      <h1 className="mx-auto mt-7 text-3xl font-bold text-center">
        Assistance
      </h1>
      <p className="w-full mx-auto text-center italic text-gray-600">
        {assistanceDate}
      </p>
      <SearchBar
        searchableData={students}
        setResultMethod={setVisibleStudents}
        searchingParams={["firstName", "lastName", "age"]}
      />
      <div className="h-full overflow-y-auto flex flex-col">
        <List data={formattedStudents} />
      </div>
      <NavLink
        className={`${
          selectedStudents.length > 0 ? "hidden" : "flex"
        } flex pt-4`}
        to={`/classes/assistances/${assistanceId}/register`}
      >
        <PrimaryButton text={`Add student(s)`} />
      </NavLink>
      <NavLink
        className={`${
          selectedStudents.length <= 0 ? "hidden" : "flex"
        } flex pt-4`}
        onClick={() => setRemoveStudentModal(true)}
      >
        <PrimaryButton
          color="var(--danger-color)"
          text={`Remove ${selectedStudents.length} student(s)`}
        />
      </NavLink>

      <Modal show={removeStudentModal}>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex flex-col items-center mb-8 space-y-4">
            <h1 className="text-3xl font-bold">Are you sure?</h1>
            <p className="text-gray-600 text-center">
              You are about to remove {selectedStudents.length} student(s) from
              this class. This action is irreversbile.{" "}
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
              handleOnClick={() => setRemoveStudentModal(false)}
            >
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Record;
