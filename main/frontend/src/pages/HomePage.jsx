import { NavLink } from 'react-router-dom';
import Container from './../components/tag-comps/Container';
import GridRows from './../components/tag-comps/GridRows';

// header img
import headerImg from "../assets/imgs/header-img.png"

const HomePage = () => {
    return (
        <>
            {/* hero section */}
            <section className="homepage-hero-section w-full bg-gray-100 overflow-hidden">
                <Container className={"h-full"}>
                    <GridRows className={"md:grid-cols-2 h-full"}>

                        {/* text-content */}
                        <div className="content-box text-center md:text-left w-full h-full flex flex-col justify-center items-start">
                            <h1 className="text-2xl sm:text-3xl lg:text-7xl font-bold">Learn academic <br /> subjects in a <br /> unique way</h1>
                            <p className='pt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptas illum autem eligendi. Neque eveniet, incidunt aperiam sed reprehenderit animi corporis placeat laboriosam sint quidem veniam, ex laudantium aliquid voluptas! Suscipit repellat dicta, quod optio iure quidem laboriosam aperiam eius quis quam reiciendis non rerum quaerat architecto maxime tempore, eaque sapiente repellendus facilis!</p>

                            <NavLink to={"#courses"} className={"btn md:btn-lg bg-emerald-500 text-white mt-8 hover:bg-emerald-700 shadow-md"}>See course</NavLink>
                        </div>

                        {/* image */}
                        <div className="image-box w-full h-full">
                            <img src={headerImg} alt="Student image" className='w-full h-full block lg:ml-16' />
                        </div>

                    </GridRows>
                </Container>
            </section>
        </>
    );
};

export default HomePage;