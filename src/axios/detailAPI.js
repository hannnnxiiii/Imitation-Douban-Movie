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

// 获取电影剧照
export const getStillPhotosAPI = (id) => {
  return instance1({
    url: `/v2/movie/subject/${id}/photos`,
    method: "POST",
    data: {
      apikey: "0df993c66c0c636e29ecbb5344252a4a",
    },
  })
}

// 获取电影影评
export const getFilmReviewAPI = (id) => {
  return instance1({
    url: `/v2/movie/subject/${id}/reviews`,
    method: "POST",
    data: {
      apikey: "0df993c66c0c636e29ecbb5344252a4a",
    },
  })
}
