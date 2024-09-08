<script setup lang="ts">
import { ref } from "vue"
// 轮播图接口
interface Carousle {
  activeIndex: number
  prev: () => void
  next: () => void
}
const carousel = ref<Carousle | null>(null)
</script>

<template>
  <div class="w-full h-[293px] mb-[36px]">
    <!-- 头部 -->
    <div
      class="pb-[10px] w-full h-[35px] mb-[18px] border-b-[1px] flex justify-between"
    >
      <div>热门推荐</div>
      <div class="flex items-end">
        <div class="text-[13px]">
          {{ ((carousel?.activeIndex as number) % 2) + 1 }}/2
        </div>
        <div>
          <el-button
            style="
              width: 18px;
              height: 18px;
              padding: 0;
              border-radius: 0;
              border: 0;
              background-color: #6d99d2;
              color: white;
              margin-left: 15px;
            "
            @click="carousel?.prev"
            ><</el-button
          >
          <el-button
            style="
              width: 18px;
              height: 18px;
              padding: 0;
              border-radius: 0;
              border: 0;
              background-color: #6d99d2;
              color: white;
              margin-left: 5px;
            "
            @click="carousel?.next"
            >></el-button
          >
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="h-[240px] w-full">
      <el-carousel
        height="240px"
        arrow="never"
        ref="carousel"
        indicator-position="none"
      >
        <el-carousel-item v-for="item in 2" :key="item">
          <div class="flex h-full w-full hover:cursor-pointer">
            <div class="w-[350px] h-full">
              <img
                src="https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/m/public/742d8ac674f1053.jpg"
                alt=""
              />
            </div>
            <div class="w-[325px] h-full p-[24px] pt-[48px]">
              <div class="mb-[18px] text-[18px] leading-[28px]">
                标题标题标题标题标题标题标题标题标题
              </div>
              <div class="text-[13px] text-[#999] leading-[20px]">
                副标题副标题副标题副标题副标题副标题副标题副标题副标题
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
