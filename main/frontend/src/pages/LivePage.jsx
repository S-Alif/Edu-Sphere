import { useParams } from 'react-router-dom';
import Section from './../components/tag-comps/Section';
import { useEffect, useState } from 'react';
import studentStore from '../store/studentStore';
import { formatTime } from '../helpers/validators';
import { formatDate } from './../helpers/validators';

const LivePage = () => {

  const params = useParams()
  const { getLiveById } = studentStore()
  const [live, setLive] = useState({})

  // get data
  useEffect(() => {
    (async () => {
      let result = await getLiveById(params?.module, params?.id)
      setLive(result)
    })()
  }, [])

  return (
    <Section id={"live-page-student"} padding={"py-10"}>
      {/* title */}
      <div className="title pt-6 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">{live?.topic ? live.topic : "live class"}</h2>
      </div>

      <p className='text-[18px]'>{live?.description}</p>

      <p className='pt-4'><span className='font-bold'>Start : </span> {formatTime(formatDate(live?.start))}</p>
      <p><span className='font-bold'>End : </span> {formatTime(formatDate(live?.end))}</p>

      <a href={live?.link} className="btn mt-5 bg-emerald-400 hover:bg-emerald-500 text-white" target='_blank' rel="noreferrer">Join class</a>

    </Section>
  );
};

export default LivePage;