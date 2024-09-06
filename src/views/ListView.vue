<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getNowShowingAPI } from "@/axios/listAPI.js"
import router from "@/router"
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
</script>

<template>
  <div class="flex w-[1024px] mx-auto justify-between">
    <!-- 左侧 -->
    <div class="w-[675px] h-[3000px] bg-green-300">
      <!-- 正在热映 -->
      <div
        class="h-[324px] bg-blue-300 overflow-hidden"
        v-if="nowShowingList.length !== 0"
      >
        <!-- 头部 -->
        <div class="h-[36px] bg-yellow-100 border-b mb-[18px]">
          <div class="h-[25px] flex justify-between items-center">
            <div class="flex items-end w-[260px] justify-between h-[25px]">
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
            <div class="flex w-[90px] justify-between items-end">
              <div class="text-[12px]">
                {{ currentPage }} / {{ Math.ceil(nowShowingList.length / 5) }}
              </div>
              <el-pagination
                layout="prev, next"
                :page-size="5"
                :total="nowShowingList.length"
                size="small"
                v-model:current-page="currentPage"
                @next-click="handleNext"
                @prev-click="handlePrev"
                style="
                  --el-pagination-button-width-small: 18px;
                  --el-pagination-button-height-small: 18px;
                  --el-pagination-border-radius: 18px;
                  padding-left: 0;
                  --el-pagination-bg-color: #6d99d2;
                  --el-pagination-button-color: white;
                  --el-pagination-hover-color: black;
                "
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
            class="bg-red-100 w-[115px] h-[250px] flex flex-col items-center mr-[25px] relative hover:cursor-pointer"
            v-for="(item, index) in nowShowingList"
            :key="item.id"
            @mouseenter="(event) => showDetailDialog(event, item)"
            @mouseleave="hideDetailDialog()"
            @click="handelClick(item.id)"
          >
            <img
              :src="item.images.small"
              alt=""
              class="h-[172px] bg-yellow-200 w-full"
            />
            <div
              class="text-[14px] mt-[5px] whitespace-nowrap text-ellipsis overflow-hidden w-[95px] text-center mx-auto"
            >
              {{ item.title }}
            </div>
            <div class="text-[#ff9900]" v-if="item.rating.average !== 0">
              <el-rate
                v-model="item.rating.average"
                disabled
                size="small"
                style="--el-rate-icon-margin: 0px"
              />
              {{ item.rating.average * 2 }}
            </div>
            <div v-else class="text-[12px] h-[24px] leading-[24px]">
              暂无评分
            </div>
            <el-button type="primary" style="height: 24px">选座购票</el-button>
          </div>
        </div>
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
    </div>
    <!-- 右侧 -->
    <div class="w-[300px] h-[3000px] bg-amber-300"></div>
  </div>
</template>
