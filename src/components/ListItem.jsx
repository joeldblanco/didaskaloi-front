const ListItem = ({ children }) => {
  return (
    <div
      className={`border-b border-[var(--gray-2)] text-gray-700 p-4 w-full text-sm flex flex-col`}
    >
      {children}
    </div>
  );
};

export default ListItem;
