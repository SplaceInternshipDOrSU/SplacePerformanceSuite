import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RatingDisplay = ({ rating, maxScore, textSize = "text-sm" , title,message}) => {
  const percentage = Math.min(100, (rating / maxScore) * 100);

  const getColor = (percentage) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 50) return 'orange';
    return 'red';
  };

  const color = getColor(percentage);

  return (
    <div className="flex flex-row bg-white justify-between shadow-2xl items-centers p-[2px] 2xl:p-2 rounded-md">
        <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
                pathColor: color,
                trailColor: '#161D31',
                strokeLinecap: 'round',
            })}
            className="w-[70px] h-[70px] 2xl:w-[80px] 2xl:h-[80px] bg-white rounded-full border-2 shadow-lg flex justify-center items-center text-center p-0">
              <div className="flex flex-col items-center border-2  h-[55px] w-[55px] 2xl:h-[67px] 2xl:w-[67px] 2xl:mt-2  xl:mt-0  text-center xl:mb-2  justify-center rounded-full" style={{ color, borderColor: color }}>
                  <span className={`${textSize} font-semibold`} style={{ color, borderColor: color }}>
                  {rating} / {maxScore}
                  </span>
              </div>

        </CircularProgressbarWithChildren>
    <div className="text-slate-900 pl-3 text-wrap text-start w-9/12 pt-2">
        <h2 className='font-bold text-sm'>{title}</h2>
        <div className="text-start">
            <p className='text-xs'>{message? `${message}`:`"No Comment"`}</p>
        </div>
    </div>

    </div>
  );
};

export default RatingDisplay;
