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
              style="
                height: 11px;
                --el-rate-icon-margin: -1px;
                margin-left: 3px;
                --el-rate-icon-size: 14px;
              "
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
  <div class="mb-[25px]">
    <!-- 头部 -->
    <div class="h-[24px] mt-[16px] mb-[12px] flex items-center justify-between">
      <h2 class="text-[#007722] text-[16px]">
        通往夏天的隧道，再见的出口的影评 · · · · · ·
        <span class="text-[13px] text-[#666]"
          >(
          <a href="" class="text-[#37A] hover:text-white hover:bg-[#37A]"
            >全部 77 条</a
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
        >我要写影评</el-button
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
        <div class="text-[13px] flex items-center justify-start">
          <div class="flex items-center">
            <img
              class="w-[24px] h-[24px] rounded-full mr-[10px]"
              src="https://img3.doubanio.com/icon/u116531248-2.jpg"
              alt=""
            />
            <a
              href=""
              class="mr-[3px] text-[#37A] hover:text-white hover:bg-[#37a]"
              >kakakarl</a
            >
            <el-rate
              :model-value="4"
              disabled
              style="
                height: 11px;
                --el-rate-icon-margin: -1px;
                margin-left: 3px;
                --el-rate-icon-size: 14px;
              "
            />
            <span class="ml-[6px] text-[#aaa]">2023-07-21 21:31:57</span>
          </div>
        </div>
        <!-- 内容 -->
        <div class="mt-[10px] text-[13px]">
          <!-- 标题 -->
          <h2 class="mb-[10px]">
            <a
              href=""
              class="text-[14px] text-[#37a] hover:text-white hover:bg-[#37a]"
              >新时代的商业罐头，老体系的命题作文</a
            >
          </h2>
          <!-- 剧透提醒 -->
          <div
            class="mb-[5px] pl-[8px] border-l-[1px] border-black text-[#9b9b9b] h-[13px] leading-[13px]"
          >
            这篇影评可能有剧透
          </div>
          <!-- 影评内容 -->
          <p class="text-[#494949]">
            赶在影片下线前去影院看了。对原作完全没有了解，看cast和staff也没有大手，因此期待值并不高。实际看完以后虽然有诸多抱怨，但并不觉得踩雷。在开头先给出结论——一部彻底的工业化青春动画电影，一篇严格遵照《你的名字》体系且没有任何突破的命题作文。适合在流媒体上线时随...(<span
              class="text-[#37A] hover:text-white hover:bg-[#37a] hover:cursor-pointer"
              >展开</span
            >)
          </p>
        </div>
        <!-- 互动区 -->
        <div class="flex items-center mt-[18px]">
          <el-button
            style="
              height: 21px;
              padding: 4px 6px;
              font-size: 12px;
              color: #37a;
              border: 0;
              border-radius: 2px;
            "
            color="#f0f7f9"
            >△ 40</el-button
          >
          <el-button
            style="
              height: 21px;
              padding: 4px 6px;
              font-size: 12px;
              color: #37a;
              border: 0;
              border-radius: 2px;
            "
            color="#f0f7f9"
            >▽ 6</el-button
          >
          <span
            class="text-[13px] text-[#37a] hover:text-white hover:bg-[#37a] ml-[10px] hover:cursor-pointer"
            >6回应</span
          >
        </div>
      </li>
    </ul>
    <div class="text-[13px]">
      >
      <a href="" class="text-[#37a] hover:text-white hover:bg-[#37a]"
        >更多影评 77篇</a
      >
    </div>
  </div>
  <!-- 讨论区 -->
  <div>
    <div
      class="h-[36px] mt-[80px] pb-[12px] flex items-center justify-between border-b-[1px] border-dashed"
    >
      <h2 class="text-[#007722] text-[16px]">讨论区 · · · · · ·</h2>
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
        >添加新讨论</el-button
      >
    </div>
    <div
      class="py-[8px] text-[13px] text-[#666] flex border-b-[1px] border-dashed"
      v-for="item in 5"
    >
      <span class="w-[350px] pr-[3px]">
        <a href="" class="text-[#37a] hover:text-white hover:bg-[#37a] truncate"
          >有没有画风类似的番！</a
        >
      </span>
      <span class="pr-[3px] w-[141px]"
        >来自<a
          href=""
          class="text-[#37a] hover:text-white hover:bg-[#37a] truncate"
          >豆友wzrafz0wZU</a
        ></span
      >
      <span class="pr-[3px] w-[45px]">4 回应</span>
      <span>2024-09-09 00:53:21</span>
    </div>
    <div class="flex items-center justify-end my-[13px]">
      <a
        href=""
        class="text-[13px] text-[#37a] hover:text-white hover:bg-[#37a]"
      >
        > 去这部影片的讨论区（全部42条）</a
      >
    </div>
  </div>
</template>
