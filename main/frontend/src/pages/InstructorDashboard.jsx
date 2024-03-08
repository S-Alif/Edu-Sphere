import UserProfile from "../components/UserProfile";
import Section from './../components/tag-comps/Section';


const InstructorDashboard = () => {
  return (
    <Section className="dashboard py-10">
      {/* user profile component */}
      <UserProfile />
    </Section>
  );
};

export default InstructorDashboard;