<template>
  <el-row class="cpdf">
    <el-col :span="24" class="contor">
      <el-button @click="prev" icon="arrow-left" size="mini" title="上一页"></el-button>
      <el-button @click="next" icon="arrow-right" size="mini" title="下一页"></el-button> &nbsp; &nbsp;
      <span>
        <i class="el-icon-document"></i>
        <span v-text="page_num"></span> /
        <span v-text="page_count"></span>
      </span>
      &nbsp; &nbsp;
      <el-button @click="addscale" icon="plus" size="mini" title="放大"></el-button>
      <el-button @click="minus" icon="minus" size="mini" title="缩小"></el-button>
      <el-button id="prev" @click="closepdf" icon="close" size="mini" title="关闭"></el-button>
    </el-col>
    <el-col :span="24" class="center">
      <canvas class="canvasstyle" id="the-canvas"></canvas>
    </el-col>
  </el-row>
</template>

<script>
  import PDFJS from 'pdfjs-dist/build/pdf.js'
  export default {
    name: 'pdfjs',
    props: ['pdfurl'],
    data () {
      return {
        pdfDoc: null, // pdfjs 生成的对象
        pageNum: 1, //
        pageRendering: false,
        pageNumPending: null,
        scale: 1, // 放大倍数
        page_num: 0, // 当前页数
        page_count: 0, // 总页数
        maxscale: 2, // 最大放大倍数
        minscale: 0.8 // 最小放大倍数
      }
    },
    methods: {
      renderPage (num) { // 渲染pdf
        let vm = this
        this.pageRendering = true
        let canvas = document.getElementById('the-canvas')
        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport(vm.scale)
          // alert(vm.canvas.height)
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: vm.ctx,
            viewport: viewport
          }
          var renderTask = page.render(renderContext)

          // Wait for rendering to finish
          renderTask.promise.then(function () {
            vm.pageRendering = false
            if (vm.pageNumPending !== null) {
              // New page rendering is pending
              vm.renderPage(vm.pageNumPending)
              vm.pageNumPending = null
            }
          })
        })
        vm.page_num = vm.pageNum
      },
      addscale () { // 放大
        if (this.scale >= this.maxscale) {
          return
        }
        this.scale += 0.1
        this.queueRenderPage(this.pageNum)
      },
      minus () { // 缩小
        if (this.scale <= this.minscale) {
          return
        }
        this.scale -= 0.1
        this.queueRenderPage(this.pageNum)
      },
      prev () { // 上一页
        let vm = this
        if (vm.pageNum <= 1) {
          return
        }
        vm.pageNum--
        vm.queueRenderPage(vm.pageNum)
      },
      next () { // 下一页
        let vm = this
        if (vm.pageNum >= vm.page_count) {
          return
        }
        vm.pageNum++
        vm.queueRenderPage(vm.pageNum)
      },
      closepdf () { // 关闭PDF
        this.$emit('closepdf')
      },
      queueRenderPage (num) {
        if (this.pageRendering) {
          this.pageNumPending = num
        } else {
          this.renderPage(num)
        }
      }
    },
    computed: {
      ctx () {
        let id = document.getElementById('the-canvas')
        return id.getContext('2d')
      }
    },
    mounted () {
      let vm = this
      PDFJS.getDocument(vm.pdfurl).then(function (pdfDoc_) {  // 初始化pdf
        vm.pdfDoc = pdfDoc_
        vm.page_count = vm.pdfDoc.numPages
        vm.renderPage(vm.pageNum)
      })
    }
  }
</script>

<style>
  .cpdf {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #525659;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  
  .center {
    height: 100%;
    overflow: auto;
  }
  
  .contor {
    padding: 10px;
    background-color: #393c3e;
  }
</style>
