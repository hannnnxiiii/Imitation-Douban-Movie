<script setup lang="ts">
import { ref } from "vue"

// 左侧导航栏信息
const navList = [
  {
    url: "",
    name: "豆瓣",
  },
  {
    url: "",
    name: "读书",
  },
  {
    url: "",
    name: "电影",
  },
  {
    url: "",
    name: "音乐",
  },
  {
    url: "",
    name: "同城",
  },
  {
    url: "",
    name: "小组",
  },
  {
    url: "",
    name: "阅读",
  },
  {
    url: "",
    name: "FM",
  },
  {
    url: "",
    name: "时间",
  },
  {
    url: "",
    name: "豆品",
  },
]
// 鼠标滑入，显示弹窗
// 绑定弹窗
const dialog = ref(null)
const showDialog = () => {
  if (dialog.value) {
    dialog.value.style.display = "block"
  }
}
const hiddenDialog = () => {
  if (dialog.value) {
    dialog.value.style.display = "none"
  }
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <div class="w-full h-7 bg-[#545652] flex justify-between min-w-[1024px]">
    <!-- 左侧导航列表 -->
    <ul class="flex text-[#d5d5d5] text-xs items-center h-full w-[480px]">
      <li
        v-for="item in navList"
        :key="item.name"
        class="px-3 hover:text-white hover:cursor-pointer"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>
      </li>
    </ul>
    <!-- 右侧登录注册 -->
    <div class="flex text-[#d5d5d5] text-xs items-center h-full">
      <div
        class="relative h-full"
        @mouseenter="showDialog"
        @mouseleave="hiddenDialog"
      >
        <div
          class="px-3 mr-[5px] hover:cursor-pointer hover:text-white leading-7"
        >
          下载豆瓣客户端
        </div>
        <!-- 弹窗 -->
        <div
          class="w-[251px] h-[473px] bg-green-300 absolute top-7 left-[-72px] hidden hover:block"
          ref="dialog"
        ></div>
      </div>
      <div class="px-3 mr-3 hover:cursor-pointer hover:text-white">
        登录/注册
      </div>
    </div>
  </div>
  <!-- 二级路由出口 -->
  <RouterView></RouterView>
</template>
