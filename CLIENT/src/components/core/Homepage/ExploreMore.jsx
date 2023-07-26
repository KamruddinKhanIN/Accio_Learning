import React, { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";




const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

const ExploreMore = () => {

    const [currentTab, setcurrentTab] = useState(tabsName[0]);
    const [courses, setcourses] = useState(HomePageExplore[0].courses);
    const [curentCard, setcurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard= (value)=>{
      setcurrentTab(value);
      const result = HomePageExplore.filter((course)=>course.tag===value);
      setcourses(result[0].courses);
      setcurrentCard(result[0].courses[0].heading)
    }


  return (
  <div className="flex flex-col justify-center items-center">
      <div className=" text-4xl font-semibold text-center">
        Unlock the {" "}
        <HighlightText text={"Power of Code"}/>
      </div>

      <div className=" text-center text-richblack-300 text-[16px] mt-3 ">
      Learn to Build Anything You Can Imagine
      </div>

      <div className=" flex flex-row bg-richblack-800 rounded-full mb-[130px] mt-3 border-richblack-100 px-1 py-1">
        {
            tabsName.map((element,index)=>{
                return (
                    <div className={` text-[16px] flex flex-row items-center gap-2
                    ${element===currentTab?
                    " bg-richblack-900 text-richblack-5 font-medium":
                    " text-richblack-200"} rounded-full transition-all
                    duration-200 cursor-pointer hover:text-white px-7 py-3`}
                    key={index}
                    onClick={()=>setMyCard(element)}>
                      {element}
                    </div>
                )}
            )
        }
      </div>

      <div className=" flex flex-row absolute gap-10 justify-between items-center w-10/12">
        {courses.map((element,index)=>{
            return(
                <CourseCard/>
            )
        })}
      </div>
  </div>
  );
};

export default ExploreMore;
