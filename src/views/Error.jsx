import SecondaryButton from "../components/SecondaryButton";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-5">
      <h1 className="text-4xl font-bold text-center">404 - Not Found</h1>
      <SecondaryButton handleOnClick={() => navigate("/")} to="/">
        Go back to Home
      </SecondaryButton>
    </div>
  );
};

export default Error;
