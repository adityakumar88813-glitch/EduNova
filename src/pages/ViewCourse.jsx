import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);

  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      try {
        // Get full course details
        const courseData = await getFullDetailsOfCourse(
          courseId,
          token
        );

        console.log("FULL COURSE DATA:", courseData);

        // -----------------------------------------
        // IMPORTANT: API failed / returned nothing
        // -----------------------------------------

        if (!courseData) {
          console.error("Course data is undefined");
          return;
        }

        if (!courseData.courseDetails) {
          console.error(
            "Course details not found:",
            courseData
          );
          return;
        }

        const courseDetails = courseData.courseDetails;

        // -----------------------------------------
        // Course Sections
        // -----------------------------------------

        const courseContent =
          courseDetails.courseContent || [];

        dispatch(
          setCourseSectionData(courseContent)
        );

        // -----------------------------------------
        // Entire Course
        // -----------------------------------------

        dispatch(
          setEntireCourseData(courseDetails)
        );

        // -----------------------------------------
        // Completed Lectures
        // -----------------------------------------

        dispatch(
          setCompletedLectures(
            courseData.completedVideos || []
          )
        );

        // -----------------------------------------
        // Total Lectures
        // -----------------------------------------

        let lectures = 0;

        courseContent.forEach((section) => {
          if (section?.subSection) {
            lectures += section.subSection.length;
          }
        });

        dispatch(setTotalNoOfLectures(lectures));

      } catch (error) {
        console.error(
          "SET COURSE SPECIFIC DETAILS ERROR:",
          error
        );
      }
    };

    if (courseId && token) {
      setCourseSpecificDetails();
    }
  }, [courseId, token, dispatch]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">

        {/* Sidebar */}
        <VideoDetailsSidebar
          setReviewModal={setReviewModal}
        />

        {/* Main Content */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Review Modal */}
     {reviewModal && (
  <CourseReviewModal
    setReviewModal={setReviewModal}
    courseId={courseId}
  />
)}
    </>
  );
};

export default ViewCourse;