

<template>
  <ul class="navMenu" :class="{ adminBg: showAdminBg }">
    <li
      v-for="(item, index, id) in homeMenu"
      :key="id"
      :class="active === index ? 'isActive' : ''"
      @click="sendClickActive(index)"
      >
        <router-link 
        :to="item.href" 
        class="hvr-underline-from-center">
          {{ item.title }}
        </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">

const props = defineProps({
  active: { type: Number },
  isActive: { type: Boolean },
  showAdminBg: { type: Number },
  homeMenu: { type: Object },
})
const emits = defineEmits(['sendClickActive',]);

const sendClickActive = (index: number) => {
  emits('sendClickActive', index)
}

</script>
