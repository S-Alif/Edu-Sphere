import { useEffect, useState } from "react";
import PageHeader from "../component/PageHeader";
import OtherStore from "../store/OtherStore";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Section from './../component/tag-comps/Section';


const Dashboard = () => {

    const { charts } = OtherStore()

    const [stdChart, setStdChart] = useState([])
    const [insChart, setInsChart] = useState([])

    console.log(stdChart, insChart)

    // get data
    useEffect(() => {

        (async () => {
            let chartData = await charts()
            if (chartData?.status == 0) {
                setStdChart([])
                setInsChart([])
                return
            }
            setStdChart(chartData?.data?.students)
            setInsChart(chartData?.data?.instructors)

        })()

    }, [])


    return (
        <>
            <PageHeader pageTitle={"Dashboard"} pageText={"See details about the public activity"} headerBg={"https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            <Section>
                {/* student chart */}
                <h2 className="pt-10 pb-3 mb-10 border-b-2 text-xl font-semibold">Student Registration Rate</h2>
                <div className="aspect-video h-96 w-100">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={stdChart}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"registration_date"} />
                            <YAxis dataKey={"new_students"} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="new_students" fill="rgb(16,185,129)" activeBar={<Rectangle fill="rgb(16,185,129)" stroke="white" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* instructor chart */}
                <h2 className="pt-10 pb-3 mb-10 border-b-2 text-xl font-semibold">Instructor Registration Rate</h2>
                <div className="aspect-video h-96 w-100">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={insChart}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"registration_date"} />
                            <YAxis dataKey={"new_teachers"} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="new_teachers" fill="rgb(16,185,129)" activeBar={<Rectangle fill="rgb(16,185,129)" stroke="white" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Section>
        </>
    );
};

export default Dashboard;