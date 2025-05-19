import React, { useEffect, useState } from "react";
import { FaSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RatingDisplay from '../../Components/RatingComponents/RatingDisplay';
import OverallRatingSummary from '../../Components/RatingComponents/OverallRatingSummary';
import { RiResetLeftLine } from "react-icons/ri";
import { Tooltip } from 'react-tooltip'
import {messageClear, ratingAdd,fetchSelfRating} from "../../store/Reducers/ratingReducer";
import toast from "react-hot-toast";


const criteria = [
  {
    id: "job_knowledge",
    title: "JOB KNOWLEDGE",
    maxScore: 30,
    desc:
      "The extent of how the employee knows and understands the details and nature of his assigned jobs and related duties. One's effort to keep skills current. How well he executes against the goals and objectives.",
  },
  {
    id: "quantity_work",  
    title: "QUANTITY OF WORK",
    maxScore: 15,
    desc:
      "The amount and quality of work accomplished within the time given schedule. Extent to which the employee may be described as hard worker and the amount of concentration and effort exerted in the performance of his job.",
  },
  {
    id: "quality_work",
    title: "QUALITY OF WORK",
    maxScore: 15,
    desc:
      "The extent of accuracy, completeness and neatness of the job performed. The ability to plan and organize work effectively.",
  },
  {
    id: "communication",
    title: "COMMUNICATION",
    maxScore: 15,
    desc:
      "The confidence others have in the employee. His tactfulness and diplomacy. His ability to try new ideas and suggestions, ability to adapt to new methods or ideas. Communicates in a respectful, direct, honest, and sensitive manner.",
  },
  {
    id: "teamwork",
    title: "TEAMWORK",
    maxScore: 15,
    desc:
      "Works effectively with colleagues and peers of different backgrounds and perspectives. Cooperates and contributes to team efforts. Gives his best effort and keeps team goals in mind. Promotes group success instead of self-promotion. Creates a challenging, fun and diverse environment which fosters teamwork, cross functional interaction and creativity.",
  },
  {
    id: "attendance",
    title: "ATTENDANCE",
    maxScore: 10,
    desc: "Reports to work on-time and provides advance notice of need of absence.",
  },
];

const MAX_DISPLAY_STARS = 10;

export default function EmployeePerformanceEvaluation() {
  const [ratings, setRatings] = useState({});

  const [hoverRatings, setHoverRatings] = useState({});
  const {userInfo} = useSelector(state=>state.auth)
  const {successMessage, errorMessage, selfRating} = useSelector(state=>state.rating)

console.log(selfRating)
console.log("selfRating")
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const quarter = Math.floor(month / 3) + 1;
  const year = now.getFullYear();



  const dispatch = useDispatch();

  console.log(hoverRatings)
  console.log("hoverRatings")

  const handleClick = (criterionId, starValue) => {
    setRatings((prev) => ({ ...prev, [criterionId]: starValue }));
  };

  const handleMouseEnter = (criterionId, starValue) => {
    setHoverRatings((prev) => ({ ...prev, [criterionId]: starValue }));
  };

  const handleMouseLeave = (criterionId) => {
    setHoverRatings((prev) => ({ ...prev, [criterionId]: 0 }));
  };

  const getScaledScore = (criterionId, stars) => {
    if (!stars) return 0;
    const maxScore = criteria.find((c) => c.id === criterionId)?.maxScore || 0;
    return Math.round((stars / MAX_DISPLAY_STARS) * maxScore);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const evaluationData = criteria.map(({ id, title, maxScore }) => ({
    criterion: title,
    maxScore,
    scoreStars: ratings[id] || 0,
    scoreWeighted: getScaledScore(id, ratings[id] || 0),
    comments: formData.get(`${id}_comments`) || "",
  }));


  // console.log("Evaluation Submitted:", requestBody);
console.log("asdsd")
  dispatch(ratingAdd( {evaluatedUser:userInfo._id, evaluator:userInfo._id, roleOfEvaluator: "self", category: userInfo.category.name, ratings:evaluationData, quarter, year}))

  // Example fetch POST (optional)
  // fetch('/api/rate', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(requestBody),
  // });
  

  // alert("Evaluation submitted! Check console for details.");
};

  const handleResetRating = (id) => {
  setRatings((prev) => ({ ...prev, [id]: 0 }));
  setHoverRatings((prev) => ({ ...prev, [id]: 0 }));
};


useEffect(()=>{
  dispatch(fetchSelfRating({userId:userInfo._id, quarter, year}))
},[dispatch, userInfo,quarter, year])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    } else {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

// Map saved selfRating ratings by criterion title for easy lookup
const savedRatingsMap = {};
if (selfRating?.ratings) {
  selfRating.ratings.forEach(r => {
    // Find criterion by title to get the id
    const criterion = criteria.find(c => c.title === r.criterion);
    if (criterion) {
      savedRatingsMap[criterion.id] = r.scoreStars; // Use stars to keep the same scale as ratings state
    }
  });
}

// Use savedRatingsMap if available, otherwise fallback to local ratings
const ratingsForSummary = Object.keys(savedRatingsMap).length > 0 ? savedRatingsMap : ratings;


  return (
    <div className="pb-5 w-full flex-wrap  min-h-screen flex justify-center">
        <div className="grid md:grid-cols-12 ">
            <form
                onSubmit={handleSubmit}
                className="w-full justify-start items-start gap-10 rounded-lg shadow-lg col-span-5 "
            >
                <h1 className="text-3xl text-start font-bold mb-2 text-slate-200">
                SELF RATING 
                <span> ({
                  selfRating? 'DONE' : ''
                })</span>
               
                </h1>

                {criteria.map(({ id, title, maxScore, desc }) => {
                const currentRating = ratings[id] || 0;
                const currentHover = hoverRatings[id] || 0;
                const displayRating = currentHover || currentRating;

                return (
                    <section
                    key={id}
                    className="mb-10 border-b border-gray-300 pb-6 last:border-none bg-slate-300 p-4 rounded-md  relative"
                    >
                    <h2 className="font-semibold text-xl mb-2">{title}</h2>
                    <p className="text-gray-700 mb-2 text-xs">{desc}</p>
                    <p className="text-sm italic mb-3">
                        Maximum Weighted Score: {maxScore}
                    </p>

                    <textarea
                        name={`${id}_comments`}
                        placeholder="Comments..."
                        rows={3}
                        className="w-full rounded-md border border-slate-800 p-2 mb-7 resize-none "
                    ></textarea>

                    <div className="flex items-center space-x-1 select-none absolute bottom-6 inset-x-0 px-4 ">
                        {[...Array(MAX_DISPLAY_STARS)].map((_, i) => {
                        const starNum = i + 1;
                        return (
                            <FaSmile
                            key={starNum}
                            onClick={() => handleClick(id, starNum)}
                            onMouseEnter={() => handleMouseEnter(id, starNum)}
                            onMouseLeave={() => handleMouseLeave(id)}
                            size={24}
                            style={{
                                cursor: "pointer",
                                color: starNum <= displayRating ? "#ED025A" : "#283046",
                                transition: "color 0.4s",
                            }}
                            className="outline-0"
                            aria-label={`${starNum} smile rating`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                handleClick(id, starNum);
                                }
                            }}
                            />
                        );
                        })}
                        <span className="ml-4 font-medium whitespace-nowrap flex gap-2">
                     <button
                        type="button"
                        onClick={() => handleResetRating(id)}
                        className="group"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Reset"
                      >
                        <RiResetLeftLine
                          size={23}
                          className="transform transition-transform duration-300 group-hover:rotate-180"
                        />
                      </button>

                        Score: {getScaledScore(id, displayRating)} / {maxScore}
                        </span>
                        
                    </div>
                    <Tooltip id="my-tooltip" />
                    </section>

                    
                );
                })}
                <div className=""></div>

                <div className="text-center flex justify-start">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-10 py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Submit Evaluation
                </button>
                </div>
            </form>
           

           <div className="col-span-7 fixed xl:h-[500px] 2xl:h-[600px] hidden xl:top-7/12 2xl:top-6/12 top-6/12 right-0 transform -translate-y-1/2  p-6 z-50 bg-red  xl:block 2xl:w-5/12 xl:w-5/12">
                <div className="border-6 border-accent rounded-md w-full h-full relative mr-1 ">
                  <div className="rounded-full h-[200px] w-[200px] absolute -top-[80px] -left-[70px]">
                     <div className="flex justify-center h-full w-full rounded-full">
                      <img
                        className="w-full h-full object-cover rounded-full border-accent border-6"
                        src={userInfo.profileImage}
                        alt="Profile"
                      />
                      {/* <div className="absolute bottom-2 right-4 h-[80px] rounded-full border-6 bg-white border-accent p-3">
                        <img className='h-full w-full' src="/images/Splace Logo.png" alt="" />
                      </div> */}
                       <div className="absolute -bottom-2 -right-6 rounded-full rounded-ful">
                      <OverallRatingSummary criteria={criteria} 
                        ratings={ratingsForSummary} 
                        getScaledScore={getScaledScore} />

                      </div>
              
      
                  </div>
                  </div>
                    <div className="h-full w-full flex justify-between items-end flex-col pt-9  p-4 text-center text-xl text-slate-200 text-wrap">
                     <div className="w-9/12 ">
                       <h2 className="font-bold text-3xl text-wrap">{userInfo.name}</h2>
                       <div className="">
                        <p className="text-base uppercase font-bold">{userInfo.role?.name} ( <span>{userInfo.category?.name}</span> )</p>
                       </div>
                     </div>
                     <div className="w-full grid grid-cols-2 gap-3 self-end">
                     {criteria.map(({ id, title, maxScore }) => {
                        // Try to find matching rating from selfRating.ratings by title
                        const savedRating = selfRating?.ratings?.find(r => r.criterion === title);

                        // Use saved weighted score or fallback to scaled local rating state
                        const displayScore = savedRating
                          ? savedRating.scoreWeighted
                          : getScaledScore(id, ratings[id] || 0);

                        return (
                          <div key={id} className="">
                            <RatingDisplay
                              rating={displayScore}
                              maxScore={maxScore}
                              title={title}
                            />
                          </div>
                        );
                      })}


                     </div>
                    
                    </div>
                </div>
            </div>

        </div>
     
    </div>
  );
}
