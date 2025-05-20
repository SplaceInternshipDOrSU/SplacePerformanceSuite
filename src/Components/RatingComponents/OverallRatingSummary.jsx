import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OverallRatingSummary = ({ criteria, ratings, getScaledScore }) => {
  // Calculate total weighted score based on scaled scores
  const totalScore = criteria.reduce((sum, { id }) => {
    return sum + getScaledScore(id, ratings[id] || 0) / 10;
  }, 0);

  const percentage = Math.min(100, (totalScore / 10) * 100);

  const getColor = (percentage) => {
    if (percentage >= 75) return 'green';
    if (percentage >= 50) return 'orange';
    return 'red';
  };

  const color = getColor(percentage);

  return (
    <div className="flex flex-col h-[120px] w-[120px] rounded-full items-center shadow-2xl">
      <div className="w-full h-full  border-accent border-3 rounded-full">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: color,
            trailColor: '#161D31',
            strokeLinecap: 'round',
          })}
          className="bg-white border-accent rounded-full border-2 shadow-lg flex justify-center items-center"
        >
          <div className="flex flex-col items-center border-2 border-white h-[80px] w-[80px] text-center justify-center rounded-full">
            <div className="h-[50px] mt-2">
           {
              percentage >= 90 ? (
                <img
                  className="h-full w-full animate-[fade-in-up_0.5s_ease-out_forwards]"
                  src="/images/emojis/100.gif"
                  alt="Excellent"
                />
              ) : percentage >= 75 ? (
                <img
                  className="h-full w-full animate-[fade-in-up_0.5s_ease-out_forwards]"
                  src="/images/emojis/75up.gif"
                  alt="Good"
                />
              ) : percentage >= 50 ? (
                <img
                  className="h-full w-full animate-[fade-in-up_0.5s_ease-out_forwards]"
                  src="/images/emojis/75down.gif"
                  alt="Average"
                />
              ) : percentage >= 0 ? (
                <img
                  className="h-full w-full animate-[fade-in-up_0.5s_ease-out_forwards]"
                  src="/images/emojis/60down.gif"
                  alt="Poor"
                />
              ) : (
                <div className="self-center mt-4 animate-[fade-in-up_0.5s_ease-out_forwards]">
                  <span className="text-[20px] font-semibold" style={{ color }}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              )
            }


            </div>
           
            <span className="text-[12px] font-semibold" style={{ color }}>
              {percentage.toFixed(1)}%
            </span>
            {/* <span className="text-[10px] text-gray-800 font-bold">of 100%</span> */}
          </div>
        </CircularProgressbarWithChildren>
      </div>
      {/* <p className="text-sm text-gray-700 mt-2">
        Weighted: {totalScore.toFixed(2)} / 10
      </p> */}
    </div>
  );
};

export default OverallRatingSummary;
