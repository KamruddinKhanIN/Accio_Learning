import React from "react";
import intructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className=" mt-16 mb-32">
      <div className=" flex flex-col gap-6">
        <div className=" flex flex-row gap-20 items-center">
          <img
            src={intructorImage}
            alt=""
            className=" video-wrapper-2 shadow-white w-[50%]"
          />

          <div className="w-[50%] flex flex-col gap-10">
            <div className="text-4xl font-semobold w-[50%]">
              Become an {" "}
              <HighlightText text={"Instructor"} />
            </div>

            <p className="font-medium text-[16px]  text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex flex-row gap-2 items-center">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
