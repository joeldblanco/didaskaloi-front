const InteractiveListItem = ({
  id,
  selectedItems,
  setSelectedItems,
  children,
}) => {
  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <label
      htmlFor={id}
      key={id}
      className={`border-b border-[var(--gray-2)] text-gray-700 p-4 w-full text-sm flex flex-col ${
        selectedItems.includes(id) ? "bg-gray-200" : ""
      }`}
    >
      <input
        type="checkbox"
        className="hidden"
        onChange={() => handleCheckboxChange(id)}
        id={id}
        checked={selectedItems.includes(id)}
      />
      {children}
    </label>
  );
};

export default InteractiveListItem;
