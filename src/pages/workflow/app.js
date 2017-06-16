// Vue.prototype.$http = axios;
var vm = new Vue({
  el: '#app',
  data: {
    flow_id: '',
    flow_list: [],
    loading: false,
    activeName: '1',
    dialogVisible: false,
    loadingdialog: false,
    flow_prcs_det: '',
    tableData: [],
  },
  created: function() {
    var url = 'flow_list.php';
    var that = this;
    axios.get(url).then(function(response) {
      that.flow_list = response.data;
    }).catch(function(error) {
      that.vm.flow_list = [];
    });
  },
  methods: {
    viewDetail: function(id) {
      var that = this;
      that.dialogVisible = true;
      that.flow_prcs_det = '/general/system/workflow/flow_guide/flow_type/flow_design/view_list/index.php?LIST_TYPE=reader&FLOW_ID=' + this.flow_id + '&ID=' + id;
      that.loadingdialog = false;
      // window.open('/general/system/workflow/flow_guide/flow_type/flow_design/view_list/index.php?LIST_TYPE=reader&FLOW_ID=' + this.flow_id + '&ID=' + id);
    },
    submitForm: function(event) {
      var that = this;
      that.loading = true;
      var url = 'data.php';
      axios.get(url, { params: { 'flow_id': that.flow_id, } }).then(function(response) {
        that.tableData = response.data;
        that.loading = false;
      }).catch(function(error) {
        that.tableData = [];
        that.loading = false;
      });
      document.title = that.title;
    }
  },
  computed: {
    flow_name: function() {
      for (var i = 0; i < this.flow_list.length; i++) {
        if (this.flow_id == this.flow_list[i].value) {
          return this.flow_list[i].label;
        }
      }
    },
    title: function() {
      var title = '流程详细权限';
      if (this.flow_name) {
        return this.title = this.flow_name + '--' + title;
      } else {
        return this.title = title;
      }
    },
    flow_view: function() {
      if (this.flow_id) {
        return this.flow_design = '/general/workflow/flow_view.php?FLOW_ID=' + this.flow_id;
      } else return this.flow_design = '';
    },
    flow_explan: function() {
      url = '/general/approve_center/new/show_explan.php';
      if (this.flow_id) {
        return this.flow_explan = url + '?flow_id=' + this.flow_id;
      } else return this.flow_explan = '';
    }
  }
});