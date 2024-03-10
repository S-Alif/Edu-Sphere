import Container from "./Container";

// common section for the app
const Section = ({ children, className, id, padding }) => {

  const classes = className || ""
  const paddings = padding || "py-32"

  return (
    <section className={`${classes} ${paddings} overflow-x-hidden`} id={id ? id : undefined}>
      <Container>
        {children}
      </Container>
    </section>
  );
};

export default Section;