// grid rows
const GridRows = ({ children, className }) => {

  const classes = className || ""

  return (
    <div className={`w-full grid grid-cols-1 ${classes}`}>
      {children}
    </div>
  );
};

export default GridRows;