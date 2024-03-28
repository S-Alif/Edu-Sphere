import { FaStar } from "react-icons/fa6";
import { formatDate, formatTime } from './../../helpers/validators';


const ReviewCards = ({ data }) => {

  return (
    <div className="pb-4 mb-4 border-b-2 border-b-gray-200">
      <div className="flex gap-3 items-center">
        <img src={data?.profileImg} alt="reviewer image" className="w-12 h-12 object-cover rounded-full shadow-lg" />
        <div>
          <h4 className="text-sm font-semibold flex items-center gap-3">
            {data?.firstName} {data?.lastName}
            <span className="flex items-center badge badge-warning text-white">{data?.rating}<FaStar /></span>
          </h4>
          <p className='text-[12px] font-bold text-gray-400 pt-1'>{formatTime(formatDate(data?.createdAt))}</p>
        </div>
      </div>

      <p className='pt-4'>{data?.review}</p>
    </div>
  );
};

export default ReviewCards;