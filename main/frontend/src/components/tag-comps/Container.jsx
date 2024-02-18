// container component for unified design
const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-3">
      {children}
    </div>
  );
};

export default Container;