<script setup lang="ts">
import { computed, onMounted, ref, Transition } from "vue"
import { getNowShowingAPI } from "@/axios/listAPI.js"
// 当前页数
const currentPage = ref(1)
const value = ref(2)
const doubleValue = computed(() => value.value * 2)
// 正在热映列表
const nowShowingList = ref([])
// 获取正在热映
const getNowShowing = async () => {
  console.log(1)

  const res = await getNowShowingAPI()
  console.log(res)
  nowShowingList.value = res.data.subjects
}
// onMounted(() => getNowShowing())
// 翻页进度
const translateCount = ref(0)
// 下一页
const handleNext = () => {
  translateCount.value -= 700
}
// 上一页
const handlePrev = () => {
  translateCount.value += 700
}
// 悬浮框对象
const detailDialog = ref(null)
// 弹窗倒计时
let timer: number | null = null
// 鼠标移入，1s后显示详情弹窗
const showDetailDialog = (index: number) => {
  timer = setTimeout(() => {
    if (detailDialog.value) {
      detailDialog.value[index].style.display = "block"
    }
  }, 500)
}
// 鼠标移出，关闭定时器，立马隐藏详情弹窗
const hideDetailDialog = (index: number) => {
  if (timer) {
    clearTimeout(timer)
  }
  if (detailDialog.value) {
    detailDialog.value[index].style.display = "none"
  }
}
</script>

<template>
  <div class="flex w-[1024px] mx-auto justify-between">
    <!-- 左侧 -->
    <div class="w-[675px] h-[3000px] bg-green-300">
      <!-- 正在热映 -->
      <div class="h-[324px] bg-blue-300 overflow-hidden">
        <!-- 头部 -->
        <div class="h-[36px] bg-yellow-100 border-b mb-[18px]">
          <div class="h-[25px] flex justify-between">
            <div class="flex items-center w-[260px] justify-between h-[25px]">
              正在热映
              <div
                class="text-[13px] text-[#208ACC] hover:text-white hover:bg-[#208ACC]"
              >
                <RouterLink to="/">全部正在热映>></RouterLink>
              </div>
              <div
                class="text-[13px] text-[#208ACC] hover:text-white hover:bg-[#208ACC]"
              >
                <RouterLink to="/">即将上映>></RouterLink>
              </div>
            </div>
            <div class="flex w-[90px] justify-between items-center">
              <div class="text-[12px]">{{ currentPage }} / 8</div>
              <el-pagination
                layout="prev, next"
                :total="50"
                size="small"
                v-model:current-page="currentPage"
                @next-click="handleNext"
                @prev-click="handlePrev"
              />
            </div>
          </div>
        </div>
        <!-- 内容区 -->
        <div
          class="flex items-center transition-all duration-700"
          style="width: max-content"
          :style="`translate: ${translateCount}px`"
        >
          <div
            class="bg-red-100 w-[115px] h-[250px] flex flex-col items-center mr-[25px] relative"
            v-for="(item, index) in 41"
            :key="item"
            @mouseenter="showDetailDialog(index)"
            @mouseleave="hideDetailDialog(index)"
          >
            <img src="" alt="" class="h-[172px] bg-yellow-200 w-full" />
            <div class="text-[14px] mt-[5px]">电影名</div>
            <div class="text-[#ff9900]">
              <el-rate
                v-model="value"
                disabled
                size="small"
                style="--el-rate-icon-margin: 0px"
              />
              {{ doubleValue }}
            </div>
            <el-button type="primary" style="height: 24px">选座购票</el-button>
            <!-- 悬浮框 -->
            <div
              class="absolute w-[250px] h-[200px] z-50 bg-white top-0 left-[125px] border p-[20px] hidden"
              ref="detailDialog"
            >
              <span>你的名字</span>
              <span class="ml-[10px] text-gray-400 text-[12px]">2024</span>
              <div class="flex">
                <el-rate
                  v-model="value"
                  disabled
                  size="small"
                  style="--el-rate-icon-margin: 0px"
                />
                <span
                  class="mx-[5px] text-[#ff9900] leading-[24px] inline-block"
                >
                  5
                </span>
                <span class="text-[12px] leading-[24px]">(1000人评分)</span>
              </div>
              <div class="text-[12px] my-[10px]">129分钟 美国</div>
              <div class="text-[12px] my-[10px]">
                导演导演导演导演导演导演导演导演导演导演导演
              </div>
              <div class="text-[12px]">主演</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="w-[300px] h-[3000px] bg-amber-300"></div>
  </div>
</template>
