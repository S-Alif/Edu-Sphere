import { useEffect, useState } from 'react';
import { errorAlert } from '../helpers/alertMsg';
import OtherInstructorStore from '../store/OtherInstructorStore';
import Section from './../components/tag-comps/Section';
import ResourceCard from '../components/cards/ResourceCard';

const InstructorResourseUpload = () => {

  const { resourceUpload, resourceGet } = OtherInstructorStore()
  const [fileName, setFileName] = useState("")
  const [data, setData] = useState("")
  const [materials, setMaterials] = useState([])
  const [flag, setFlag] = useState(false)

  // resource submit
  const submitFile = async (e) => {
    e.preventDefault()

    if (fileName.trim() == "" || fileName.length < 20) return errorAlert("type name properly")
    if (data.trim() == "" || data.length < 20) return errorAlert("upload a file")

    let result = await resourceUpload({ name: fileName, file: data })
    if (result == 1) {
      setFileName("")
      setData("")
      setFlag(true)
    }

  }

  // handle file
  const handleFileChange = (e) => {

    if (!e.target.files[0]) return errorAlert('choose a file')
    const selectedFile = e.target.files[0];

    if ((selectedFile.size / 1024) > 5000) {
      errorAlert("File is larger than " + (5000 / 1000) + "MB");
      return;
    }

    const fileName = selectedFile.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
    if (!allowedExtensions.includes(fileExtension)) {
      return errorAlert('Unsupported file type');
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      setData(fileReader.result)
    }
    fileReader.readAsDataURL(selectedFile);

  };

  // get data
  useEffect(() => {
    (async () => {
      let result = await resourceGet()
      if (result != 0) {
        setMaterials(result)
      }
      setFlag(false)
    })()
  }, [flag])


  return (
    <>
      <Section padding={'py-10'} id={'resource-upload'}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Upload resources</h2>
        </div>

        <p className='text-gray-500'> <span className='uppercase text-red-500 font-bold'>note : </span> file size cannot exceed 5MB and supported formats are <span className='font-bold'>PDF, docx, pptx, ppt</span></p>

        {/* file upload form */}
        <form className='pt-6' onSubmit={submitFile}>
          <input type="text" name='name' id='name' className='mt-4 mb-6 input input-bordered input-success max-w-xl w-full' value={fileName} required onChange={(e) => setFileName(e.target.value)} placeholder="Type resourse name" />
          <input type="file" name='resource' id='resource' className='mt-4 mb-6 file-input file-input-bordered file-input-success max-w-xl w-full' accept='.pdf, .doc, .docx, .ppt, .pptx' required onChange={handleFileChange} />
          <div className="mb-6">
            <button type='submit' className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">upload resource</button>
          </div>
        </form>
      </Section>

      {/* show resourse table */}
      <Section id={'show-resources'} padding={'py-10'}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Show resources</h2>
        </div>

        {materials.length == 0 && <h2 className='font-semibold'>No resouce found</h2>}

        {/* show resource table */}
        {
          materials.length > 0 &&
          <div className='overflow-x-auto'>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Resource name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {
                  materials.map((e, index) => (
                    <ResourceCard data={e} index={index + 1} key={index} flag={setFlag} />
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

export default InstructorResourseUpload;