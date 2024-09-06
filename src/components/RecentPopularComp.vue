<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getNowShowingAPI } from "@/axios/listAPI.js"
import router from "@/router"
const props = defineProps<{
  navList: object
  itemList: object
}>()
// 当前页数
const currentPage = ref(1)
// 正在热映列表
const nowShowingList = ref<Item[]>([])
// 正在热映对象接口
interface Rating {
  average: number
}
interface Images {
  large: string
  medium: string
  small: string
}
interface Directors {
  name: string
  id: string
}
interface Casts {
  name: string
  id: string
}
interface Item {
  rating: Rating
  id: string
  images: Images
  title: string
  original_title: string
  year: string
  collect_count: number
  directors: Directors[]
  casts: Casts[]
}
// 获取正在热映
const getNowShowing = async () => {
  const res = await getNowShowingAPI()
  nowShowingList.value = res.data.subjects
  nowShowingList.value.forEach((item: Item) => {
    item.rating.average = item.rating.average / 2
  })
}
onMounted(() => getNowShowing())
// 翻页进度
const translateCount = ref(0)
// 下一页
const handleNext = () => {
  if (carousel.value) {
    carousel.value.next()
  }
}
// 上一页

const handlePrev = () => {
  if (carousel.value) {
    carousel.value.prev()
  }
}
// 悬浮框对象
const detailDialog = ref(null)
// 弹窗倒计时
let timer: number | null = null
// 当前悬停的对象
const currentItem = ref<Item>({} as Item)
// 悬停对象的坐标
const itemPosition = ref({
  x: 0,
  y: 0,
})
// 导演名
const directorsStr = ref("")
// 演员名
const castsStr = ref("")
// 悬浮框显示与否
const dialogVisible = ref("none")
// 鼠标移入，1s后显示详情弹窗
const showDetailDialog = (event: MouseEvent, item: Item) => {
  timer = setTimeout(() => {
    currentItem.value = item
    directorsStr.value = item.directors.map((item) => item.name).join(" / ")
    castsStr.value = item.casts.map((item) => item.name).join(" / ")
    const target = event.target as HTMLElement
    if (target) {
      itemPosition.value.x = target.getBoundingClientRect().x + 125
      itemPosition.value.y = target.getBoundingClientRect().y
    }

    dialogVisible.value = "block"
  }, 500)
}
// 鼠标移出，关闭定时器，立马隐藏详情弹窗
const hideDetailDialog = () => {
  if (timer) {
    clearTimeout(timer)
  }
  if (detailDialog.value) {
    dialogVisible.value = "none"
  }
}
// 点击对象.跳转对应详情页
const handelClick = (id: string) => {
  router.push({
    name: "detail",
    params: {
      id,
    },
  })
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
  <div
    class="h-[524px] bg-blue-300 overflow-hidden relative"
    v-if="nowShowingList.length !== 0"
  >
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
          <div
            v-for="(item, index) in 10"
            class="w-[115px] h-[210px] bg-yellow-200 mr-[25px] mb-[10px] flex flex-col items-center"
            :class="{ clearMargin: (index + 1) % 5 === 0 }"
          >
            <img src="" alt="" class="h-[161px] bg-red-100 w-full" />
            <div class="text-[13px] text-[#37A]">
              狗镇
              <span class="text-[#E09015] text-[13px]">7.0</span>
            </div>
          </div>
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
  <!-- 悬浮框 -->
  <div
    class="fixed w-[250px] h-[200px] z-[100] bg-white border p-[20px]"
    :style="`display: ${dialogVisible}; top: ${itemPosition.y}px; left: ${itemPosition.x}px;`"
    ref="detailDialog"
    v-if="currentItem.rating"
  >
    <span>{{ currentItem.title }}</span>
    <span
      v-if="currentItem.original_title !== currentItem.title"
      class="ml-[5px]"
      >{{ currentItem.original_title }}</span
    >
    <span class="ml-[10px] text-gray-400 text-[12px]">{{
      currentItem.year
    }}</span>
    <div class="flex">
      <el-rate
        v-model="currentItem.rating.average"
        disabled
        size="small"
        style="--el-rate-icon-margin: 0px"
      />
      <span
        class="mx-[5px] text-[#ff9900] leading-[24px] inline-block"
        v-if="currentItem.rating.average !== 0"
      >
        {{ currentItem.rating.average * 2 }}
      </span>
      <span
        class="text-[12px] leading-[24px]"
        v-if="currentItem.rating.average !== 0"
        >({{ currentItem.collect_count }}人评分)</span
      >
    </div>
    <!-- <div class="text-[12px] my-[10px]">129分钟 美国</div> -->
    <div class="text-[12px] my-[10px]">
      导演
      <span>{{ directorsStr }}</span>
    </div>
    <div class="text-[12px]">
      主演
      <span>{{ castsStr }}</span>
    </div>
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
</style>
