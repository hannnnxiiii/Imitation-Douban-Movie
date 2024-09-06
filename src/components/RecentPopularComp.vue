<script setup lang="ts">
import { ref } from "vue"
const props = defineProps<{
  navList: object
  itemList: object
}>()
// 下一页
const handleNext = () => {
  if (carousel.value) {
    console.log(1)

    carousel.value.next()
  }
}
// 上一页

const handlePrev = () => {
  if (carousel.value) {
    carousel.value.prev()
  }
}

// 高亮激活选项参数
const activeIndex = ref<number>(0)
// 跑马灯接口
interface Carousel {
  prev: () => void
  next: () => void
}
// 跑马灯对象
const carousel = ref<Carousel | null>(null)
</script>

<template>
  <div class="h-[524px] bg-blue-300 overflow-hidden relative">
    <!-- 头部 -->
    <div class="h-[36px] bg-yellow-100 border-b mb-[18px]">
      <div class="h-[25px] flex justify-between items-end">
        <!-- 头部左侧 -->
        <div class="flex">
          <!-- 标题 -->
          <slot name="title">
            <div>最近热门电影</div>
          </slot>
          <!-- 导航 -->
          <ul class="flex text-[13px] items-end">
            <li
              v-for="(item, index) in props.navList"
              class="ml-[20px] text-[#9B9B9B] hover:cursor-pointer hover:text-white hover:bg-[#208ACC]"
              :class="{ active: index === activeIndex }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 头部右侧 -->
        <div
          class="text-[13px] text-[#208ACC] hover:text-white hover:bg-[#208ACC]"
        >
          <RouterLink to="/">更多>></RouterLink>
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <el-carousel
      trigger="click"
      height="470px"
      arrow="never"
      style="
        --el-carousel-indicator-width: 6px;
        --el-carousel-indicator-height: 6px;
      "
      :interval="6000"
      ref="carousel"
    >
      <el-carousel-item v-for="item in 6" :key="item">
        <div class="flex flex-wrap">
          <el-popover
            v-for="(item, index) in 10"
            placement="right-start"
            :width="350"
            trigger="hover"
            :show-arrow="false"
            :show-after="500"
            transition="none"
          >
            <template #reference>
              <div
                class="w-[115px] h-[210px] bg-yellow-200 mr-[25px] mb-[10px] flex flex-col items-center"
                :class="{ clearMargin: (index + 1) % 5 === 0 }"
              >
                <img src="" alt="" class="h-[161px] bg-red-100 w-full" />
                <div class="text-[13px] text-[#37A]">
                  狗镇
                  <span class="text-[#E09015] text-[13px]">7.0</span>
                </div>
              </div>
            </template>
            <template #default>
              <div>
                <!-- 上半部分 -->
                <div class="p-[20px]">
                  <!-- 电影名 -->
                  <RouterLink to="/">
                    <span
                      class="text-[18px] text-[#37a] hover:text-white hover:bg-[#37a] hover:cursor-pointer"
                      >因果报应 mahh (2024)
                    </span>
                  </RouterLink>
                  <!-- 评分 -->
                  <div class="flex items-center">
                    <el-rate
                      :model-value="4"
                      disabled
                      style="--el-rate-icon-margin: -1px"
                    />
                    <span class="text-[13px] text-[#ff9900] ml-[10px]">8</span>
                  </div>
                  <!-- 标签 -->
                  <div class="flex justify-start items-start flex-wrap">
                    <span
                      class="bg-[#f5f5f5] text-[13px] px-[8px] py-[2px] rounded-[12px] mx-[3px] my-[3px]"
                      v-for="item in 5"
                      >94分钟</span
                    >
                  </div>
                  <!-- 按钮 -->
                  <div class="mt-[5px]">
                    <el-button
                      style="border-radius: 0%; width: 60px; height: 25px"
                      >想看</el-button
                    >
                    <el-button
                      style="border-radius: 0%; width: 60px; height: 25px"
                      >看过</el-button
                    >
                  </div>
                </div>
                <!-- 短评 -->
                <div
                  class="border-t-[1px] bg-[#f5f5f5] p-[20px] text-[13px] text-[#666]"
                >
                  只能说坏人就是坏人，他会对自己家人好，但他还是人品低劣。好人就是好人，就算不是自己生的，还是会用正义和善良去对待，前边节奏太慢了，后边揭开一切，让人唏嘘，女孩子很坚强，警察比较有趣，虽然贪财，但真的办事
                  <span class="text-[12px] text-[#aaa]"
                    >- AAA-渔经理୧⍤⃝💖的短评</span
                  >
                </div>
              </div>
            </template>
          </el-popover>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-button
      circle
      class="absolute top-[494px] left-[270px]"
      style="
        width: 18px;
        height: 18px;
        background-color: #6d99d2;
        color: white;
        border: 0;
      "
      @click="handlePrev"
      ><</el-button
    >
    <el-button
      circle
      class="absolute top-[494px] left-[375px]"
      style="
        width: 18px;
        height: 18px;
        background-color: #6d99d2;
        color: white;
        border: 0;
      "
      @click="handleNext"
      >></el-button
    >
  </div>
</template>

<style scoped>
.active {
  color: black;
}
.clearMargin {
  margin-right: 0;
}
.el-carousel :deep(.el-carousel__button) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #6198d7;
}
:global(.el-popover.el-popper) {
  border-radius: 0% !important;
  box-shadow: none;
  padding: 0;
}
</style>
