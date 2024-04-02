import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import InteractiveListItem from "./InteractiveListItem";
import InteractiveList from "./InteractiveList";

const StudentsComponent = ({ data = [], setData, bClass = false }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/students`, {
        data: { studentsIds: selectedStudents },
      })
      .then((res) => {
        axios.get("http://localhost:3000/students").then((response) => {
          setData(response.data);
          setSelectedStudents([]);
          setDeleteModal(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddStudents = () => {
    axios
      .post(`http://localhost:3000/classes/${bClass._id}/add-student`, {
        students: selectedStudents,
      })
      .then((res) => {
        navigate(`/classes/${bClass._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center w-full space-y-6 pb-4">
        <div className="w-full flex space-x-4">
          {!bClass && (
            <div
              className={`${
                selectedStudents.length > 0 ? "flex" : "hidden"
              } space-x-4 w-1/6 justify-between items-center`}
            >
              <FontAwesomeIcon
                className="text-green-600 text-md"
                icon={faPlusSquare}
                onClick={() => setAddStudentModal(true)}
              />
              <FontAwesomeIcon
                className="text-red-500 text-md"
                icon={faTrash}
                onClick={() => setDeleteModal(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* <NavLink
        className={`${selectedStudents <= 0 ? "hidden" : "flex"} pt-4`}
        to={"/"}
      >
        <PrimaryButton text={buttonText} />
      </NavLink> */}

      {/* <div className="flex flex-col space-y-6 overflow-y-scroll h-full">
        <div className="flex flex-col items-center">
          {data?.length > 0 && (
            <div className="w-full">
              {data.map((student) => (
                <InteractiveListItem
                  key={student._id}
                  item={student}
                  selectedItems={selectedStudents}
                  setSelectedItems={setSelectedStudents}
                >
                  <div>
                    <p className="font-bold">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="italic">Age: {student.age}</p>
                    <p className="capitalize italic">
                      Gender: {student.gender}
                    </p>
                    <p className="capitalize">
                      Classes:
                      {student.classes?.length > 0 ? (
                        <span>
                          {student.classes
                            .map((bBlass) => bBlass.name)
                            .join(", ")}
                        </span>
                      ) : (
                        <span className="italic"> None</span>
                      )}
                    </p>
                  </div>
                </InteractiveListItem>
              ))}
            </div>
          )}
          {data?.length <= 0 && <p>There are no students.</p>}
        </div>
      </div> */}

      {/* {!bClass && (
        <NavLink
          className={`${selectedStudents.length > 0 ? "hidden" : "flex"} pt-4`}
          to={`/students/register`}
        >
          <PrimaryButton
            className="absolute bottom-0"
            text="Register student"
          />
        </NavLink>
      )}
      {bClass && !addStudents && (
        <NavLink
          className={`${selectedStudents.length > 0 ? "hidden" : "flex"} pt-4`}
          to={`/classes/${bClass._id}/add-students`}
        >
          <PrimaryButton text={`Add student(s)`} />
        </NavLink>
      )}

      {bClass && addStudents && (
        <NavLink
          className={`${selectedStudents.length == 0 ? "hidden" : "flex"} pt-4`}
          onClick={() => setAddStudentModal(true)}
        >
          <PrimaryButton text={`Add ${selectedStudents.length} student(s)`} />
        </NavLink>
      )} */}
      <Modal show={deleteModal}>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex flex-col items-center mb-8 space-y-4">
            <h1 className="text-3xl font-bold">Are you sure?</h1>
            <p className="text-gray-600  text-center">
              You are about to delete {selectedStudents.length} student(s). This
              action is irreversbile.
              <span className="italic">Be cautious!</span>
            </p>
          </div>
          <div className="flex space-y-2 flex-col w-full">
            <PrimaryButton text="Delete" handleOnClick={handleDelete} />
            <SecondaryButton handleOnClick={() => setDeleteModal(false)}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>
      <Modal show={addStudentModal}>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex flex-col items-center mb-8 space-y-4">
            <h1 className="text-3xl font-bold">Are you sure?</h1>
            <p className="text-gray-600 text-center">
              Are you sure you want to add {selectedStudents.length} student(s)
              to this class?
            </p>
          </div>
          <div className="flex space-y-2 flex-col w-full">
            <PrimaryButton text="Add" handleOnClick={handleAddStudents} />
            <SecondaryButton handleOnClick={() => setAddStudentModal(false)}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsComponent;
