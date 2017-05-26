<template>
  <div class="pdf">
    <div class="pdf-row pdf-header">
      <div class="pdf-col pdf-title">
        <span v-text="title"></span>
      </div>
      <div class="pdf-col pdf-pages">
        <span>
          <input type="text" v-model="page_num">
        </span> /
        <span v-text="page_count"></span>
      </div>
      <div class="pdf-col pdf-cons">
        <button type="text" @click="prev" title="顺时针旋转">
          <i class="fa fa-repeat"></i>
        </button>
        <button type="text" @click="prev" title="下载">
          <i class="fa fa-download"></i>
        </button>
        <button type="text" @click="prev" title="打印">
          <i class="fa fa-print"></i>
        </button>
        <!--<button type="text" @click="prev" icon="arrow-left" size="" title="上一页"></button>
                                <button type="text" @click="next" icon="arrow-right" size="" title="下一页"></button>
                                <button type="text" @click="addscale" icon="plus" size="" title="放大"></button>
                                <button type="text" @click="minus" icon="minus" size="" title="缩小"></button>
                                <button type="text" id="prev" @click="closepdf" icon="close" size="" title="关闭"></button>-->
      </div>
    </div>
    <section class="pdf-row pdf-section" :span="24">
      <canvas class="canvasstyle" id="the-canvas"></canvas>
    </section>
    <!--<embed width="100%" height="100%" name="plugin" id="plugin" :src="testpdfurl" type="application/pdf" internalinstanceid="3">-->
  </div>
</template>

<script>
  import PDFJS from 'pdfjs-dist/build/pdf.js'
  export default {
    name: 'pdfjs',
    props: {
      pdfurl: {
        type: String,
        default: '/lyzapp/attach/cpgl/201705/pdfjstest.pdf'
      }
    },
    data () {
      return {
        title: '123456789',
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
  .pdf {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #525659;
    text-align: center;
    color: #f0f8ff
  }
  
  .pdf .pdf-row {
    box-sizing: border-box
  }
  
  .pdf .pdf-col {
    float: left;
    box-sizing: border-box;
    width: 33.33333%
  }
  
  .pdf .pdf-header {
    height: 50px;
    padding: 5px;
    line-height: 40px;
    background: #262626;
    font-size: 14px
  }
  
  .pdf .pdf-header .pdf-title {
    padding-left: 25px;
    text-align: left
  }
  
  .pdf .pdf-header .pdf-pages {
    font-size: 12px;
  }
  
  .pdf .pdf-header .pdf-pages>span>input {
    border: none;
    outline: none;
    width: 10px;
    background-color: #262626;
    color: #f0f8ff;
    font-size: 16px
  }
  
  .pdf .pdf-header .pdf-pages>span>input:hover,
  .pdf .pdf-header .pdf-pages>span>input:focus {
    background-color: #000
  }
  
  .pdf .pdf-header .pdf-cons {
    padding-right: 25px;
    overflow: hidden;
    text-align: right
  }
  
  .pdf .pdf-header .pdf-cons button {
    padding: 8px;
    border: none;
    border-radius: 100%;
    outline: none;
    background-color: #262626;
    color: #f0f8ff;
    font-size: 14px;
    transition: all 1000ms
  }
  
  .pdf .pdf-header .pdf-cons button:focus {
    background-color: #515151;
  }
  
  .pdf section.pdf-row.pdf-section {
    clear: both;
    padding: 8px 0;
    box-sizing: border-box;
  }
</style>
