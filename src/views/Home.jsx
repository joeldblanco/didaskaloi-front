import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import ListItem from "../components/ListItem";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [formattedClasses, setFormattedClasses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/classes`)
      .then((response) => {
        setClasses(response.data);
        setVisibleClasses(response.data);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const formattedClasses = visibleClasses.map((bClass) => {
      return (
        <NavLink
          to={`/classes/${bClass._id}`}
          className="w-full"
          key={bClass._id}
        >
          <ListItem key={bClass._id}>
            <p className="font-bold capitalize">{bClass.name}</p>
            <p className="italic">Day: {bClass.day}</p>
            <p className="italic">Time: {bClass.time}</p>
            <p className="italic">Students: {bClass.students.length}</p>
          </ListItem>
        </NavLink>
      );
    });

    setFormattedClasses(formattedClasses);
  }, [visibleClasses]);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col items-center w-full space-y-6 pb-4">
        <h1 className="mx-auto mt-7 text-3xl font-bold text-center">Home</h1>
        <div className="w-full flex space-x-4">
          <SearchBar
            searchableData={classes}
            setResultMethod={setVisibleClasses}
            searchingParams={["name"]}
          />
        </div>
      </div>
      <div className="overflow-y-auto h-full flex flex-col">
        <List data={formattedClasses} />
      </div>
      <NavLink className="flex pt-4" to={"/classes/register"}>
        <PrimaryButton text="Register class" />
      </NavLink>
    </div>
  );
};

export default Home;
