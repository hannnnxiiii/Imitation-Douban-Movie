<script setup lang="ts">
import BasicInfo from "@/components/BasicInfo.vue"
import { useRoute } from "vue-router"
import RelatedImages from "@/components/RelatedImages.vue"
import { useSubjectStore } from "@/stores/subjectStore"
import { storeToRefs } from "pinia"
import CommentSection from "@/components/CommentSection.vue"
import SubjectRight from "@/components/SubjectRight.vue"
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
    <div class="w-[1024px] flex justify-between">
      <!-- 左侧 -->
      <div class="w-[675px]">
        <!-- 基本信息 -->
        <BasicInfo></BasicInfo>
        <!-- 相关简介、图片和视频 -->
        <RelatedImages></RelatedImages>
        <!-- 评论区 -->
        <CommentSection></CommentSection>
      </div>
      <!-- 右侧 -->
      <div class="w-[300px]">
        <SubjectRight></SubjectRight>
      </div>
    </div>
  </div>
</template>
