import Header from "../components/Header";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import InteractiveListItem from "../components/InteractiveListItem";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Modal from "../components/Modal";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [deleteClassModal, setDeleteClassModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/classes")
      .then((response) => {
        setClasses(response.data);
        setVisibleClasses(response.data);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  const handleRemoveClasses = () => {
    axios
      .delete("http://localhost:3000/classes", {
        data: { classes: selectedClasses },
      })
      .then((response) => {
        setClasses(
          classes.filter((bClass) => !selectedClasses.includes(bClass._id))
        );
        setVisibleClasses(
          visibleClasses.filter(
            (bClass) => !selectedClasses.includes(bClass._id)
          )
        );
        setSelectedClasses([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formattedClasses = visibleClasses.map((bClass) => {
    return (
      <InteractiveListItem
        key={bClass._id}
        id={bClass._id}
        selectedItems={selectedClasses}
        setSelectedItems={setSelectedClasses}
      >
        <p className="font-bold">{bClass.name}</p>
        <p className="italic">Day: {bClass.day}</p>
        <p className="italic">Time: {bClass.time}</p>
        <p className="capitalize italic">Students: {bClass.students.length}</p>
      </InteractiveListItem>
    );
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      <Header />
      <h1 className="mx-auto mt-7 text-3xl font-bold text-center">Classes</h1>
      <SearchBar
        searchableData={classes}
        setResultMethod={setVisibleClasses}
        searchingParams={["name"]}
      />
      <div className="h-full flex flex-col overflow-y-auto">
        <List data={formattedClasses} />
      </div>
      <div className="flex">
        <NavLink
          className={`${
            selectedClasses.length != 1 ? "hidden" : "flex"
          } w-full mr-4 pt-4`}
          to={`/classes/${selectedClasses[0]}`}
        >
          <PrimaryButton color="var(--info-color)" text={`Edit class`} />
        </NavLink>
        <NavLink
          className={`${
            selectedClasses.length <= 0 ? "hidden" : "flex"
          } w-full pt-4`}
          onClick={() => setDeleteClassModal(true)}
        >
          <PrimaryButton
            color="var(--danger-color)"
            text={`Delete ${selectedClasses.length} class(es)`}
          />
        </NavLink>
      </div>
      <NavLink
        className={`${selectedClasses.length > 0 ? "hidden" : "flex"} pt-4`}
        to={`/classes/register`}
      >
        <PrimaryButton text={`Register class`} />
      </NavLink>

      <Modal show={deleteClassModal}>
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
            <PrimaryButton
              text="Delete"
              color="var(--danger-color)"
              handleOnClick={handleRemoveClasses}
            />
            <SecondaryButton
              color="var(--danger-color)"
              handleOnClick={() => setDeleteClassModal(false)}
            >
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Classes;
