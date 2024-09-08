<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import {
  getFilmFloatAPI,
  getNowShowingAPI,
  getRecentlyPopAPI,
  getPopTagAPI,
} from "@/axios/listAPI.js"
import router from "@/router"
import RecentPopularComp from "@/components/RecentPopularComp.vue"
import PopRecom from "@/components/PopRecom.vue"
import PopReviews from "@/components/PopReviews.vue"
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
// 最近热门电影导航标签
const popFilmNavList = ref<string[]>([])
// 最近热门电影列表
const popFilmList = ref<PopFilmList[]>([])
// 最近热门电影列表接口
interface PopFilmList {
  title: string
  rate: string
  cover: string
  id: string
}
// 获取最近热门电影导航标签
const getPopFilmTag = async () => {
  const res = await getPopTagAPI("movie")
  console.log(res)
  popFilmNavList.value = res.data.tags
}
onMounted(() => getPopFilmTag())
// 获取最近热门电影列表
const getPopFilmList = async (tag: string) => {
  console.log(tag)

  const res = await getRecentlyPopAPI(tag, "movie")
  console.log(res)
  popFilmList.value = res.data.subjects
}
onMounted(() => getPopFilmList("热门"))
// 电影悬浮窗信息列表
const flimFloatList = ref<FlimFloatList[]>([])
// 电影悬浮窗信息列表接口
interface FlimFloatList {
  id: string
}
// 电影悬浮窗单个对象
const flimFloatInfo = ref<object>({})
// 获取电影悬浮窗信息
const getFlimFloat = async (id: string) => {
  // 如果要找的元素在列表中已经存在，将其取出，直接return
  if (flimFloatList.value.find((item) => item.id === id)) {
    flimFloatInfo.value = flimFloatList.value.find(
      (item) => item.id === id
    ) as object
  } else {
    // 如果不存在，发送请求
    const res = await getFilmFloatAPI(id)
    console.log(res)
    flimFloatList.value.push(res.data.subject)
    flimFloatInfo.value = res.data.subject
  }
}
// 最近热门电视剧列表
const popTvList = ref<object[]>([])
// 获取最近热门电视剧列表
const getPopTvList = async (tag: string) => {
  const res = await getRecentlyPopAPI(tag, "tv")
  console.log(res)
  popTvList.value = res.data.subjects
}
onMounted(() => getPopTvList("热门"))
// 最近热门电影导航标签
const popTvNavList = ref<string[]>([])
// 获取最近热门电影导航标签
const getPopTvTag = async () => {
  const res = await getPopTagAPI("tv")
  console.log(res)
  popTvNavList.value = res.data.tags
}
onMounted(() => getPopTvTag())
// 电影悬浮窗信息列表
const tvFloatList = ref<TvFloatList[]>([])
// 电影悬浮窗信息列表接口
interface TvFloatList {
  id: string
}
// 电影悬浮窗单个对象
const tvFloatInfo = ref<object>({})
// 获取电影悬浮窗信息
const getTvFloat = async (id: string) => {
  // 如果要找的元素在列表中已经存在，将其取出，直接return
  if (tvFloatList.value.find((item) => item.id === id)) {
    tvFloatInfo.value = tvFloatList.value.find(
      (item) => item.id === id
    ) as object
  } else {
    // 如果不存在，发送请求
    const res = await getFilmFloatAPI(id)
    console.log(res)
    tvFloatList.value.push(res.data.subject)
    tvFloatInfo.value = res.data.subject
  }
}
// 广告DOM
const ad = ref<HTMLElement | null>(null)
// 关闭广告
const closeAd = () => {
  if (ad.value) {
    ad.value.style.display = "none"
  }
}
</script>

