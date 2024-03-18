import { useEffect, useState } from 'react';
import instructorStore from '../store/instructorStore';
import Section from './tag-comps/Section';
import GridRows from './tag-comps/GridRows';
import InstructroCourseCard from './cards/InstructroCourseCard';

const InstructorCourses = () => {

  const { getBatchInstructor } = instructorStore()
  const [batches, setBatches] = useState([])

  // fetch batches
  useEffect(() => {

    (async () => {
      let result = await getBatchInstructor()
      if(result != 0){
        setBatches(result)
      }
    })()

  }, [0])

  return (
    <Section id={"ins-courses"} padding={"py-10"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Your course and batches</h2>
      </div>

      {/* show cards */}
      <GridRows className={"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} gap={"gap-3"}>
        {batches.length == 0 && <h3 className='font-bold w-full'>No batches found</h3>}
        {
          batches.length != 0 && 
          batches.map((e, index) => (
            <InstructroCourseCard batchData={e} key={index} />
          ))
        }
      </GridRows>

    </Section>
  );
};

export default InstructorCourses;