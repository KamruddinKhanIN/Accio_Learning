import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import CodeBloacks from "../components/core/Homepage/CodeBloacks";
import Banner from "../assets/Images/banner.mp4";
import "./Home.css";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}

      <div
        className=" relative mx-auto flex flex-col w-11/12 items-center text-white justify-between
        max-w-maxContent"
      >
        <Link to={"/signup"}>
          <div
            className=" group mx-auto rounded-full bg-richblack-800 
                 font-bold text-richblack-200 transition-all duration-200 
                 hover:scale-95 w-fit mt-16 p-1 shadow-sm"
          >
            <div
              className=" flex flex-row items-center  gap-2
                    rounded-full px-10 py-[5px] group-hover:bg-richblack-900"
            >
              <p>Become An Instructor</p> <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className=" text-4xl font-semibold mt-7 ">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className=" flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/aboutus"}>
            Learn More
          </CTAButton>

          <CTAButton linkto={"/contactus"}>Book A Demo</CTAButton>
        </div>

        <div className=" shadow-blue-200 mx-3 my-12">
          <div className="video-wrapper">
            <video src={Banner} type="video/mp4" muted loop autoPlay></video>
          </div>
        </div>

        {/* Code Section 1 */}

        <div>
          <CodeBloacks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"Coding Potential"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              active: true,
              text: `Try It Yourself`,
              linkto: "/signup",
            }}
            ctabtn2={{ active: false, text: "Learn More", linkto: "/aboutus" }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          ></CodeBloacks>
        </div>

        {/* Code Section 2 */}

        <div>
          <CodeBloacks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"Coding In Seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              active: true,
              text: `Continue Lesson`,
              linkto: "/signup",
            }}
            ctabtn2={{ active: false, text: "Learn More", linkto: "/aboutus" }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          ></CodeBloacks>
        </div>
      </div>

      {/* Section 2 */}

      {/* Section 3 */}

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Home;
