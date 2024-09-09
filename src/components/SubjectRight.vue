<script setup lang="ts"></script>

<template>
  <!-- 购票 -->
  <div class="h-[70px] bg-[#F0F3F5] flex items-center justify-center mb-[40px]">
    <div
      class="h-[30px] w-[160px] bg-[#268dcd] text-white text-[13px] text-center leading-[30px] hover:cursor-pointer rounded-[2px]"
    >
      购票
    </div>
  </div>
  <!-- 广告 -->
  <div class="bg-[#f0f3f5] h-[250px] leading-[250px] text-center mb-[20px]">
    广告位招租
  </div>
  <div class="bg-[#f0f3f5] h-[100px] leading-[100px] text-center mb-[20px]">
    广告位招租
  </div>
  <!-- 片单推荐 -->
  <div class="mb-[40px]">
    <h2
      class="h-[36px] pb-[12px] border-b-[1px] border-dashed text-[#072] text-[16px]"
    >
      以下片单推荐 · · · · · · (
      <a
        href=""
        class="text-[13px] text-[#37a] hover:text-white hover:bg-[#37a]"
        >全部</a
      >
      )
    </h2>
    <div
      class="py-[4.5px] border-b-[1px] border-dashed text-[13px] text-[#666]"
      v-for="item in 5"
    >
      <a href="" class="text-[#37a] hover:text-white hover:bg-[#37a] mr-[5px]"
        >期待的各种动画剧场版</a
      >
      (Aria.粉。)
    </div>
  </div>
  <!-- 谁在看这部电影 -->
  <div class="mb-[40px]">
    <h2 class="h-[36px] pb-[12px] text-[#072] text-[16px]">
      谁在看这部电影 · · · · · ·
    </h2>
    <div
      class="py-[12px] flex text-[13px] border-b-[1px] border-dashed"
      v-for="item in 3"
    >
      <img src="https://img2.doubanio.com/icon/u163245682-1.jpg" alt="" />
      <div class="ml-[10px]">
        <a href="" class="text-[#37a] hover:text-white hover:bg-[#37a]">流涩</a>
        <div class="text-[#666] flex items-center">
          <span>1分钟前</span>
          <span>看过</span>
          <el-rate
            style="
              --el-rate-icon-size: 16px;
              height: 16px;
              --el-rate-icon-margin: 0px;
            "
            disabled
            :model-value="4"
          ></el-rate>
        </div>
      </div>
    </div>
    <div class="my-[12px] text-[13px] text-[#37a]">
      <a href="" class="hover:bg-[#37a] hover:text-white">18234人看过</a>
      /
      <a href="" class="hover:bg-[#37a] hover:text-white">20185人想看</a>
    </div>
  </div>
  <!-- 广告 -->
  <div class="my-[40px] h-[250px] leading-[250px] text-center bg-[#f0f3f5]">
    广告位招租
  </div>
  <!-- 订阅评论 -->
  <div class="my-[13px] text-[13px] text-[#666]">
    <div>订阅通往夏天的隧道，再见的出口的评论:</div>
    <a href="" class="text-[#37a] hover:text-white hover:bg-[#37a]">
      feed: rss 2.0</a
    >
  </div>
</template>
