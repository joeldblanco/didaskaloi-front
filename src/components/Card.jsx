import styles from "./Card.module.css";

const Card = ({ title, description }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
