import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = ({ headingText = "", prevPage = -1 }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center text-gray-500">
      <div onClick={() => navigate(prevPage)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div>
        <p>{headingText}</p>
      </div>
    </div>
  );
};

export default Header;
