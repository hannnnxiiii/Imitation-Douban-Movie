<script setup lang="ts">
import BasicInfo from "@/components/BasicInfo.vue"
import { getVideoDetailAPI } from "@/axios/detailAPI.js"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import RelatedImages from "@/components/RelatedImages.vue"
const route = useRoute()
interface People {
  alt: string
  name: string
}
// 详情页信息接口
interface VideoDetail {
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
  }
  ratings_count: number
}
// 详情页信息
const videoDetail = ref<VideoDetail>({} as VideoDetail)
// 获取详情页信息
const getVideoDetail = async () => {
  const res = await getVideoDetailAPI(route.params.id as string)
  console.log(res)
  videoDetail.value = res.data
}
onMounted(() => getVideoDetail())
</script>

<template>
  <div class="w-[1024px] mx-auto">
    <!-- 标题 -->
    <h1 class="text-[26px] pb-[15px] font-bold">
      <span class="text-[#494949]">{{ videoDetail.title }}</span>
      <span class="text-[#888]">({{ videoDetail.year }})</span>
    </h1>
    <div class="w-[1024px] bg-red-100 flex justify-between">
      <!-- 左侧 -->
      <div class="w-[675px] h-[3000px] bg-blue-300">
        <!-- 基本信息 -->
        <BasicInfo :video-detail="videoDetail"></BasicInfo>
        <!-- 相关简介、图片和视频 -->
        <RelatedImages></RelatedImages>
      </div>
      <!-- 右侧 -->
      <div class="w-[300px] h-[3000px] bg-orange-500"></div>
    </div>
  </div>
</template>
