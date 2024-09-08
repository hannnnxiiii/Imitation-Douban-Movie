<!-- 最受欢迎的影评 -->
<script setup lang="ts"></script>

<template>
  <div class="w-full bg-yellow-500 mb-[36px]">
    <!-- 头部 -->
    <div
      class="w-full h-[36px] border-b-[1px] mb-[18px] bg-blue-200 pb-[10px] flex items-end"
    >
      <div>最受欢迎的影评</div>
      <RouterLink to="/"
        ><div
          class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A] mx-[10px]"
        >
          更多热门影评》
        </div></RouterLink
      >
      <RouterLink to="/"
        ><div class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]">
          新片影评》
        </div></RouterLink
      >
    </div>
    <!-- 内容 -->
    <div class="w-full">
      <div
        v-for="item in 4"
        class="pb-[24px] border-b-[1px] mb-[24px] h-[144px] flex items-start justify-between"
      >
        <!-- 图片 -->
        <div class="w-[68px] h-[95px] bg-red-100">
          <img
            src="https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2912132824.webp"
            alt=""
          />
        </div>
        <!-- 文字 -->
        <div class="w-[592px] h-full bg-purple-500">
          <a href="/"
            class="text-[15px] text-[#669] hover:text-white hover:bg-[#669]"
          >
            今天首映，刚看完，来说一下感受。
          </a href="/">
          <div class="text-[13px] text-[#666] py-[5px]">
            <a href="/" class="hover:bg-[#669] hover:text-white"
              >会飞的蜗牛🐌</a
            >
            评论
            <a href="/" class="hover:bg-[#669] hover:text-white"
              >《新龙门客栈》</a
            >
          </div>
          <div class="text-[13px]">
            整体评价，有看点，但不如抖音直播的剧版。本文涉及和抖音直播的剧版本比较。介意的请略过。
            宣传的时候标有纪录片，一开始以为是讲这部新龙门客栈的越剧是如何诞生人物如何塑造的，但是电影除了开头显示观众进剧...
            <a href="/" class="text-[#669] hover:text-white hover:bg-[#669]"
              >(全文)</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
