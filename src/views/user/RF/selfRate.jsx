import React, { useState } from "react";
import { FaSmile } from "react-icons/fa";
import { useSelector } from "react-redux";
import RatingDisplay from './../../../Components/RatingComponents/RatingDisplay';
import OverallRatingSummary from './../../../Components/RatingComponents/OverallRatingSummary';
import { RiResetLeftLine } from "react-icons/ri";
import { Tooltip } from 'react-tooltip'


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

    console.log("Evaluation Submitted:", evaluationData);

    alert("Evaluation submitted! Check console for details.");
  };

  const handleResetRating = (id) => {
  setRatings((prev) => ({ ...prev, [id]: 0 }));
  setHoverRatings((prev) => ({ ...prev, [id]: 0 }));
};



  return (
    <div className="pb-5 w-full flex-wrap  min-h-screen flex justify-center">
        <div className="grid md:grid-cols-12 ">
            <form
                onSubmit={handleSubmit}
                className="w-full justify-start items-start gap-10 rounded-lg shadow-lg p-8 col-span-5 "
            >
                {/* <h1 className="text-3xl font-bold mb-8 text-center">
                Employee Performance Evaluation (SELF RATING)
                </h1> */}

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
                    <p className="text-gray-700 mb-2">{desc}</p>
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
                      <OverallRatingSummary criteria={criteria} ratings={ratings}  getScaledScore={getScaledScore}/>

                      </div>
              
      
                  </div>
                  </div>
                    <div className="h-full w-full flex justify-between items-end flex-col pt-9  p-4 text-center text-xl text-slate-200">
                     <div className="w-10/12 ">
                       <h2 className="font-bold text-3xl">{userInfo.name}</h2>
                       <div className="">
                        <p className="text-base uppercase font-bold">{userInfo.role?.name} ( <span>{userInfo.category?.name}</span> )</p>
                       </div>
                     </div>
                     <div className="w-full grid grid-cols-2 gap-3 self-end">
                      {criteria.map(({ id, title, maxScore }) => (
                        <div key={id} className="">
                          {/* <h3 className="font-semibold text-base">{title}</h3> */}
                          <RatingDisplay
                            rating={getScaledScore(id, ratings[id] || 0)}
                            maxScore={maxScore}
                            title = {title}
                            
                          />
                        </div>
                      ))}

                     </div>
                     {/* <div className="absolute bottom-0 inset-x-0 h-[150px] bg-red-600">
                      <div className="h-full grid grid-cols-2 justify-center ">
                        <div className="relative flex justify-center items-center px-3">
                          <div className="flex border-2 rounded-sm border-accent justify-center items-end w-full h-[100px] text-end">
                              <img
                              className="h-[90px] w-[90px] rounded-full absolute -top-8 left-1/2 -translate-x-1/2"
                              src={userInfo.profileImage}
                              alt=""
                            />
                            <div className="text-slate-50 text-wrap w-full text-center pb-3">
                              <h2 className="font-bold text-base text-wrap">Manager Name</h2>
                              <p className="text-xs">MANAGER</p>
                            </div>
                          </div>
                        
                        </div>
                        <div className="relative flex justify-center items-center">
                          <div className="flex border-2 rounded-sm border-accent justify-center items-end w-10/12 h-[100px] text-end">
                              <img
                               className="h-[90px] w-[90px] rounded-full absolute -top-8 left-1/2 -translate-x-1/2"
                              src={userInfo.profileImage}
                              alt=""
                            />
                            <div className="text-slate-50 text-wrap w-full text-center pb-3">
                              <h2 className="font-bold text-base text-wrap">SuperVisor Name</h2>
                              <p className="text-xs">SUPERVISOR</p>
                            </div>
                          </div>
                        
                        </div>
                        
                      </div>
                    </div> */}

                     
                     {/* <div className="">
                      asdasd
                     </div> */}
                    </div>
                </div>
            </div>

        </div>
     
    </div>
  );
}
