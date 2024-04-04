import { useEffect, useState } from "react";
import PageHeader from "../component/PageHeader";
import Section from "../component/tag-comps/Section";
import { errorAlert } from "../helpers/alertMsg";
import OtherStore from "../store/OtherStore";
import SubjectCard from "../component/cards/SubjectCard";


const Subjects = () => {

  const { subCreate, getSubs } = OtherStore()

  const [subName, setSubName] = useState("")
  const [subCode, setSubCode] = useState("")
  const [flag, setFlag] = useState(false)
  const [data, setData] = useState([])

  // creating subject
  const createSub = async (e) => {
    e.preventDefault()
    if (subCode.trim() == "" || subCode.trim() == "") return errorAlert("Fill all the data")
    let result = await subCreate({ name: subName, code: subCode })
    if (result == 0) return
    setFlag(true)
    setSubCode("")
    setSubName("")
  }

  // get the subjects
  useEffect(() => {
    (async () => {

      let result = await getSubs()
      if (result?.status == 0) return setData([])
      setData(result?.data)
      setFlag(false)

    })()
  }, [flag])



  return (
    <>
      <PageHeader pageTitle={"Subjects"} pageText={"Create, read, update and delete subjects from here"} headerBg={"https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

      <Section className={'py-20'}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Create Subjects</h2>
        </div>

        {/* subject form */}
        <form action="" className="pt-2" onSubmit={createSub}>
          <label htmlFor="name" className="block">Subject</label>
          <input type="text" name='name' id='name' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-lg w-full' value={subName} onChange={(e) => setSubName(e.target.value)} />
          <label htmlFor="code" className="block">Code</label>
          <input type="text" name='code' id='code' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-lg w-full' value={subCode} onChange={(e) => setSubCode(e.target.value)} />

          <button type='submit' className='btn btn-success bg-emerald-500 max-w-lg block text-white w-full'>create subject</button>
        </form>

        {/* title */}
        <div className="title pb-4 pt-20 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">All Subjects ({data.length})</h2>
        </div>

        {data.length == 0 && <h3 className="pt-5">No Instructor found</h3>}

        {/* profile cards */}
        {
          data.length > 0 &&
          <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>code</th>
                  <th>Actons</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((e, index) => (
                    <SubjectCard key={index} data={e} index={index + 1} flag={setFlag} />
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

export default Subjects;