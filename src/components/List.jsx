const List = ({ data = [] }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col space-y-6 overflow-y-scroll h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full w-full">
          {data.length > 0 && (
            <div className="w-full h-full justify-start items-start">
              {data.map((elem) => elem)}
            </div>
          )}
          {data.length <= 0 && (
            <p className="italic text-gray-600">There are no items.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
