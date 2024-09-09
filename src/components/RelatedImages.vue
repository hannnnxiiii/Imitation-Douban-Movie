<script setup lang="ts"></script>

<template>
  <!-- 剧情简介 -->
  <div class="mb-[20px]">
    <h2 class="text-[#007722] text-[16px] mb-[12px]">
      长腿的剧情简介 · · · · · ·
    </h2>
    <p class="text-[13px] indent-[26px]">
      横跨30年的10宗灭门惨案，所有遇害家庭都有一个共通点：有一位14号生日的小女生。
    </p>
  </div>
  <!-- 演职员 -->
  <div>
    <h2 class="mt-[24px] mb-[12px] text-[#007722] text-[16px]">
      长腿的演职员 · · · · · · (
      <a
        href="/"
        class="text-[#37A] text-[13px] hover:text-white hover:bg-[#37a]"
        >全部 31</a
      >
      )
    </h2>
    <div class="flex justify-between">
      <div
        class="w-[95px] flex flex-col text-[13px] items-center h-[182px] justify-between"
        v-for="item in 6"
      >
        <img
          src="https://img2.doubanio.com/view/celebrity/m/public/p53081.webp"
          alt=""
          class="h-[133px]"
        />
        <a href="" class="hover:text-white hover:bg-[#37a]">奥兹·珀金斯</a>
        <span class="text-[#9b9b9b]">导演</span>
      </div>
    </div>
  </div>
  <!-- 视频和图片 -->
  <div>
    <h2 class="mt-[24px] mb-[12px] text-[#007722] text-[16px]">
      长腿的视频和图片 · · · · · · (
      <a
        href=""
        class="text-[#37A] text-[13px] hover:text-white hover:bg-[#37a]"
        >预告片9</a
      >
      |
      <a
        href=""
        class="text-[#37A] text-[13px] hover:text-white hover:bg-[#37a]"
        >图片459</a
      >
      ·
      <a
        href=""
        class="text-[#37A] text-[13px] hover:text-white hover:bg-[#37a]"
        >添加</a
      >
      )
    </h2>
    <div class="flex justify-between">
      <!-- 视频 -->
      <a href="" class="relative">
        <img
          src="https://img3.doubanio.com/img/trailer/medium/2910094753.jpg"
          alt="预告片"
          class="h-[115px]"
        />
        <div
          class="top-[4px] left-[4px] h-[18px] w-[36px] bg-[#e48f1f] text-[11px] text-[white] text-center leading-[18px] rounded-[3px] absolute"
        >
          预告片
        </div>
        <img
          src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg fill='none' fill-rule='evenodd' transform='translate(1 1)'%3E%3Crect width='19.5' height='19.5' x='1.25' y='1.25' stroke='%23eee' stroke-width='1.5' rx='9.75'/%3E%3Cpath fill='%23eee' d='M8 13.39V8.618a1.5 1.5 0 0 1 2.296-1.271l3.808 2.383a1.5 1.5 0 0 1 .001 2.542l-3.808 2.388A1.5 1.5 0 0 1 8 13.39'/%3E%3C/g%3E%3C/svg%3E"
          alt=""
          class="absolute top-[45px] left-[90px]"
        />
      </a>
      <!-- 图片 -->
      <a href=""
        ><img
          src="https://img1.doubanio.com/view/photo/sqxs/public/p2909325978.webp"
          alt=""
          class="h-[115px]"
      /></a>
      <a href=""
        ><img
          src="https://img9.doubanio.com/view/photo/sqxs/public/p2912380364.webp"
          alt=""
          class="h-[115px]"
      /></a>
      <a href=""
        ><img
          src="https://img9.doubanio.com/view/photo/sqxs/public/p2911440324.webp"
          alt=""
          class="h-[115px]"
      /></a>
      <a href=""
        ><img
          src="https://img1.doubanio.com/view/photo/sqxs/public/p2910058158.webp"
          alt=""
          class="h-[115px]"
      /></a>
    </div>
  </div>
  <!-- 相关推荐 -->
  <div>
    <h2 class="mt-[24px] mb-[12px] text-[#007722] text-[16px]">
      喜欢这部电影的人也喜欢 · · · · · ·
    </h2>
    <div class="flex flex-wrap justify-between">
      <div class="flex flex-col items-center" v-for="item in 10">
        <a href="http://localhost:5173/subject/35891632">
          <img
            src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2908453412.webp"
            alt=""
            class="max-w-[115px]"
          />
        </a>
        <div>
          <a
            href="http://localhost:5173/subject/35891632"
            class="text-[13px] text-[#669] hover:text-white hover:bg-[#669]"
            >玛克辛</a
          ><span class="text-[13px] text-[#e09015] ml-[5px]">5.9</span>
        </div>
      </div>
    </div>
  </div>
</template>
