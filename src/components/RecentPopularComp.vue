<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const props = defineProps<{
  navList: object;
  itemList: ItemList[];
  floatInfo: FloatInfo;
}>();
// 数据列表接口
interface ItemList {
  title?: string;
  cover?: string;
  rate?: string;
  id?: string;
}
// 悬浮窗列表接口
interface Short_comment {
  content: string;
  author: string;
}
interface FloatInfo {
  title?: string;
  id?: string;
  star?: number;
  rate?: string;
  duration?: string;
  region?: string;
  types?: string[];
  directors?: string[];
  actors?: string;
  short_comment?: Short_comment;
}
// 下一页
const handleNext = () => {
  if (carousel.value) {
    console.log(1);

    carousel.value.next();
  }
};
// 上一页

const handlePrev = () => {
  if (carousel.value) {
    carousel.value.prev();
  }
};

// 高亮激活选项参数
const activeIndex = ref<number>(0);
// 跑马灯接口
interface Carousel {
  prev: () => void;
  next: () => void;
}
// 跑马灯对象
const carousel = ref<Carousel | null>(null);
// 修改标签页
const emit = defineEmits(["changeTab", "showFilmFloat"]);
const changeTab = (item: string, index: number) => {
  emit("changeTab", item);
  activeIndex.value = index;
};
// 点击对象进行跳转
const goSubjectPage = (id: string) => {
  router.push(`/subject/${id}`);
};
</script>

<template>
  <div class="h-[524px] bg-blue-300 overflow-hidden relative">
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
              @click="changeTab(item, index)"
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
      <el-carousel-item v-for="page in 5" :key="page">
        <div class="flex flex-wrap">
          <el-popover
            v-for="(item, index) in itemList.slice((page - 1) * 10, page * 10)"
            placement="right-start"
            :width="350"
            trigger="hover"
            :show-arrow="false"
            :show-after="300"
            :key="item.id"
            @show="$emit('showFilmFloat', item.id)"
          >
            <!-- 激活悬浮框的元素 -->
            <template #reference>
              <div
                class="w-[115px] h-[210px] bg-yellow-200 mr-[25px] mb-[10px] flex flex-col items-center hover:cursor-pointer"
                :class="{ clearMargin: (index + 1) % 5 === 0 }"
                @click="goSubjectPage(item.id as string)"
              >
                <img
                  :src="item.cover"
                  alt=""
                  class="h-[161px] bg-red-100 w-full"
                />
                <div class="text-[13px] text-[#37A]">
                  {{ item.title }}
                  <span class="text-[#E09015] text-[13px]">{{
                    item.rate
                  }}</span>
                </div>
              </div>
            </template>
            <!-- 悬浮框内容 -->
            <template #default>
              <div v-if="item.id === props.floatInfo.id">
                <!-- 上半部分 -->
                <div class="p-[20px]">
                  <!-- 电影名 -->
                  <span
                    class="text-[18px] text-[#37a] hover:text-white hover:bg-[#37a] hover:cursor-pointer"
                    @click="goSubjectPage(item.id as string)"
                    >{{ props.floatInfo.title }}
                  </span>
                  <!-- 评分 -->
                  <div class="flex items-center">
                    <el-rate
                      :model-value="props.floatInfo.star"
                      disabled
                      style="--el-rate-icon-margin: -1px"
                    />
                    <span class="text-[13px] text-[#ff9900] ml-[10px]">{{
                      props.floatInfo.rate
                    }}</span>
                  </div>
                  <!-- 标签 -->
                  <div class="flex justify-start items-start flex-wrap">
                    <span
                      class="bg-[#f5f5f5] text-[13px] px-[8px] py-[2px] rounded-[12px] mx-[3px] my-[3px]"
                      >{{ props.floatInfo.duration }}</span
                    >
                    <span
                      class="bg-[#f5f5f5] text-[13px] px-[8px] py-[2px] rounded-[12px] mx-[3px] my-[3px]"
                      >{{ props.floatInfo.region }}</span
                    >
                    <span
                      class="bg-[#f5f5f5] text-[13px] px-[8px] py-[2px] rounded-[12px] mx-[3px] my-[3px]"
                      v-for="item in props.floatInfo.types"
                      >{{ item }}</span
                    >
                    <span
                      class="bg-[#f5f5f5] text-[13px] px-[8px] py-[2px] rounded-[12px] mx-[3px] my-[3px]"
                      v-for="item in props.floatInfo.directors"
                      >{{ item }}(导演)</span
                    >
                    <span
                      class="bg-[#f5f5f5] text-[13px] px-[8px] py-[2px] rounded-[12px] mx-[3px] my-[3px]"
                      v-for="item in props.floatInfo.actors?.slice(0, 3)"
                      >{{ item }}</span
                    >
                  </div>
                  <!-- 按钮 -->
                  <div class="mt-[5px]">
                    <el-button
                      style="border-radius: 0%; width: 60px; height: 25px"
                      >想看</el-button
                    >
                    <el-button
                      style="border-radius: 0%; width: 60px; height: 25px"
                      >看过</el-button
                    >
                  </div>
                </div>
                <!-- 短评 -->
                <div
                  class="border-t-[1px] bg-[#f5f5f5] p-[20px] text-[13px] text-[#666]"
                >
                  {{ props.floatInfo.short_comment!.content }}
                  <span class="text-[12px] text-[#aaa]"
                    >- {{ props.floatInfo.short_comment!.author }}的短评</span
                  >
                </div>
              </div>
            </template>
          </el-popover>
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
:global(.el-popover.el-popper) {
  border-radius: 0% !important;
  box-shadow: none;
  padding: 0;
}
</style>
