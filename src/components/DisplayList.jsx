const DisplayList = ({ list }) => {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default DisplayList;
