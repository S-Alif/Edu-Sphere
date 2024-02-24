
// common section for the app
const Section = ({children, className}) => {

  const classes = className || ""

  return (
    <section className={`${classes} py-24 overflow-x-hidden`}>
      {children}
    </section>
  );
};

export default Section;