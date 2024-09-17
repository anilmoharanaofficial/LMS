import styled from "styled-components";
import Spinner from "../../UI/Spinner";
import useCourses from "./useCourses";
import CourseCard from "./CourseCard";

const StyledCourseBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Courses() {
  const { courses, isLoading } = useCourses();

  if (isLoading) return <Spinner />;

  return (
    <StyledCourseBox>
      {courses.map((course, i) => (
        <CourseCard course={course} key={i} />
      ))}
    </StyledCourseBox>
  );
}

export default Courses;
