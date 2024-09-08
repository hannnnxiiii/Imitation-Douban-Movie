import { instance1, instance2 } from "./http"

export const getVideoDetailAPI = (id) => {
  return instance1({
    url: `/v2/movie/subject/${id}`,
    method: "POST",
    data: {
      apikey: "0ab215a8b1977939201640fa14c66bab",
    },
  })
}
