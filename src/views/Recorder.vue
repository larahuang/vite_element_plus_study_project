<template>
    <div>
        <PhotoCapture v-model="imageBase64" />
        <VideoCapture uploadUrl="<example-server-address.com>" v-model="videoUrl" />
    </div>
</template>


<script setup lang="ts">
import { PhotoCapture, VideoCapture } from 'vue-media-recorder'
import { ref, onMounted } from 'vue'

const imageBase64 = ref<string>('')
const videoUrl = ref<string>('')
</script>