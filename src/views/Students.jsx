import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import InteractiveListItem from "../components/InteractiveListItem";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        setStudents(response.data);
        setVisibleStudents(response.data);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteStudents = () => {
    setDataLoaded(false);
    axios
      .delete("http://localhost:3000/students", {
        data: { studentsIds: selectedStudents },
      })
      .then((res) => {
        setStudents(res.data);
        setVisibleStudents(res.data);
        setSelectedStudents([]);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

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
    <div className="h-full flex flex-col space-y-4">
      <Header />
      <h1 className="mx-auto mt-7 text-3xl font-bold text-center">Students</h1>
      <SearchBar
        searchableData={students}
        setResultMethod={setVisibleStudents}
        searchingParams={["firstName", "lastName", "age"]}
      />
      <div className="h-full overflow-y-auto flex flex-col">
        <List data={formattedStudents} />
      </div>
      <div className="flex w-full">
        <NavLink
          className={`${
            selectedStudents.length != 1 ? "hidden" : "flex"
          } pt-4 mr-1 w-full`}
          to={`/students/${selectedStudents[0]}`}
        >
          <PrimaryButton color="var(--info-color)" text={`Edit student`} />
        </NavLink>
        <NavLink
          className={`${
            selectedStudents.length <= 0 ? "hidden" : "flex"
          } pt-4 w-full`}
          onClick={handleDeleteStudents}
        >
          <PrimaryButton
            color="var(--danger-color)"
            text={`Delete ${selectedStudents.length} student(s)`}
          />
        </NavLink>
      </div>
      <NavLink
        className={`${selectedStudents.length > 0 ? "hidden" : "flex"} pt-4`}
        to={`/students/register`}
      >
        <PrimaryButton text={`Register student(s)`} />
      </NavLink>
    </div>
  );
};

export default Students;
