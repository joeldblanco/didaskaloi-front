const SwitchComponent = ({ options = [], switchState, setSwitchState }) => {
  return (
    <div className="switch">
      <div className="bg-[--primary-color] w-full rounded-full p-1 h-12 relative flex items-center">
        <div className="flex w-full relative z-10 p-1 items-center">
          <p
            className={
              `w-1/2 text-center` +
              (switchState === 2
                ? ` text-white`
                : ` text-[var(--primary-color)]`)
            }
            onClick={() => setSwitchState(1)}
          >
            {options[0]}
          </p>
          <p
            className={
              `w-1/2 text-center` +
              (switchState === 1
                ? ` text-white`
                : ` text-[var(--primary-color)]`)
            }
            onClick={() => setSwitchState(2)}
          >
            {options[1]}
          </p>
        </div>
        <div
          className={
            `bg-white rounded-full w-1/2 absolute z-0 top-1 h-[calc(100%-0.5rem)]` +
            (switchState == 1 ? ` left-1` : ` right-1`)
          }
        ></div>
      </div>
    </div>
  );
};

export default SwitchComponent;
