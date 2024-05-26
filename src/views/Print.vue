<template>
    <div class="hello">
    <h1>{{ msg }}</h1>
      <button v-print="print">Print!</button>
    <h2>Essential Links</h2>
    <div id="printArea">Print Area
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  文字123
    </div>
  
   
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
const msg = ref<string>('Welcome to Your Vue.js App')
const print =ref<any>(
    {
        id: 'printArea',
        popTitle: '配置页眉标题', // 打印配置页上方的标题
        extraHead: '打印', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
        preview: true, // 是否启动预览模式，默认是false
        previewTitle: '員工設定列表', // 打印预览的标题
        previewPrintBtnLabel: '預覽結果，開始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
        zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
        previewBeforeOpenCallback () { console.log('正在加载预览窗口！'); console.log(msg.value, this) }, // 预览窗口打开之前的callback
        previewOpenCallback () { console.log('已经加载完预览窗口，预览打开了！') }, // 预览窗口打开时的callback
        beforeOpenCallback () { console.log('开始打印之前！') }, // 开始打印之前的callback
        openCallback () { console.log('执行打印了！') }, // 调用打印时的callback
        closeCallback () { console.log('关闭了打印工具！') }, // 关闭打印的callback(无法区分确认or取消)
        clickMounted () { console.log('点击v-print绑定的按钮了！') },
        standard: '',
        extarCss: ''
    }
)
//https://github.com/Power-kxLee/vue3-print-nb
//https://www.jb51.net/article/245567.htm
//https://www.jb51.net/javascript/314389ycc.htm
//https://www.jb51.net/javascript/285496tx8.htm
//https://juejin.cn/post/7277010554559299603
</script>

<style lang="scss">
.previewBodyUtil{
 background: #ffff !important;
   
    .previewBodyUtilPrintBtn{
 background: cornflowerblue !important;
    }
}
@media print {
/*最外层打印节点*/
  #printArea {
    display:block;
  //  height: auto;
    overflow: hidden;
    margin:0;
    height: 266.5mm;//采用默认页眉页脚时，单页内容大概长度，多页时倍数乘
  }
}
</style>