const InteractiveList = ({ data = [] }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col space-y-6 overflow-y-scroll h-full">
        <div className="flex flex-col items-center">
          {data.length > 0 && (
            <div className="w-full">{data.map((elem) => elem)}</div>
          )}
          {data.length <= 0 && <p>There are no items.</p>}
        </div>
      </div>
    </div>
  );
};

export default InteractiveList;
