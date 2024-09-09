<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue"
</script>

<template>
  <!-- 短评 -->
  <div>
    <!-- 头部 -->
    <div class="h-[24px] mt-[16px] mb-[12px] flex items-center justify-between">
      <h2 class="text-[#007722] text-[16px]">
        通往夏天的隧道，再见的出口的短评 · · · · · ·
        <span class="text-[13px] text-[#666]"
          >(
          <a href="" class="text-[#37A] hover:text-white hover:bg-[#37A]"
            >全部 6003 条</a
          >
          )</span
        >
      </h2>
      <el-button
        :icon="Edit"
        style="
          height: 24px;
          color: #ca6445;
          width: 106px;
          font-size: 13px;
          border-radius: 2px;
        "
        color="#fae9da"
        >我要写短评</el-button
      >
    </div>
    <!-- 分页标签 -->
    <div class="pb-[15px] text-[13px] text-[#37A]">
      <a href="" class="text-[#111]">热门</a>
      /
      <a href="" class="hover:text-white hover:bg-[#37a]">最新</a>
      /
      <a href="" class="hover:text-white hover:bg-[#37a]">好友</a>
    </div>
    <!-- 内容 -->
    <ul>
      <li class="py-[14px] border-t-[1px]" v-for="item in 5">
        <!-- 第一行 -->
        <div class="text-[13px] flex items-center justify-between">
          <div class="flex items-center">
            <a
              href=""
              class="mr-[3px] text-[#37A] hover:text-white hover:bg-[#37a]"
              >kakakarl</a
            >
            看过
            <el-rate
              :model-value="4"
              disabled
              style="height: 11px; --el-rate-icon-margin: 0px; margin-left: 3px"
            />
            <span class="ml-[6px] text-[#aaa]">2023-07-21 21:31:57 湖南</span>
          </div>
          <div>
            212
            <span
              class="text-[#37a] hover:text-white hover:bg-[#37a] hover:cursor-pointer"
              >有用</span
            >
          </div>
        </div>
        <!-- 内容 -->
        <p class="text-[13px] text-[#666]">
          3.5，还蛮简单纯净的，还是很传统的“洞中一日，世上千年”的概念。在中国会成为神仙，在美国会去到末世，在日本谈了个恋爱。
        </p>
      </li>
    </ul>
    <div class="text-[13px]">
      >
      <a href="" class="text-[#37a] hover:text-white hover:bg-[#37a]"
        >更多短评 6003条</a
      >
    </div>
  </div>

  <!-- 影评 -->
  <!-- 讨论区 -->
</template>
