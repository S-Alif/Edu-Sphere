// grid rows
const GridRows = ({ children, className, gap }) => {

  const classes = className || ""
  const gaps = gap || "gap-9"

  return (
    <div className={`w-full grid grid-cols-1 ${gaps} ${classes}`}>
      {children}
    </div>
  );
};

export default GridRows;