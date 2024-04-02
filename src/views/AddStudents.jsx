import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import List from "../components/List";
import InteractiveListItem from "../components/InteractiveListItem";
import PrimaryButton from "../components/PrimaryButton";

const AddStudents = () => {
  const [bClass, setBClass] = useState({});
  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const navigate = useNavigate();
  const { classId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/classes/${classId}`)
      .then((response) => {
        setBClass(response.data);
        let bClassStudentsIds = response.data.students.map((student) => {
          return student._id;
        });

        axios
          .get("http://localhost:3000/students")
          .then((res) => {
            let bClassStudents = res.data.filter((student) => {
              return !bClassStudentsIds.includes(student._id);
            });
            setStudents(bClassStudents);
            setVisibleStudents(bClassStudents);
            setDataLoaded(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  const handleAddStudents = () => {
    axios
      .post(`http://localhost:3000/classes/${classId}/add-student`, {
        students: selectedStudents,
      })
      .then(() => {
        navigate(`/classes/${classId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      </InteractiveListItem>
    );
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      <Header headingText={bClass.name} />
      <h1 className="mx-auto mt-7 text-3xl font-bold text-center">
        Add Students
      </h1>
      <SearchBar
        searchableData={students}
        setResultMethod={setVisibleStudents}
        searchingParams={["firstName", "lastName", "age"]}
      />
      <div className="h-full overflow-y-auto flex flex-col">
        <List data={formattedStudents} />
      </div>
      <NavLink
        className={`${selectedStudents.length <= 0 ? "hidden" : "flex"} pt-4`}
        onClick={handleAddStudents}
      >
        <PrimaryButton text={`Add ${selectedStudents.length} student(s)`} />
      </NavLink>
    </div>
  );
};

export default AddStudents;
