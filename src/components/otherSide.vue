<template>
  <div class="tabs"  v-for="(item) in sideLists" :key="item.id">
      <div class="tab">
        <input type="radio" :id="item.id" name="rd">
        <label class="tab-label hvr-underline-from-right" :for="item.id">
         <i :class="item.icon"></i> {{ item.title }}</label>
        <div class="tab-content">
          <ul v-if="item.children">
            <li class="hvr-underline-from-right"  v-for="(i,id) in item.children"
            :key="id"
            :class="active === i.id ? 'isActive' : ''"
            @click="sendClickActive(i)">
             <router-link :to="i.href">
              {{ i.title }}
            </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>


</template>


<script setup lang="ts">
  const props = defineProps({
    sideLists: {type: Object,},
    active:{type: String},
    isActive:{type:Boolean}
  })

    const emits = defineEmits(['sendClickActive']);

    const sendClickActive = (i: any) => {
      emits('sendClickActive', i)
    }
</script>
