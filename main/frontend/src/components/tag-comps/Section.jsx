import Container from "./Container";

// common section for the app
const Section = ({children, className, id}) => {

  const classes = className || ""

  return (
    <section className={`${classes} py-24 overflow-x-hidden`} id={id ? id : undefined}>
      <Container>
        {children}
      </Container>
    </section>
  );
};

export default Section;