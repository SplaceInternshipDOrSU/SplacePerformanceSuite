import React, { useState } from "react";
import { FaSmile } from "react-icons/fa";

const criteria = [
  {
    id: "job_knowledge",
    title: "1. JOB KNOWLEDGE",
    maxScore: 30,
    desc:
      "The extent of how the employee knows and understands the details and nature of his assigned jobs and related duties. One's effort to keep skills current. How well he executes against the goals and objectives.",
  },
  {
    id: "quantity_work",
    title: "2. QUANTITY OF WORK",
    maxScore: 15,
    desc:
      "The amount and quality of work accomplished within the time given schedule. Extent to which the employee may be described as hard worker and the amount of concentration and effort exerted in the performance of his job.",
  },
  {
    id: "quality_work",
    title: "3. QUALITY OF WORK",
    maxScore: 15,
    desc:
      "The extent of accuracy, completeness and neatness of the job performed. The ability to plan and organize work effectively.",
  },
  {
    id: "communication",
    title: "4. COMMUNICATION",
    maxScore: 15,
    desc:
      "The confidence others have in the employee. His tactfulness and diplomacy. His ability to try new ideas and suggestions, ability to adapt to new methods or ideas. Communicates in a respectful, direct, honest, and sensitive manner.",
  },
  {
    id: "teamwork",
    title: "5. TEAMWORK",
    maxScore: 15,
    desc:
      "Works effectively with colleagues and peers of different backgrounds and perspectives. Cooperates and contributes to team efforts. Gives his best effort and keeps team goals in mind. Promotes group success instead of self-promotion. Creates a challenging, fun and diverse environment which fosters teamwork, cross functional interaction and creativity.",
  },
  {
    id: "attendance",
    title: "6. ATTENDANCE",
    maxScore: 10,
    desc: "Reports to work on-time and provides advance notice of need of absence.",
  },
];

const MAX_DISPLAY_STARS = 10;

export default function EmployeePerformanceEvaluation() {
  const [ratings, setRatings] = useState({});
  const [hoverRatings, setHoverRatings] = useState({});

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

  return (
    <div className="pb-5 w-full flex-wrap px-2 min-h-screen bg-transparent p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Employee Performance Evaluation
        </h1>

        {criteria.map(({ id, title, maxScore, desc }) => {
          const currentRating = ratings[id] || 0;
          const currentHover = hoverRatings[id] || 0;
          const displayRating = currentHover || currentRating;

          return (
            <section
              key={id}
              className="mb-10 border-b border-gray-300 pb-6 last:border-none"
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
                className="w-full rounded-md border border-gray-300 p-2 mb-4 resize-none"
              ></textarea>

              <div className="flex items-center space-x-1 select-none">
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
                        color: starNum <= displayRating ? "#FFD700" : "#ccc",
                        transition: "color 0.2s",
                      }}
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
                <span className="ml-4 font-medium whitespace-nowrap">
                  Score: {getScaledScore(id, displayRating)} / {maxScore}
                </span>
              </div>
            </section>
          );
        })}

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  );
}
