import Container from './../components/tag-comps/Container';
import GridRows from './../components/tag-comps/GridRows';

const HomePage = () => {
    return (
        <>
            {/* hero section */}
            <section className="homepage-hero-section w-full bg-gray-100">
                <Container className={"h-full"}>
                    <GridRows className={"md:grid-cols-2 h-full"}>

                        <div className="content-box text-center md:text-left w-full h-full flex items-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-4">Learn your academic <br /> subjects in a <br /> unique way</h1>
                        </div>

                    </GridRows>
                </Container>
            </section>
        </>
    );
};

export default HomePage;