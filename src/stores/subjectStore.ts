import { ref, computed } from "vue"
import { defineStore } from "pinia"
import {
  getFilmReviewAPI,
  getStillPhotosAPI,
  getVideoDetailAPI,
} from "@/axios/detailAPI.js"
interface People {
  alt: string
  name: string
  avatars: {
    small: string
  }
}
interface Photos {
  photos_count: number
  cover: string
  alt: string
}
interface Reviews {
  alt: string
  author: {
    alt: string
    avatar: string
    name: string
  }
  comments_count: number
  content: string
  created_at: string
  rating: {
    value: number
  }
  summary: string
  title: string
  useful_count: string
  useless_count: string
}
interface VideoInfo {
  title: string
  year: string
  images: {
    small: string
  }
  directors: People[]
  casts: People[]
  countries: string[]
  genres: string[]
  aka: string[]
  rating: {
    average: number
    details: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
  }
  ratings_count: number
  photos: Photos[]
  pubdates: string[]
  summary: string
  durations: string[]
  reviews: Reviews[]
  comments_count: number
  reviews_count: number
  id: string
}

export const useSubjectStore = defineStore("subject", () => {
  //   详情页完整信息
  const videoInfo = ref<VideoInfo>({
    title: "",
    year: "",
    images: { small: "" },
    directors: [],
    casts: [],
    countries: [],
    genres: [],
    aka: [],
    rating: {
      average: 0,
      details: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
    ratings_count: 1,
    photos: [],
    pubdates: [],
    summary: "",
    durations: [],
    reviews: [],
    comments_count: 0,
    reviews_count: 0,
    id: "",
  })

  // 获取详情页完整信息
  const getInfoObj = async (id: string) => {
    const res1 = await getStillPhotosAPI(id)
    console.log(res1)

    const res2 = await getVideoDetailAPI(id)
    videoInfo.value = {
      ...videoInfo.value,
      ...res2.data,
      rating: {
        average: 0,
        details: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      },
    }
    const res3 = await getFilmReviewAPI(id)
    console.log(res3)
    videoInfo.value.rating = res1.data.subject.rating

    videoInfo.value.photos = res1.data.photos.slice(0, 4)
    videoInfo.value.pubdates = res1.data.subject.pubdates
    videoInfo.value.durations = res1.data.subject.durations
    videoInfo.value.reviews = res3.data.reviews
    console.log(videoInfo.value)
  }

  return { videoInfo, getInfoObj }
})
