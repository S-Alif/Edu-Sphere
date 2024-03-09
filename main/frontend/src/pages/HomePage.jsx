import { NavLink } from 'react-router-dom';
import Container from './../components/tag-comps/Container';
import GridRows from './../components/tag-comps/GridRows';

// header img
import headerImg from "../assets/imgs/header-img.png"
import Section from '../components/tag-comps/Section';

// icons
import { LiaBookSolid } from "react-icons/lia";
import { FaChalkboardTeacher, FaHeadset } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import ContactSection from '../components/ContactSection';

const HomePage = () => {
    return (
        <>
            {/* hero section */}
            <section className="lg:homepage-hero-section w-full h-auto bg-gray-100 dark:bg-slate-800 overflow-hidden" id='#home'>
                <Container className={"h-full"}>
                    <GridRows className={"lg:grid-cols-2 h-full w-full"}>

                        {/* text-content */}
                        <div className="content-box text-center lg:text-left w-full h-full flex flex-col justify-center items-start">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold w-full pt-8 lg:pt-0">Learn academic subjects in a unique way</h1>
                            <p className='pt-8'>Welcome to Edusphere: Where Learning Knows No Bounds. Experience education reimagined with our interactive platform designed to engage, inspire, and empower. Dive into a world of limitless possibilities, where curiosity meets innovation, and knowledge knows no boundaries. Join our vibrant community of learners and embark on a journey of discovery. Unleash your potential with Edusphere – where the future of learning begins today</p>

                            <div className="w-full text-center lg:text-left">
                                <a href={"#course"} className={"btn md:btn-lg bg-emerald-500 text-white mt-8 hover:bg-emerald-600 shadow-md"}>see course</a>
                                <a href={"#about"} className={"btn md:btn-lg bg-purple-500 text-white mt-8 hover:bg-purple-600 shadow-md ml-4"}>about us</a>
                            </div>
                        </div>

                        {/* image */}
                        <div className="image-box w-full h-full">
                            <img src={headerImg} alt="Student image" className='w-auto h-full block lg:ml-16' />
                        </div>

                    </GridRows>
                </Container>
            </section>

            {/* about section */}
            <Section className={"about-section"} id={"about"}>
                <GridRows className={"lg:grid-cols-2"}>
                    <div className="image-content lg:order-2">
                        <div className="image w-full h-full">
                            <img src="https://images.pexels.com/photos/5303515/pexels-photo-5303515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='shadow-lg rounded-lg' alt="about-us-image" />
                        </div>
                    </div>

                    <div className="text-content flex flex-col justify-center text-left">
                        <h2 className='text-3xl font-bold'>About Edusphere</h2>
                        <p className='pt-5'>Edusphere revolutionizes e-learning with its innovative approach to education. Breaking free from traditional methods, Edusphere harnesses cutting-edge technology to deliver engaging and immersive learning experiences. Through interactive simulations, personalized learning paths, and real-world applications, Edusphere empowers learners to grasp complex concepts with ease. Its dynamic platform fosters collaboration, critical thinking, and creativity, preparing students for success in the ever-evolving digital landscape. With a diverse range of courses spanning various disciplines, Edusphere caters to learners of all ages and backgrounds. Join the Edusphere community and embark on a transformative journey towards knowledge and mastery.</p>

                        <div className="w-full">
                            <a href={"#courses"} className={"btn md:btn-lg bg-emerald-500 text-white mt-8 hover:bg-emerald-600 shadow-md"}>contact us</a>
                            <NavLink to={"/about"} className={"btn md:btn-lg bg-purple-500 text-white mt-8 hover:bg-purple-600 shadow-md ml-4"} >learn more</NavLink>
                        </div>
                    </div>

                </GridRows>
            </Section>

            {/* benefits section */}
            <Section className={"benefits-section bg-gray-100 dark:bg-[#1c262c]"} id={"benefits"}>
                <GridRows className={"lg:grid-cols-2"}>

                    <div className="image-content">
                        <div className="image">
                            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='shadow-lg rounded-lg' alt="benefits section image" />
                        </div>
                    </div>
                    <div className="text-content">
                        <h2 className='text-3xl font-bold'> <span className='text-emerald-500'>Benefits</span> from our online courses</h2>

                        <div className='pt-8'>
                            <div className="flex gap-4 w-full mb-6">
                                <p><span className="w-14 h-14 bg-rose-500 rounded-full flex justify-center items-center text-3xl text-white"><LiaBookSolid /></span></p>
                                <div className="text">
                                    <h3 className='font-semibold text-xl pb-2'>Short Courses</h3>
                                    <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, placeat asperiores explicabo eligendi facere.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full mb-6">
                                <p><span className="w-14 h-14 bg-emerald-700 rounded-full flex justify-center items-center text-3xl text-white"><FaChalkboardTeacher /></span></p>
                                <div className="text">
                                    <h3 className='font-semibold text-xl pb-2'>Expert instructors</h3>
                                    <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, placeat asperiores explicabo eligendi facere reiciendis.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full mb-6">
                                <p><span className="w-14 h-14 bg-purple-500 rounded-full flex justify-center items-center text-3xl text-white"><MdLiveTv /></span></p>
                                <div className="text">
                                    <h3 className='font-semibold text-xl pb-2'>Live course</h3>
                                    <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, placeat asperiores facere reiciendis.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full mb-6">
                                <p><span className="w-14 h-14 bg-blue-500 rounded-full flex justify-center items-center text-3xl text-white"><FaHeadset /></span></p>
                                <div className="text">
                                    <h3 className='font-semibold text-xl pb-2'>All time support</h3>
                                    <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing. Consectetur, placeat asperiores explicabo eligendi facere reiciendis.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </GridRows>

                <div className="lg:text-center mt-12">
                    <NavLink to={'/course'} className={"btn btn-wide md:btn-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-md"}>see all courses</NavLink>
                </div>
            </Section>

            {/* popular courses */}
            <Section className={"poppular-course-section"} id={"course"}>
                <div className="title text-center">
                    <h2 className='text-3xl font-bold'>Popular Courses</h2>
                    <p className='pt-5 font-medium'>See our popular courses taught by our best instructors</p>
                </div>
            </Section>

            {/* become a teacher */}
            <Section className={"become-teacher bg-gray-100 dark:bg-[#1c262c]"} id={"become-teacher"}>
                <GridRows className={"lg:grid-cols-2"}>

                    <div className="image-content lg:order-2">
                        <div className="image">
                            <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='shadow-lg rounded-lg' alt="become a teacher image" />
                        </div>
                    </div>

                    <div className="text-content">
                        <h2 className='text-3xl font-bold'>If you are a certified teacher <span className='text-emerald-500'>then become an instructor</span></h2>
                        <p className='pt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sit! Exercitationem illum quam cum error quod quisquam ipsum obcaecati, aperiam aliquam doloribus praesentium blanditiis, eaque fuga nihil corrupti delectus. Corrupti!</p>

                        <h2 className='text-3xl font-bold pt-8'>Enjoy many perks</h2>
                        <ul className="list-disc pl-5 pt-4 font-semibold">
                            <li className='w-full lg:float-left lg:w-1/2 pt-2'>Global impact</li>
                            <li className='w-full lg:float-left lg:w-1/2 pt-2'>Flexible schedule</li>
                            <li className='w-full lg:float-left lg:w-1/2 pt-2'>Innovative teaching tool</li>
                            <li className='w-full lg:float-left lg:w-1/2 pt-2'>Networking opportunities</li>
                        </ul>

                        <NavLink to={'/instructor-register'} className={"btn btn-wide md:btn-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-md mt-8"}>become an instructor</NavLink>
                    </div>

                </GridRows>
            </Section>

            {/* contact section */}
            <ContactSection />
        </>
    );
};

export default HomePage;