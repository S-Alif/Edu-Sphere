import { NavLink } from 'react-router-dom';
import Container from './../components/tag-comps/Container';
import GridRows from './../components/tag-comps/GridRows';

// header img
import headerImg from "../assets/imgs/header-img.png"

const HomePage = () => {
    return (
        <>
            {/* hero section */}
            <section className="lg:homepage-hero-section w-full h-auto bg-gray-100 overflow-hidden">
                <Container className={"h-full"}>
                    <GridRows className={"lg:grid-cols-2 h-full w-full"}>

                        {/* text-content */}
                        <div className="content-box text-center lg:text-left w-full h-full flex flex-col justify-center items-start">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold w-full pt-8 lg:pt-0">Learn academic subjects in a unique way</h1>
                            <p className='pt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptas illum autem eligendi. Neque eveniet, incidunt aperiam sed reprehenderit animi corporis placeat laboriosam sint quidem veniam, ex laudantium aliquid voluptas! Suscipit repellat dicta, quod optio iure quidem laboriosam aperiam eius quis quam reiciendis non rerum quaerat architecto maxime tempore, eaque sapiente repellendus facilis!</p>

                            <div className="w-full text-center lg:text-left">
                                <NavLink to={"#courses"} className={"btn md:btn-lg bg-emerald-500 text-white mt-8 hover:bg-emerald-700 shadow-md"}>See course</NavLink>
                            </div>
                        </div>

                        {/* image */}
                        <div className="image-box w-full h-full">
                            <img src={headerImg} alt="Student image" className='w-auto h-full block lg:ml-16' />
                        </div>

                    </GridRows>
                </Container>
            </section>
        </>
    );
};

export default HomePage;