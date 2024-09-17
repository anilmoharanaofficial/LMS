import axios from "axios";

export async function getCouress({ page = 1, limit = 9 }) {
  const { data: courseData } = await axios.get(
    `http://localhost:4626/api/v1/courses?page=${page}&limit=${limit}`
  );

  return courseData.data;
}
