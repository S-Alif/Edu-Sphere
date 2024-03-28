import { useEffect, useState } from 'react';
import Section from './tag-comps/Section';
import StarRatings from 'react-star-ratings';
import { useLocation, useParams } from 'react-router-dom';
import studentStore from '../store/studentStore';
import basicStore from '../store/basicStore';
import { errorAlert } from '../helpers/alertMsg';
import userStore from './../store/userStore';
import ReviewCards from './cards/ReviewCards';

import { FaStar } from "react-icons/fa6";

const ReviewComponent = () => {

  const params = useParams()
  const location = useLocation()
  let id = params?.id || params?.course
  const [rating, setRating] = useState("")
  const [review, setReview] = useState({
    postId: "",
    rating: 0,
    review: "",
  })
  const [data, setData] = useState([])

  const { postInstructorReviw, postCourseReview } = studentStore()
  const { profile, user } = userStore()
  const { getInstructorReviw, getCourseReview } = basicStore()

  // change rating
  let changeRate = (e) => {
    setReview({ ...review, ['rating']: e })
  }

  // fetch data
  useEffect(() => {
    (async () => {
      setReview({ ...review, ['postId']: id })

      // instructor review
      if (location.pathname.substring(0, 19) == "/instructor-profile") {
        let reviews = await getInstructorReviw(params?.id)
        if (reviews?.status == 1) {
          setRating(reviews?.data?.avg)
          setData(reviews?.data?.data)
          setReview({
            postId: params?.id,
            rating: 0,
            review: "",
          })
        }
        return
      }

      // course review
      if (location.pathname.substring(0, 7) == "/course") {
        let reviews = await getCourseReview(params?.course)
        if (reviews?.status == 1) {
          setRating(reviews?.data?.avg)
          setData(reviews?.data?.data)
          setReview({
            postId: params?.id,
            rating: 0,
            review: "",
          })
        }
        return
      }

    })()
  }, [])

  // submit review
  const submitReview = async () => {
    if (review.rating == 0) return errorAlert("empty review")
    // instructor profile
    if (location.pathname.substring(0, 19) == "/instructor-profile") {
      let result = await postInstructorReviw(review)
      if (result == 1) {
        let reviews = await getInstructorReviw(params?.id)
        if (reviews?.status == 1) {
          setRating(reviews?.data?.avg)
          setData(reviews?.data?.data)
          setReview({
            postId: params?.id,
            rating: 0,
            review: "",
          })
        }
      }
    }

    // for course detail page
    if (location.pathname.substring(0, 15) == "/student/course") {
      let result = await postCourseReview(review)
      if (result == 1) {
        let reviews = await getCourseReview(params?.course)
        if (reviews?.status == 1) {
          setRating(reviews?.data?.avg)
          setData(reviews?.data?.data)
          setReview({
            postId: params?.id,
            rating: 0,
            review: "",
          })
        }
      }
    }


  }

  return (
    <Section padding={'pb-10'} id={"reviews"}>
      {/* post review */}
      {(location.pathname.substring(0, 15) == "/student/course" || location.pathname.substring(0, 19) == "/instructor-profile") &&
        <>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Give a review</h2>
        </div>
          <div><StarRatings starRatedColor="green" numberOfStars={5} rating={review.rating} changeRating={changeRate} starDimension="30px" name='rating' /></div>
          <div className="pt-3">
            <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={5} placeholder="write a review" value={review.review}
              onChange={(e) => setReview({ ...review, ['review']: e.target.value })} disabled={(!user || profile?.role !== 0) || false} />

            <div className="max-w-xl">
              <button type='submit' className='btn btn-success bg-emerald-500 text-white w-full' onClick={submitReview} disabled={(!user || profile?.role !== 0) || false}>submit</button>
            </div>
          </div>
        </>
      }

      {data.length != 0 && <h2 className='font-bold pb-4 pt-16 mb-5 border-b-gray-200 border-b-2 flex gap-3 items-center'>Reviews <span className="flex items-center badge badge-warning text-white">{parseFloat(rating).toFixed(2)}<FaStar /></span></h2>}

      <div className='max-h-[70vh] mb-10 overflow-y-auto'>
        {
          data.length > 0 &&
          data.map((e, index) => {
            return (e.review != null && e.review != "") && (<ReviewCards data={e} key={index} />)
          })
        }

      </div>

    </Section>
  );
};

export default ReviewComponent;