<template>
  <el-row>
    <el-button type="success" size="small" icon="share">share</el-button>
  </el-row>
</template>

<script>
  import PDFJS from 'pdfjs-dist/build/pdf.js'
  export default {
    name: 'pdf',
    data () {
      return {
        pdfPath: '@/static/pdfjstest.pdf'
      }
    },
    mounted () {
      PDFJS.getDocument(this.pdfPath)
    }
  }
</script>
