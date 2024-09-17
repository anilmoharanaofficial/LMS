import { useQuery } from "react-query";
import { getCouress } from "../../services/coursesApi";

function useCourses() {
  const { data: courses, isLoading } = useQuery({
    queryFn: getCouress,
    queryKey: ["Course"],
  });

  return { courses, isLoading };
}

export default useCourses;
