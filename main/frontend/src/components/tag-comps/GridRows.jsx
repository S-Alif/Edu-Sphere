// grid rows
const GridRows = ({ children, className }) => {

  const classes = className || ""

  return (
    <div className={`w-full grid grid-cols-1 gap-9 ${classes}`}>
      {children}
    </div>
  );
};

export default GridRows;