import { NavLink, useParams } from 'react-router-dom';
import CourseCreateUpdate from '../components/CourseCreateUpdate';
import OtherInstructorStore from '../store/OtherInstructorStore';
import { useEffect, useState } from 'react';
import GridRows from '../components/tag-comps/GridRows';

const UpdateCoursePage = () => {

  const params = useParams()
  const { batchByCourse } = OtherInstructorStore()
  const [batches, setBatches] = useState([])
  console.log(batches)

  // fetch batches
  useEffect(() => {

    (async () => {
      let result = await batchByCourse(params?.id)
      if (result != 0) {
        setBatches(result)
      }
    })()

  }, [0])

  return (
    <>  
      {/* course create update component */}
      <CourseCreateUpdate />

      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Batches</h2>
      </div>

      <GridRows className={'lg:grid-cols-4 md:grid-cols-3 mb-10'}>
        {batches.length == 0 && <h2 className='font-bold pt-2'>No batches found</h2>}

        {
          batches.length > 0 &&
            batches.map((e,index) => (
              <NavLink to={"/instructor/batch-configure/" + params?.id + "/" + e.id} key={index} className={`rounded-lg border-2 block p-4 hover:border-emerald-400 ${e.published ? "border-emerald-400" : "border-gray-200"}`}>{e.name}</NavLink>
            ))
        }
      </GridRows>

    </>
  );
};

export default UpdateCoursePage;