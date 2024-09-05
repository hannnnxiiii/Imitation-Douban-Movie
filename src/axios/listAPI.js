import instance from "./http"

// 获取正在热映
export const getNowShowingAPI = () => {
  return instance({
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
