import ContactSection from "../components/ContactSection";
import PageHeader from "../components/PageHeader";


const ContactPage = () => {
  return (
    <section className="contact-page">
      {/* page header */}
      <PageHeader pageTitle={"Contact Us"} pageText={"Contact us to get all the required information"} headerBg={"https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

      {/* contact section */}
      <ContactSection />
    </section>
  );
};

export default ContactPage;