import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className=" flex flex-row gap-15 items-center w-[100%]">
        <div className=" w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => {
            return (
              <div className=" flex flex-col mb-[-10px]" key={index}>
                <div className=" flex flex-row gap-6" key={index}>
                  <div className=" w-[60px] h-[60px]  flex items-center justify-center">
                    <div className=" bg-white h-[52px] w-[52px] rounded-[50%] relative shadow-[0px_0px_62px_0px_rgba(0,0,0,0.12)]"></div>
                    <img src={element.Logo} alt="logo" className=" absolute"/>
                  </div>

                  <div>
                    <h2 className=" font-semibold text-[18px]">
                      {element.heading}
                    </h2>
                    <p className=" text-base">{element.Description}</p>
                  </div>
                </div>
                 { index!==timeline.length-1 ? (<div className=" border-dotted w-[1px] h-[50px] bg-richblack-100 ml-7"></div>) : (<div></div>)}
                
              </div>
            );
          })}
        </div>

        <div className=" relative  shadow-blue-200 ">
          <img src={timeLineImage} alt="timeLineImage"  className=" shadow-white object-cover h-fit"/>

          <div className=" absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className=" flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className=" text-3xl font-bold">10</p>
              <p className=" text-caribbeangreen-300 text-sm"> Years <br/> Of Experience</p>
            </div>

            <div className=" flex gap-5 items-center px-7">
            <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
