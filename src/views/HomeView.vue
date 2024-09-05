<script setup lang="ts">
import { ref } from "vue"
import { Search } from "@element-plus/icons-vue"
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
// 搜索信息
const searchInfo = ref("")
// 头部导航栏信息
const headerList = [
  {
    url: "",
    name: "影讯&购票",
  },
  {
    url: "",
    name: "选电影",
  },
  {
    url: "",
    name: "电视剧",
  },
  {
    url: "",
    name: "排行榜",
  },
  {
    url: "",
    name: "影评",
  },
  {
    url: "",
    name: "2023年度榜单",
  },
  {
    url: "",
    name: "2023年度报告",
  },
]
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
  <!-- 头部 -->
  <div class="bg-[#F0F3F5] w-full">
    <div class="h-[75px] w-[1024px] flex items-center mx-auto">
      <div class="text-[#208ACC] text-3xl font-bold ml-2 mr-8">
        <RouterLink to="/"> 豆瓣电影 </RouterLink>
      </div>
      <el-input
        v-model="searchInfo"
        style="width: 470px"
        placeholder="搜索电影、电视剧、综艺、影人"
      />
      <el-button :icon="Search" class="w-[30px]" type="info" />
    </div>
    <!-- 头部导航栏 -->
    <div class="h-10 w-[1024px] flex mx-auto items-center relative">
      <ul class="flex">
        <li
          v-for="item in headerList"
          :key="item.name"
          class="ml-2 mr-6 text-sm text-[#208ACC] hover:text-white hover:bg-[#208ACC]"
        >
          <RouterLink to="/">
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
      <a
        href=""
        class="w-[186px] h-24 absolute top-[-60px] left-[700px]"
        style="
          background: url(//img3.doubanio.com/dae/accounts/resources/78fadc7/movie/assets/annual_2023.png)
            center/contain no-repeat;
        "
      ></a>
    </div>
  </div>
  <!-- 二级路由出口 -->
  <RouterView></RouterView>
</template>
