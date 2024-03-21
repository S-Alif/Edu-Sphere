import { useEffect, useState } from "react";
import studentStore from "../store/studentStore";
import Section from "../components/tag-comps/Section";
import { formatDate, formatTime } from "../helpers/validators";


const StudentPaymentInfoPage = () => {

  const [info, setInfo] = useState([])
  const { paymentInfo } = studentStore()

  useEffect(() => {
    (async () => {
      let result = await paymentInfo()
      setInfo(result)
    })()
  }, [])

  return (
    <Section id={'student-payment'} padding={"py-10"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Payment info</h2>
      </div>

      {info.length == 0 && <h2 className="font-semibold text-center">No payemnt details</h2>}

      {
        info.length > 0 &&
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Course name</th>
                <th>Batch name</th>
                <th>Amount</th>
                <th>Enroll date</th>
              </tr>
            </thead>
            <tbody>
              {
                info.map((e, index) => (
                  <tr className="hover" key={index}>
                    <th>{index + 1}</th>
                    <th>{e.courseName}</th>
                    <td>{e.batchName}</td>
                    <td>{e.paid}</td>
                    <td>{formatTime(formatDate(e.enrollDate))}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }

    </Section>
  );
};

export default StudentPaymentInfoPage;