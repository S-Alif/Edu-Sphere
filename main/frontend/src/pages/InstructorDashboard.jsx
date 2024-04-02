import ReviewComponent from "../components/ReviewComponent";
import UserProfile from "../components/UserProfile";
import Section from './../components/tag-comps/Section';


const InstructorDashboard = () => {
  return (
    <Section className="dashboard" padding={"py-10"}>
      {/* user profile component */}
      <UserProfile />

      {/* comments on the instructor */}

      <ReviewComponent />
    </Section>
  );
};

export default InstructorDashboard;