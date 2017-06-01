<template>
  <div class="pdf">
    <header id="pdf-header" class="pdf-row pdf-header">
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
        <button type="text" @click="" title="打印">
          <i class="fa fa-print"></i>
        </button>
      </div>
    </header>
    <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>
    <div id="loadingBar">
      <div class="progress"></div>
      <div class="glimmer"></div>
    </div>
  </div>
</template>

<script>
  import 'pdfjs-dist/web/pdf_viewer.css'
  import PDFJS from 'pdfjs-dist/build/pdf.js'
  import 'pdfjs-dist/web/pdf_viewer.js'
  PDFJS.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
  PDFJS.cMapUrl = 'pdfjs-dist/cmaps/'
  PDFJS.cMapPacker = true
  export default {
    name: 'pdfjs',
    props: {
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
        pdfurl: 'lyzapp/attach/cpgl/201705/pdfjstest.pdf',
        title: '',
        search_for: '',
        loadingTask: null,
        pdfDoc: null,
        info: null,
        metadata: null,
        page: 1,
        numPages: 0
      }
    },
    computed: {
      loadingBar () {
        var bar = new PDFJS.PDFJS.ProgressBar('#loadingBar', {})
        return PDFJS.shadow(this, 'loadingBar', bar)
      },
      container () {
        return document.getElementById('viewerContainer')
      },
      pdfLinkService () {
        return new PDFJS.PDFJS.PDFLinkService()
      },
      pdfViewer () {
        var pdfViewer = new PDFJS.PDFJS.PDFViewer({
          container: this.container,
          currentScaleValue: this.scale,
          linkService: this.pdfLinkService
        })
        pdfViewer.currentScaleValue = this.scale
        // pdfViewer.currentScaleValue = 'page-width'
        return pdfViewer
      },
      pdfFindController () {
        var pdfFindController = new PDFJS.PDFJS.PDFFindController({
          pdfViewer: this.pdfViewer
        })
        if (this.search_for) {
          pdfFindController.executeCommand('find', { query: this.search_for })
        }
        return pdfFindController
      },
      pdfHistory () {
        return new PDFJS.PDFJS.PDFHistory({
          linkService: this.linkService
        })
      }
    },
    created () {
      this.getTitleFromUrl()
      this.loadingTask = PDFJS.getDocument(this.pdfurl)
    },
    mounted () {
      console.log(this, PDFJS)
      this.pdfLinkService.setViewer(this.pdfViewer)
      this.pdfViewer.setFindController(this.pdfFindController)
      this.container.addEventListener('pagesinit', this.pdfFindController)
      this.loadingTask.promise.then(pdf => {
        this.pdfDoc = pdf
        this.numPages = pdf.numPages
        this.pdfViewer.setDocument(pdf)
        this.pdfLinkService.setDocument(pdf)
        this.pdfHistory.initialize(pdf.fingerprint)
      }).catch(err => {
        console.log(err)
      })
      this.getTitleFromMetadata()
    },
    methods: {
      getTitleFromUrl () {
        var url = this.pdfurl
        var title = PDFJS.getFilenameFromUrl(url) || url
        try {
          title = decodeURIComponent(title)
        } catch (e) { }
        this.title = title
      },
      getTitleFromMetadata () {
        this.loadingTask.promise.then(pdf => {
          pdf.getMetadata().then(data => {
            // console.log(data)
            var info = data.info
            var metadata = data.metadata
            this.info = info
            this.metadata = metadata
            var title
            if (metadata && metadata.has('dc:title')) {
              if (metadata.get('dc:title') !== 'Untitled') {
                title = metadata.get('dc:title')
              }
            }
            if (!title && info && info['Title']) {
              title = info['Title']
            }
            try {
              title = decodeURIComponent(title)
            } catch (e) { }
            if (title) {
              this.title = title
            }
          }).catch(err => {
            console.log(err)
          })
        })
      }
    }
  }
</script>

<style>
  #viewerContainer {
    background-color: #808080;
    overflow: auto;
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 0
  }
  
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
    width: 30px;
    height: 30px;
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