<template>
  <div class="flex w-[1024px] mx-auto justify-between">
    <!-- 左侧 -->
    <div class="w-[675px] h-[3000px]">
      <!-- 正在热映 -->
      <div
        class="h-[324px] overflow-hidden mb-[36px]"
        v-if="nowShowingList.length !== 0"
      >
        <!-- 头部 -->
        <div class="h-[36px] border-b mb-[18px]">
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
            class="w-[115px] h-[250px] flex flex-col items-center mr-[25px] relative hover:cursor-pointer"
            v-for="(item, index) in nowShowingList"
            :key="item.id"
            @mouseenter="(event) => showDetailDialog(event, item)"
            @mouseleave="hideDetailDialog()"
            @click="handelClick(item.id)"
          >
            <img :src="item.images.small" alt="" class="h-[172px] w-full" />
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
      <RecentPopularComp
        :nav-list="popFilmNavList"
        :item-list="popFilmList"
        @showFilmFloat="getFlimFloat"
        :float-info="flimFloatInfo"
        @changeTab="getPopFilmList"
        class="mb-[40px]"
      >
        <template #title><div>最近热门电影</div></template>
      </RecentPopularComp>
      <RecentPopularComp
        :nav-list="popTvNavList"
        :item-list="popTvList"
        @showFilmFloat="getTvFloat"
        :float-info="tvFloatInfo"
        @changeTab="getPopTvList"
        class="mb-[40px]"
      >
        <template #title><div>最近热门电视剧</div></template>
      </RecentPopularComp>
      <PopRecom></PopRecom>
      <PopReviews></PopReviews>
    </div>
    <!-- 右侧 -->
    <div class="w-[300px] h-[3000px]">
      <div class="h-[44px] bg-[#f2f7f6] mb-[20px] pl-[18px] py-[12px] flex">
        <a
          href="/"
          class="text-[#37A] text-[13px] hover:text-white hover:bg-[#37A] leading-[20px]"
          >豆瓣电影评分八问</a
        >
      </div>
      <!-- 广告 -->
      <div
        class="h-[250px] bg-[#f2f7f6] flex justify-center items-center relative mb-[20px]"
        ref="ad"
      >
        广告位招租
        <div
          class="absolute top-[235px] left-[285px] bg-[#0000004D] text-white h-[15px] w-[15px] flex justify-center items-center leading-[15px] text-[12px] hover:cursor-pointer"
          @click="closeAd"
        >
          X
        </div>
      </div>
      <!-- 一周口碑榜 -->
      <div class="mb-[50px]">
        <!-- 头部 -->
        <div class="h-[36px] mb-[5px] border-b-[1px] pb-[10px] flex items-end">
          <h2>一周口碑榜</h2>
          <a
            href="/"
            class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A] ml-[12px]"
            >更多榜单》</a
          >
        </div>
        <!-- 排行榜 -->
        <ol>
          <li
            v-for="(item, index) in 10"
            class="h-[36px] py-[7px] border-b-[1px] text-[9px] flex items-center pl-[5px]"
          >
            {{ index + 1 }}
            <a
              href="/"
              class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A] ml-[5px]"
              >姥姥的外孙</a
            >
          </li>
        </ol>
      </div>
      <!-- 热门片单 -->
      <div class="mb-[40px]">
        <!-- 头部 -->
        <div class="h-[35px] pb-[10px] border-b-[1px]">
          <h2>热门片单</h2>
        </div>
        <!-- 内容 -->
        <ul>
          <li
            v-for="item in 2"
            class="flex items-start justify-between py-[15px] border-b-[1px]"
          >
            <div class="w-[247px] flex">
              <a
                href="/"
                class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
                >泥轰二次元佳作即补旧番指南【附B站链接】</a
              >
            </div>
            <div class="text-[13px] text-[#999]">126推荐</div>
          </li>
        </ul>
      </div>
      <!-- 合作联系 -->
      <div class="h-[101px] mb-[15px]">
        <!-- 头部 -->
        <div class="h-[35px] pb-[10px] border-b-[1px] mb-[18px]">合作联系</div>
        <!-- 内容 -->
        <div>
          <ul class="text-[13px]">
            <li>电影合作邮箱：movie@douban.com</li>
            <li class="flex items-center">
              电视剧合作邮箱：tv@douban.com
              <img
                src="https://img1.doubanio.com/f/vendors/486503da8c82ffdbecec41c065927f96cbf02e4f/pics/icon/ic_new.png"
                alt=""
                class="ml-[5px]"
              />
            </li>
          </ul>
        </div>
      </div>
      <!-- 关注我们 -->
      <div class="mb-[40px]">
        <!-- 头部 -->
        <h2 class="h-[36px] pb-[10px] border-b-[1px] mb-[18px] text-[14px]">
          关注我们
        </h2>
        <!-- 内容 -->
        <ul class="flex items-center">
          <li class="w-[60px] flex flex-col items-center">
            <a href="/" class="mb-[5px]">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAACe1JREFUWAnNWGtsFNcV/u7s23htx9jBD8zLPAomkBCppaJRQSg82iRqRElDS6vyIxKgmor+QIpooYqAVFVRIpAIJJVRW1q1qIX+KISEtJEhLQjMK8SEmIcBG2zAxmb92MfszO13ZnfNDhjjqkB7pNnxvXPm3u9+3znn3rFC2nTLzmJ4rBWAWgKN8kz/Y70rXAX0dlieTar0lZsyt5IfffOP0+AxtvOaAjMJrbV0P3ZTinB8XsCyP+W1RBW/elzplppibQQ/Vjn+Kh1NPHZQ/U2oQn7o3kS9sr2zvPAEVii/QXAx+j5C5pRBvXiJiULalj+c5t0/gkUFvFUwzWqlb/6mGdoof6SyinSxSOoSNP4cIJgHeAOAbaXBOtHWh9WRG/ZVr7ZtJoSs5hGZsNZ7C+rUbiDelWLRwzgL5UMPrQRKq1Jg7aQLQDoNyr0pql3PHm5DiLFNIBklU2m2kgyneASqsxloOQ1d+Rzw5PgUm3fNruzWbf0Hwl2OAzZlBLdCWe7pB93tgEmQlFv1dgBtF4GOy8xYgjd80ONnAeVTuQg3k/8dgz7K5+ElekicJRkqcvVn4aJ0rGnoolHA8ClQNxqAhn8wBDqhGj6CDg4Bho52MUmApP0/NZ8nBaq+BTh8GepSB/QTIeDFSUDl0HtBGvS/cRbqwifOQnReCVDxDHTJBCZMEOrkLieB1Lla6LxhDqOcwEElVXHw8ISlACc7TWC/PgLUNgLdcYdAWBxw71mgZgHZyXeDFFk7m4B2+hsGVDvlba2HnvyNVJKMmQ7U7wM6rwA3yaokjmQ3bZAMcnKR0qY879VBbyO4DsZTgOsL8spYYzvUwYtQixlL3JEc2T1clMHdafSzQF4xVKIXaDrJ969A1e+Fzi1ymFSNh4BIC2U/m2I2rSwBuoMyM5fr7iVrPVHY6w/A3n2G2xHbQV4iQ/a2KCEpJctgf4DAYhy7tQe6k4U3LwiMGEd39jMG1ZHfA7epRMtnwFhmcT5lFwYjrWSfizC4cI49sMScB14OeDuG5OsM4o8oTYivsMsFTFYjQAX0U0yGtgisPeegP7gAfe4Wk4BbKEPDWFgFT/VXOEYuQY4EbjVC3b7GZVJOSRCphYluAowxNhnTfDIwgyJrNAlz9d9h7b+QApcBI/dsE4Di/4dTsI9fh75AYLIQL/skduNJWO8dg/pyCYyZlQTSQyAsMYqMi4rJOAGy7ShKwOmaef8YlEG5gsTGfyG57xzB+Zy2xGGfiUu2xU1YO+uhBJSfD50x6OCA511Anr0JYxbZCxc7suonxzFPCY7xB4tAvX4ulEo4O8tADDIBzL+cRXzHaW7cfEE29yxsgktb7LOlP/1AMpS1UcLM6cv0O87pnxDBky09YgoLM8uShwsXgD7eNZ+J9AYHkAJO6z8GyYB96Raibx/hPAQgWgkGmTDJjDRNgvYz8POg8llSgkwA8evpgdXRydLDOBJ/P9kgaMfIvMrzwXiWzImMIqEA0SKrgp7wdaCMgCVZBHDa+o1BxcIaqzkF88ptqBxZGScnKAHo+dIE+J+fDd+Mrzp/G0UszD4CEUTRKKymZlgnTiGx70OYBw7CjnRxMQEyzWXyMGq3RGAMC8AoCEAnCDITMl5yNbQ8pYjIKyrQlN24UtZ6x8iedb4Tnd/bB7ubTJEAHYvBO2E8clauQODlb5GJ8B3/Af4yj9Sh981fIv7B/hSb9JV5jYowcr4/EcHvMP4cddwQsodU+uIK99OQB12/OoHuTSehWFJ0PI7Qq68g7xfrYJSQ/rS1tbWhtrYWDQ0NVNHA5MmTMXPmTAwZwnKRZRIO3W+sR/fGt8kg1RAzbapsI/dHUxH+yTNOO/Xg3l+3xMJWxETsQBO/W+gc7UVo4beR/85mgpW6lLKtW7di48aNOH/+fKbLATlt2jRs3rwZ06dP7+sXUOGf/wwJ+kZ3/ZVyM14FJ+Ove8fnCL5QAd84xrHp5ikzAFNOAjZ9GTaSLbcRv8xCyzgwRlQg/811LnDr1q3DsmXLXOBkMJvZXFdXhwULFuDMGe422caykfvjauhQEBZLiUVfizFrdkZhNrBect4+DBks6Ts5Y6BmLmXButENkwcAKxFH4KUX4SXIjB06dAjr16/PNPvulZWVKCsrc9rXrl2DMHy3+SZNhCorZaljrRSATDzWA2iPgMvCkMGSvrsZpKPmJm+zvjFK4JvMtM+y3bt3I8aEkTgTFqurqxEOh7FhwwYsXry4z/PYsWOsRlQl21i0LbkIziY4O0lQYS98YxizFrfCu5jLtN07CVPeCLMGMkbsONlk2cg2YUds1apVWLNmjfN3bm4uli9fjjiTKWOyAEmcbDMbG5FobmYtltpHgCwx+V8rg39MDre9uxaT9aKbQdLvrQgyWxkrZLCn9kCWKw8dY8c67ZEjR7r629vbWZtZnNM2b968ewB2bN0GM9LhfJ5ZpgWj0I/CpeNZZcjkfdiTfvdOwnDwFHoRnluC3vO3ENnzN3S9/z7C8+c7Uy9atAhbtmzB2rVrkUgk0Nra6rQzwOQ+Y8YMLFmyJLsLnTt24Nb2Gmjus5ZIyxNS6erJCFSxnsa4AQxgSp992Z3fPGCabQk0/uCfiJ7rgH94BSp+91vkzpzpDLNn714sW7oUTU1NrmHlO1aYe/fddzF8+HDnmWYctm95B62rV0NzG5SzoME6W/bTp1D43dGUVhLEPb1rUDaU/vylez0CBnqPdeBSdR1iPHD6CgpQvHIlil57Dd7SUjRdv44/79yJuqNHuf32YNSoUXh+zhzMmTvXKXE6nkDPJwdx4623qMKeFFjuGKFxeSh/vQrhWSz4PNkwih5oBPjN/t14gol+dhvNb5xGpI61ihYcMRJ58+ehYPZs5E59mht7HssED6JkTw4KXV98gR6WosiH+9Fz+DCrQSr4/YUBDF1YgeIfjoFvGAs1E3CwpvSZef0DlBH83Je7KNOuq2j70xVEG7qc6kQ48HiD8DyRD4MHAZHS4qHA6u1ykkBe9fLd0NhcFMwpQeELpQiM4SmaW5zzcSUOgzSl6+fcH6BoIGWBklsdJnpOdCBytAO9Z7pgNvciycOE7KmKPgY/nnxFfgRG5yJnYhi5TxcgNCEMI495KNtYcoBpBgBLgLP55iBeFqDyoS70cUK7h6zFWIw4sQOQi5AEUPJdIiVQPkMF1AOSYABsfKTkm2SQ8SBu1h1fI0TWcshOxmSNcm6M83qI5uWJ8CrHKx8Mia55Hy4O19BOQ5QCrnIn0TXwiBSc8f/pcjDpGqWPP1cMv/UxE6EKsUdNi8PKg3+CDOK4XY+EZ5ZDpD4zfRoDcjszlv9EFyYfPMYj8RA0koi2/pQglqhJh4+nlGa/w6Q3sUIesMmvl/+JMR9IVNK/SU07eFMQ/Bv3F7OQlix8qAAAAABJRU5ErkJggg=="
                alt=""
              />
            </a>
            <a
              href="/"
              class="text-[12px] text-[#37A] hover:text-white hover:bg-[#37A]"
              >微博</a
            >
          </li>
          <li class="w-[60px] flex flex-col items-center">
            <a href="/" class="mb-[5px]">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </a>
            <a
              href="/"
              class="text-[12px] text-[#37A] hover:text-white hover:bg-[#37A]"
              >微信</a
            >
          </li>
          <li class="w-[60px] flex flex-col items-center">
            <a href="/" class="mb-[5px]">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                class="w-[40px] h-[40px]"
              />
            </a>
            <a
              href="/"
              class="text-[12px] text-[#37A] hover:text-white hover:bg-[#37A]"
              >瓣嘴</a
            >
          </li>
          <li class="w-[60px] flex flex-col items-center">
            <a href="/" class="mb-[5px]">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCYRXhpZgAATU0AKgAAAAgABgEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAIdpAAQAAAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAFCgAwAEAAAAAQAAAFAAAAAA/+EJIWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/PgD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAUABQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5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"
                alt=""
                class="w-[40px] h-[40px]"
              />
            </a>
            <a
              href="/"
              class="text-[12px] text-[#37A] hover:text-white hover:bg-[#37A]"
              >光影club</a
            >
          </li>
        </ul>
      </div>
      <!-- 广告 -->
      <div
        class="h-[100px] p-[10px] flex justify-center items-center bg-[#999999]"
      >
        广告位招租
      </div>
    </div>
  </div>
  <!-- 页脚 -->
  <div
    class="border-dashed w-[1024px] mx-auto py-[6px] border-t-[1px] mt-[40px] flex justify-between"
  >
    <!-- 左侧 -->
    <div class="text-[12px] text-[#999]">
      © 2005－2024 douban.com, all rights reserved 北京豆网科技有限公司
    </div>
    <!-- 右侧 -->
    <ul class="flex text-[12px] text-[#37A]">
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">关于豆瓣</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">在豆瓣工作</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">联系我们</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">法律声明</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">帮助中心</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">移动应用</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">移动风格</a>
      </li>
      ·
      <li class="mx-[4px] hover:text-white hover:bg-[#37A]">
        <a href="/">豆瓣广告</a>
      </li>
    </ul>
  </div>
</template>
