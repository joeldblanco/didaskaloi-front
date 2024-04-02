import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const ClassesComponent = () => {
  const [classes, setClasses] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/classes`).then((response) => {
      setClasses(response.data);
      setVisibleClasses(response.data);
    });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/classes`, {
        data: { classes: selectedClasses },
      })
      .then((res) => {
        axios.get("http://localhost:3000/classes").then((response) => {
          setClasses(response.data);
          setVisibleClasses(response.data);
          setSelectedClasses([]);
          setDeleteModal(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Header prevPage={"/"} />
      <div className="flex flex-col items-center w-full space-y-6 pb-4">
        <h1 className="mx-auto mt-7 text-3xl font-bold text-center">Classes</h1>
        <div className="w-full flex space-x-4">
          <SearchBar
            searchableData={classes}
            setResultMethod={setVisibleClasses}
            searchingParams={["name"]}
          />
          <div
            className={`${
              selectedClasses.length > 0 ? "flex" : "hidden"
            } space-x-4 w-1/6 justify-between items-center`}
          >
            <NavLink to={"/"}>
              <FontAwesomeIcon
                className="text-green-600 text-md"
                icon={faPlusSquare}
              />
            </NavLink>
            <FontAwesomeIcon
              className="text-red-500 text-md"
              icon={faTrash}
              onClick={() => setDeleteModal(true)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-6 overflow-y-scroll h-full">
        <div className="flex flex-col items-center">
          {visibleClasses?.length > 0 && (
            <div className="w-full">
              {visibleClasses.map((bClass) => (
                <NavLink
                  key={bClass._id}
                  className="border-b border-[var(--gray-2)] text-gray-700 py-4 w-full text-sm flex space-x-4"
                  to={`/classes/${bClass._id}`}
                >
                  <div>
                    <p className="font-bold">{bClass.name}</p>
                    <p className="italic">Day: {bClass.day}</p>
                    <p className="italic">Time: {bClass.time}</p>
                    <p className="capitalize italic">
                      Students: {bClass.students.length}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
          {visibleClasses?.length <= 0 && <p>There are no classes.</p>}
        </div>
      </div>
      <NavLink
        className={`${selectedClasses.length > 0 ? "hidden" : "flex"} pt-4`}
        to={`/classes/register`}
      >
        <PrimaryButton text="Register class" />
      </NavLink>

      <Modal show={deleteModal}>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex flex-col items-center mb-8 space-y-4">
            <h1 className="text-3xl font-bold">Are you sure?</h1>
            <p className="text-gray-600">
              You are about to delete {selectedClasses.length} class(es). This
              action is irreversbile.{" "}
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
    </div>
  );
};

export default ClassesComponent;
