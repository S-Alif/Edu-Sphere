import Container from './tag-comps/Container';

const PageHeader = ({pageTitle, pageText}) => {
  return (
    <section className="page-header">
      <Container>
        <div className="py-5">
          <h1 className='text-3xl font-bold'>{pageTitle}</h1>
          <p className='pt-4'>{pageText}</p>
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;