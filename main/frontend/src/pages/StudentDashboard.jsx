import UserProfile from "../components/UserProfile";
import Section from "../components/tag-comps/Section";


const StudentDashboard = () => {
    return (
        <Section className={"student-profile-section"} padding={"py-10"}>
            <UserProfile />
        </Section>
    );
};

export default StudentDashboard;