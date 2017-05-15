import axios from 'axios'
export default {
  name: 'flowdetpriv',
  data () {
    return {
      flow_id: '',
      flow_list: [],
      loading: false,
      activeName: '1',
      dialogVisible: false,
      loadingdialog: false,
      flow_prcs_det: '',
      tableData: []
    }
  },
  created () {
    var url = '/lyzapp/api/workflow/flow_det_priv/flow_list.php'
    axios.get(url).then(response => {
      // console.log(response)
      this.flow_list = response.data
    }, () => {
      this.flow_list = []
    })
  },
  methods: {
    viewPrcsDetail (id) {
      this.dialogVisible = true
      this.flow_prcs_det =
        '/general/system/workflow/flow_guide/flow_type/flow_design/view_list/index.php?LIST_TYPE=reader&FLOW_ID=' +
        this.flow_id + '&ID=' + id
      this.loadingdialog = false
    },
    submitForm () {
      this.loading = true
      var url = '/lyzapp/api/workflow/flow_det_priv/data.php'
      axios.get(url, {
        params: {
          'flow_id': this.flow_id
        }
      }).then(response => {
        this.tableData = response.data
        this.loading = false
      }, () => {
        this.tableData = []
        this.loading = false
      })
      // document.title = this.title
    },
    viewURL (url) {
      var flowid = this.flow_id
      var view = ''
      if (flowid) {
        view = url + flowid
      }
      return view
    }
  },
  computed: {
    flow_name () {
      var flowlist = this.flow_list
      var flowid = this.flow_id
      if (this.flow_list === undefined) {
        return ''
      } else {
        for (var i = 0; i < flowlist.length; i++) {
          if (flowid === flowlist[i].value) {
            return flowlist[i].label
          }
        }
      }
    },
    title () {
      var title = this.flow_title
      title = '流程详细权限'
      if (this.flow_name) {
        title = this.flow_name + '--' + title
        return title
      } else {
        return title
      }
    },
    flow_view () {
      var url = '/general/workflow/flow_view.php?FLOW_ID='
      return this.viewURL(url)
    },
    flow_explan () {
      var url = '/general/workflow/new/show_explan.php?flow_id='
      return this.viewURL(url)
    }
  }
}
