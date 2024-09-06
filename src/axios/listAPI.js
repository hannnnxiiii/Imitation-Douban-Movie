import { instance1, instance2 } from "./http"

// 获取正在热映
export const getNowShowingAPI = () => {
  return instance1({
    url: "/v2/movie/in_theaters",
    method: "POST",
    data: {
      start: 0,
      count: 41,
      city: "杭州",
      apikey: "0ab215a8b1977939201640fa14c66bab",
    },
  })
}

// 获取最近热门电影标签
export const getPopFilmTagAPI = () => {
  return instance2({
    url: "/j/search_tags?type=movie&source=index",
    method: "GET",
  })
}
