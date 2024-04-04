import { useEffect, useState } from "react";
import PageHeader from "../component/PageHeader";
import Section from "../component/tag-comps/Section";
import InstructorStore from "../store/InstructorStore";
import InstructorProfileCard from './../component/cards/InstructorProfileCard';


const AllInstructor = () => {

    const { getInstructors } = InstructorStore()
    const [filters, setFilters] = useState("all")
    const [profiles, setProfiles] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {

        (async () => {
            let result = await getInstructors(filters)
            if (result?.status == 0) return
            setProfiles(result?.data)
            setFlag(false)
        })()

    }, [filters, flag])

    return (
        <>
            <PageHeader pageTitle={"Instructors"} pageText={"See instructors profile and other details"} headerBg={"https://plus.unsplash.com/premium_photo-1661380797814-d0bcc01342b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            <Section padding={"py-20"}>
                <h3 className="text-xl font-medium pb-2 border-b-2 mb-7">Filter instructors</h3>

                {/* option selection */}
                <select className="select border-emerald-400 mb-6 max-w-xl w-full" value={filters} onChange={(e) => setFilters(e.target.value)}>
                    <option value={"all"}>All</option>
                    <option value={"notApproved"}>Not Approved</option>
                    <option value={"active"}>Active</option>
                    <option value={"inActive"}>Inactive</option>
                </select>

                {profiles.length == 0 && <h3 className="pt-5">No Instructor found</h3>}

                {/* profile cards */}
                {
                    profiles.length > 0 &&
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Instructor</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Verified</th>
                                    {filters == "notApproved" && <th>Action</th>}
                                    <th>Register date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    profiles.map((e, index) => (
                                        <InstructorProfileCard key={index} data={e} index={index + 1} approve={filters} flag={setFlag} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }


            </Section>
        </>
    );
};

export default AllInstructor;