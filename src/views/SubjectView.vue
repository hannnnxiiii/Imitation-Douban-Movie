<script setup lang="ts">
import BasicInfo from "@/components/BasicInfo.vue"
import { useRoute } from "vue-router"
import RelatedImages from "@/components/RelatedImages.vue"
import { useSubjectStore } from "@/stores/subjectStore"
import { storeToRefs } from "pinia"
import CommentSection from "@/components/CommentSection.vue"
const subjectStore = useSubjectStore()
const route = useRoute()
subjectStore.getInfoObj(route.params.id as string)
const { videoInfo } = storeToRefs(subjectStore)
</script>

<template>
  <div class="w-[1024px] mx-auto">
    <!-- 标题 -->
    <h1 class="text-[26px] pb-[15px] font-bold">
      <span class="text-[#494949]">{{ videoInfo.title }}</span>
      <span class="text-[#888]">({{ videoInfo.year }})</span>
    </h1>
    <div class="w-[1024px] bg-red-100 flex justify-between">
      <!-- 左侧 -->
      <div class="w-[675px] h-[3000px] bg-blue-300">
        <!-- 基本信息 -->
        <BasicInfo></BasicInfo>
        <!-- 相关简介、图片和视频 -->
        <RelatedImages></RelatedImages>
        <!-- 评论区 -->
        <CommentSection></CommentSection>
      </div>
      <!-- 右侧 -->
      <div class="w-[300px] h-[3000px] bg-orange-500"></div>
    </div>
  </div>
</template>
