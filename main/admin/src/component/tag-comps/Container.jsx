// container component for unified design
const Container = ({ children, className }) => {

  const classes = className || ""

  return (
    <div className={`container mx-auto px-3 lg:px-9 ${classes}`}>
      {children}
    </div>
  );
};

export default Container;