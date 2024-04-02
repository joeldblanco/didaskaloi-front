import BarGraph from "../components/BarGraph";
import Header from "../components/Header";
import SwitchComponent from "../components/SwitchComponent";
import { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [switchState, setSwitchState] = useState(1);
  const switchOptions = ["General", "Per Class"];

  const [switchState2, setSwitchState2] = useState(1);
  const switchOptions2 = ["Male", "Female"];

  const [report, setReport] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reports/general")
      .then((res) => {
        setReport(res.data);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!dataLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Header />
      <h1 className="mx-auto mt-7 text-3xl font-bold text-center">
        {switchOptions[switchState - 1]}
      </h1>
      <SwitchComponent
        switchState={switchState}
        setSwitchState={setSwitchState}
        options={switchOptions}
      />
      {switchState === 1 ? (
        <div className="h-full overflow-y-auto flex flex-col space-y-12">
          <div className="h-full p-2">
            <h3 className="mb-2 text-gray-600 font-bold">Gender:</h3>
            <BarGraph
              data={[
                {
                  label: "Male",
                  value: report.maleStudents,
                },
                {
                  label: "Female",
                  value: report.femaleStudents,
                },
              ]}
            />
          </div>
          <div className="h-full p-2">
            <h3 className="mb-2 text-gray-600 font-bold">Age (years):</h3>
            <BarGraph data={report.ageGroups} />
          </div>
          <div className="h-full p-2">
            <h3 className="mb-2 text-gray-600 font-bold">
              Age (years) / Gender:
            </h3>
            <SwitchComponent
              switchState={switchState2}
              setSwitchState={setSwitchState2}
              options={switchOptions2}
            />
            {switchState2 === 1 ? (
              <BarGraph color="var(--info-color)" data={report.maleAgeGroups} />
            ) : (
              <BarGraph
                color="var(--danger-color)"
                data={report.femaleAgeGroups}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">Per Class</div>
      )}
    </div>
  );
};

export default Reports;
