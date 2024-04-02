import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Classes from "./views/Classes";
import Class from "./views/Class";
import RegisterClass from "./views/RegisterClass";
import Students from "./views/Students";
import RegisterStudent from "./views/RegisterStudent";
import Reports from "./views/Reports";

import Navbar from "./components/Navbar";
import Error from "./views/Error";

import AddStudents from "./views/AddStudents";
import Record from "./views/Record";
import RegisterAssistance from "./views/RegisterAssistance";
import EditStudent from "./views/EditStudent";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes">
            <Route path="" element={<Classes />} />
            <Route path=":classId" element={<Class />} />
            <Route path=":classId/add-student" element={<AddStudents />} />
            <Route path="register" element={<RegisterClass />} />
            <Route path="assistances">
              <Route path=":assistanceId" element={<Record />} />
              <Route
                path=":assistanceId/register"
                element={<RegisterAssistance />}
              />
            </Route>
          </Route>
          <Route path="/students">
            <Route path="" element={<Students />} />
            <Route path=":studentId" element={<EditStudent />} />
            <Route path="register" element={<RegisterStudent />} />
          </Route>
          <Route path="/reports">
            <Route path="" element={<Reports />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Navbar />
    </BrowserRouter>
  );
};

export default App;
