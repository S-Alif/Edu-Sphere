import InstructorCourses from '../components/InstructorCourses';
import userStore from './../store/userStore';

const MyCoursesPage = () => {

    const {profile} = userStore()

    return (
        <>
            {profile?.role == 1 && <InstructorCourses />}
        </>
    );
};

export default MyCoursesPage;