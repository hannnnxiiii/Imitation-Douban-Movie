<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
interface People {
  alt: string
  name: string
}
interface VideoDetail {
  images: {
    small: string
  }
  directors: People[]
  casts: People[]
  genres: string[]
  countries: string[]
  aka: string[]
  rating: {
    average: number
  }
  ratings_count: number
}
const props = defineProps<{
  videoDetail: VideoDetail
}>()
// 引用标签
const references = ref<HTMLElement | null>(null)
// el评分组件使用的数值
const elRatingValue = computed(() => props.videoDetail.rating.average / 2)
</script>

<template>
  <div class="bg-white min-h-[400px] mb-[30px]">
    <!-- 信息、评分 -->
    <div class="mb-[15px] flex items-start">
      <!-- 信息 -->
      <div class="w-[500px] h-[300px] flex">
        <!-- 电影海报 -->
        <div class="mr-[15px] mt-[3px]">
          <a href="">
            <img
              :src="videoDetail.images?.small"
              alt=""
              class="max-w-[135px] mb-[10px]"
            />
          </a>
        </div>
        <div>
          <div class="text-[13px] text-[#666]">
            导演：<span v-for="(item, index) in props.videoDetail.directors"
              ><a
                :href="item.alt"
                class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
                >{{ item.name }}</a
              ><span v-if="index + 1 !== props.videoDetail.directors.length">
                /
              </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            编剧：<span v-for="(item, index) in props.videoDetail.directors"
              ><a
                :href="item.alt"
                class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
                >{{ item.name }}</a
              ><span v-if="index + 1 !== props.videoDetail.directors.length">
                /
              </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            主演：<span v-for="item in props.videoDetail.casts"
              ><a
                :href="item.alt"
                class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
                >{{ item.name }}</a
              ><span> / </span></span
            >
            <span
              class="text-[13px] text-[#AAA] hover:text-white hover:bg-[#AAA] hover:cursor-pointer"
              >更多...</span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            类型：<span
              v-for="(item, index) in props.videoDetail.genres"
              class="text-[#111]"
              >{{ item
              }}<span v-if="index + 1 !== props.videoDetail.genres.length">
                /
              </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            制片国家/地区:
            <span
              v-for="(item, index) in props.videoDetail.countries"
              class="text-[#111]"
              >{{ item
              }}<span v-if="index + 1 !== props.videoDetail.countries.length">
                /
              </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            语言:
            <span v-for="(item, index) in 1" class="text-[#111]"
              >英语<span v-if="false"> / </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            上映日期:
            <span v-for="(item, index) in 1" class="text-[#111]"
              >2024-07-10(法国) / 2024-07-12(美国)<span v-if="false">
                /
              </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            片长:
            <span v-for="(item, index) in 1" class="text-[#111]"
              >102分钟<span v-if="false"> / </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            又名:
            <span
              v-for="(item, index) in props.videoDetail.aka"
              class="text-[#111]"
              >{{ item
              }}<span v-if="index + 1 !== props.videoDetail.aka.length">
                /
              </span></span
            >
          </div>
          <div class="text-[13px] text-[#666]">
            IMDb:
            <span v-for="(item, index) in 1" class="text-[#111]"
              >tt23468450<span v-if="false"> / </span></span
            >
          </div>
        </div>
      </div>
      <!-- 评分 -->
      <div class="border-l-[1px] pl-[15px] w-[171px]">
        <div
          class="h-[157px] mt-[2px] pb-[15px]"
          @mouseenter="references!.style.display = 'flex'"
          @mouseleave="references!.style.display = 'none'"
        >
          <div class="flex justify-between">
            <span class="text-[12px] text-[#9b9b9b]">豆瓣评分</span>
            <span class="flex items-center text-[12px]" ref="references">
              <img
              src="https://img2.doubanio.com/cuphead/movie-static/pics/reference.png"
              alt="" class= />
              <a
                href=""
                class="mr-[27px] ml-[3px] text-[#37A] hover:text-white hover:bg-[#37A]"
                >引用</a
              >
            </span>
          </div>
          <div class="h-[56px] flex" v-if="videoDetail.rating">
            <div class="text-[28px] text-[#494949] leading-[56px]">
              {{ videoDetail.rating.average }}
            </div>
            <div class="flex flex-col justify-center pl-[10px]">
              <el-rate
                :model-value="elRatingValue"
                disabled
                style="--el-rate-icon-margin: -3px; height: 15px"
              />
              <div
                class="text-[12px] text-[#669] hover:text-white hover:bg-[#669]"
              >
                <a href="" class="pl-[2px]"
                  >{{ videoDetail.ratings_count }}人评价</a
                >
              </div>
            </div>
          </div>
          <!-- 评分分布图 -->
          <div>
            <div
              class="flex text-[12px] items-center text-[#9b9b9b] leading-[14px]"
            >
              <span>5星</span>
              <div
                class="h-[10px] bg-[#ffd596] mx-[5px]"
                :style="`width:${80 * (parseInt('3.6%') / 100)}px;`"
              ></div>
              <span>3.6%</span>
            </div>
            <div
              class="flex text-[12px] items-center text-[#9b9b9b] leading-[14px]"
            >
              <span>4星</span>
              <div
                class="h-[10px] bg-[#ffd596] mx-[5px]"
                :style="`width:${80 * (parseInt('14.9%') / 100)}px;`"
              ></div>
              <span>14.9%</span>
            </div>
            <div
              class="flex text-[12px] items-center text-[#9b9b9b] leading-[14px]"
            >
              <span>3星</span>
              <div
                class="h-[10px] bg-[#ffd596] mx-[5px]"
                :style="`width:${80 * (parseInt('43.2%') / 100)}px;`"
              ></div>
              <span>43.2%</span>
            </div>
            <div
              class="flex text-[12px] items-center text-[#9b9b9b] leading-[14px]"
            >
              <span>2星</span>
              <div
                class="h-[10px] bg-[#ffd596] mx-[5px]"
                :style="`width:${80 * (parseInt('29.4%') / 100)}px;`"
              ></div>
              <span>29.4%</span>
            </div>
            <div
              class="flex text-[12px] items-center text-[#9b9b9b] leading-[14px]"
            >
              <span>1星</span>
              <div
                class="h-[10px] bg-[#ffd596] mx-[5px]"
                :style="`width:${80 * (parseInt('8.8%') / 100)}px;`"
              ></div>
              <span>8.8%</span>
            </div>
          </div>
        </div>
        <!-- 下半部分 -->
        <div class="py-[15px] text-[13px] text-[#9b9b9b] border-t-[1px]">
          <div>
            好于
            <a href="/" class="text-[#37A] hover:text-white hover:bg-[#37A]"
              >61%恐怖片</a
            >
          </div>
          <div>
            好于
            <a href="/" class="text-[#37A] hover:text-white hover:bg-[#37A]"
              >61%惊悚片</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 想看、看过 -->
    <div class="h-[47px] pt-[20px] pb-[3px] flex items-center">
      <el-button style="width: 49px; height: 24px; background-color: #ffeada"
        >想 看</el-button
      >
      <el-button style="width: 49px; height: 24px; background-color: #ffeada"
        >看 过</el-button
      >
      <span class="text-[13px] flex items-center leading-[24px] ml-[10px]">
        评价：<el-rate
          style="
            height: 24px;
            --el-rate-icon-margin: 0;
            --el-rate-icon-size: 16px;
          "
          show-text
          :texts="['很差', '较差', '还行', '推荐', '力荐']"
          text-color="#666666"
        />
      </span>
    </div>
    <!-- 写短评、写影评 -->
    <div class="h-[23px] flex justify-between">
      <div class="flex">
        <div class="flex items-center mr-[15px]">
          <img
            src="https://img9.doubanio.com/cuphead/movie-static/pics/short-comment.gif"
            alt=""
            class="mr-[5px]"
          />
          <a
            href=""
            class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
            >写短评</a
          >
        </div>
        <div class="flex items-center mr-[15px]">
          <img
            src="https://img1.doubanio.com/cuphead/movie-static/pics/add-review.gif"
            alt=""
            class="mr-[5px]"
          />
          <a
            href=""
            class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
            >写影评</a
          >
        </div>
        <div class="flex items-center mr-[15px]">
          <a
            href=""
            class="text-[13px] text-[#37A] hover:text-white hover:bg-[#37A]"
            >分享到<span class="text-[10px] text-[#666] ml-[5px]">▼</span>
          </a>
        </div>
      </div>
      <el-button
        style="width: 44px; height: 22px; color: #4f946e"
        color="#f2f8f2"
        >推荐</el-button
      >
    </div>
  </div>
</template>
