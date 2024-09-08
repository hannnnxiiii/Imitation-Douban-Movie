import { instance1, instance2 } from "./http"
let abortController = null
// 获取正在热映
export const getNowShowingAPI = () => {
  return instance1({
    url: "/v2/movie/in_theaters",
    method: "POST",
    data: {
      start: 0,
      count: 56,
      city: "杭州",
      apikey: "0ab215a8b1977939201640fa14c66bab",
    },
  })
}

// 获取最近热门电影标签
export const getPopTagAPI = (type) => {
  return instance2({
    url: "/j/search_tags",
    method: "GET",
    params: {
      type,
      source: "index",
    },
  })
}

// 获取最近热门电影列表
let typeFlag = ""
export const getRecentlyPopAPI = (tag, type) => {
  // 如果有之前的请求，取消它
  if (abortController && typeFlag === type) {
    abortController.abort()
    // console.log(abortController.abort())
  }
  typeFlag = type
  // 创建新的 AbortController 实例
  abortController = new AbortController()
  const signal = abortController.signal
  return instance2({
    url: "/j/search_subjects",
    method: "GET",
    params: {
      type,
      tag,
      page_limit: "50",
      page_start: "0",
    },
    signal: signal,
  })
}

// 获取电影悬浮窗详情数据
export const getFilmFloatAPI = (subject_id) => {
  return instance2({
    url: "/j/subject_abstract",
    method: "GET",
    params: {
      subject_id,
    },
  })
}
