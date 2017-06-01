<template>
  <div class="pdf">
    <div class="pdf-row pdf-header">
      <div class="pdf-col pdf-title">
        <span v-text="title"></span>
      </div>
      <div class="pdf-col pdf-pages">
        <span>
          <input type="number" v-model="page">
        </span> /
        <span v-text="numPages"></span>
      </div>
      <div class="pdf-col pdf-cons">
        <button type="text" @click="" title="顺时针旋转">
          <i class="fa fa-repeat"></i>
        </button>
        <button type="text" @click="" title="下载">
          <i class="fa fa-download"></i>
        </button>
        <button type="text" @click="addscale" title="打印">
          <i class="fa fa-print"></i>
        </button>
      </div>
    </div>
    <div id="loadingBar">
      <div class="progress"></div>
      <div class="glimmer"></div>
    </div>
    <section class="pdf-row pdf-section" :span="24">
      <canvas class="canvasstyle" id="the-pdf-canvas"></canvas>
    </section>
    <!--<embed width="100%" height="100%" name="plugin" id="plugin" :src="testpdfurl" type="application/pdf" internalinstanceid="3">-->
  </div>
</template>

<script>
  import PDFJS from 'pdfjs-dist/build/pdf.js'
  import 'pdfjs-dist/web/pdf_viewer.js'
  export default {
    name: 'pdfjs',
    props: {
      pdfurl: {
        type: String,
        default: '/lyzapp/attach/cpgl/201705/pdfjstest.pdf'
      },
      // page: {
      //   type: Number,
      //   default: 1
      // },
      scale: {
        type: Number,
        default: 1.0
      },
      max_scale: {
        type: Number,
        default: 10.0
      },
      min_scale: {
        type: Number,
        default: 0.25
      }
    },
    data () {
      return {
        pdfDoc: null, // PDFJS生成的PDF文档对象
        pageNum: 1,
        pageRendering: false,
        pageNumPending: null,
        page: 1,
        numPages: 0
      }
    },
    watch: {
      page () {
        this.renderPage(this.page)
      }
    },
    computed: {
      title () {
        var url = this.pdfurl
        var title = PDFJS.getFilenameFromUrl(url) || url
        try {
          title = decodeURIComponent(title)
        } catch (e) { }
        return title
      },
      canvas () {
        return document.getElementById('the-pdf-canvas')
      },
      loadingBar () {
        var bar = new PDFJS.ProgressBar('#loadingBar', {})
        return PDFJS.shadow(this, 'loadingBar', bar)
      }
    },
    mounted () {
      PDFJS.getDocument(this.pdfurl).then(pdf => {  // 初始化pdf
        console.log(PDFJS, pdf)
        this.pdfDoc = pdf
        this.numPages = pdf.numPages
        // for (var index = 1; index <= pdf.numPages; index++) {
        //   this.renderPage(index)
        // }
        this.renderPage(this.pageNum)
      }).catch((err) => {
        this.canvas.text(err.message)
        console.log(err)
      })
      console.log(this)
    },
    methods: {
      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      renderPage (num) {
        this.pageRendering = true
        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then(page => {
          var viewport = page.getViewport(this.scale)
          console.log(this.canvas, viewport)
          this.canvas.height = viewport.height
          this.canvas.width = viewport.width

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: this.canvas.getContext('2d'),
            viewport: viewport
          }
          var renderTask = page.render(renderContext)

          // Wait for rendering to finish
          renderTask.promise.then(() => {
            this.pageRendering = false
            if (this.pageNumPending !== null) {
              // New page rendering is pending
              this.renderPage(this.pageNumPending)
              this.pageNumPending = null
            }
          })
        })

        // Update page counters
        this.page = this.pageNum
      },
      addscale () { // 放大
        if (this.scale >= this.max_scale) {
          return
        }
        this.scale += 0.1
        this.queueRenderPage(this.pageNum)
      },
      minus () { // 缩小
        if (this.scale <= this.min_scale) {
          return
        }
        this.scale -= 0.1
        this.queueRenderPage(this.pageNum)
      },
      onPrevPage () { // Displays previous page.
        if (this.pageNum <= 1) {
          return
        }
        this.pageNum--
        this.queueRenderPage(this.pageNum)
      },
      onNextPage () { // Displays next page.
        if (this.pageNum >= this.numPages) {
          return
        }
        this.pageNum++
        this.queueRenderPage(this.pageNum)
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
    width: 80px;
    background-color: #262626;
    color: #f0f8ff;
    font-size: 16px;
    text-align: center
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
