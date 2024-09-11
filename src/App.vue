<script setup lang="ts">
import { onMounted } from "vue"
onMounted(() => {
  const meta = document.createElement("meta")
  meta.name = "referrer"
  meta.content = "no-referrer"
  document.head.appendChild(meta)
})
</script>

<template>
  <router-view></router-view>
</template>
