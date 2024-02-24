import Container from './tag-comps/Container';

const PageHeader = ({ pageTitle, pageText, headerBg }) => {

  const styles = {
    height: "50vh",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))${headerBg && ", url(" + headerBg + ")"}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }

  return (
    <section className="page-header" style={styles}>
      <Container className={"h-full"}>
        <div className="py-5 h-full text-white flex flex-col justify-center">
          <h1 className=' text-3xl lg:text-6xl font-bold'>{pageTitle}</h1>
          <p className='pt-4'>{pageText}</p>
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;