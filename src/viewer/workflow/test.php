<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>
        <?=$HTML_PAGE_TITLE?>
    </title>
    <!--<link rel="stylesheet" href="//unpkg.com/element-ui/lib/default-theme/index.css">
		<script src="//unpkg.com/vue"></script>
		<script src="//unpkg.com/element-ui"></script>-->
    <link rel="stylesheet" href="//cdn.bootcss.com/element-ui/1.2.7/theme-default/index.css">
    <script src="//cdn.bootcss.com/vue/2.2.6/vue.js"></script>
    <script src="//cdn.bootcss.com/element-ui/1.2.7/index.js" charset="utf-8"></script>
</head>

<body>
    <div id="app">
        <el-row type="flex" justify="center">
            <h1><span v-show="flow_name">{{ flow_name }}--</span>流程详细权限</h1>
        </el-row>
        <el-row type="flex" justify="end">
            <el-form inline method="get" class="form-inline" :span="22">
                <el-form-item>
                    <el-select v-model="flow_id" size="small" placeholder="请选择" clearable filterable>
                        <el-option v-for="item in flow_id_options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    <!--<select v-model="flow_id">
							<option v-for="item in flow_id_options" v-bind:value="item.value">{{ item.label }}</option>
						</select>-->
                    <el-input type="text" name="flow_id" v-model="flow_id" size="small" readonly style="display:none;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" native-type="submit" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table :data="tableData" style="width:100%" border>
            <el-table-column fixed prop="id" label="序号" width="70"></el-table-column>
            <el-table-column fixed prop="name" label="步骤名称" width="180"></el-table-column>
            <el-table-column prop="prcs" label="经办权限" width=""></el-table-column>
            <el-table-column prop="writable" label="可写字段" width="400"></el-table-column>
            <el-table-column prop="hidden" label="保密字段" width=""></el-table-column>
            <el-table-column prop="required" label="必填字段" width=""></el-table-column>
        </el-table>
        <?//=$msg?>
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            flow_id: '<?=$flow_id?>',
            tableData: <?php
				if ($flow_id>0) {
					$query = 'SELECT fp.* FROM flow_type ft,flow_process fp WHERE ft.FLOW_ID = fp.FLOW_ID AND ft.FLOW_ID = '.$flow_id.' ORDER BY PRCS_ID';
					$cur = exequery(TD::conn(), $query);
					while( $row = mysql_fetch_assoc($cur)){
						$prcs_user = GetUserNameById($row['PRCS_USER']);
						$prcs_dept = $row['PRCS_DEPT']=='ALL_DEPT'?'全体部门':GetDeptNameById($row['PRCS_DEPT']);
						$prcs_priv = GetPrivNameById($row['PRCS_PRIV']);
						$tableData[] =  array(
							'id' => $row['PRCS_ID'],
							'name' => $row['PRCS_NAME'],
							'prcs' => $prcs_user,
							'writable' => $row['PRCS_ITEM'],
							'hidden' => $row['HIDDEN_ITEM'],
							'required' => $row['REQUIRED_ITEM'],);
					}
					echo json_encode(array_iconv($tableData));
				} else {
					echo '[]';
				}?>,
            flow_id_options: <?php
				$query = "SELECT FLOW_ID,FLOW_NAME FROM flow_type ft,flow_sort fs WHERE fs.SORT_ID = ft.FLOW_SORT ORDER BY fs.SORT_NO,ft.FLOW_NO";
				$cur = exequery(TD::conn(), $query);
				while( $row = mysql_fetch_assoc($cur)) {
					$flow_id_options[] = array('value' => $row['FLOW_ID'], 'label' => $row['FLOW_NAME']);
				}
				echo json_encode(array_iconv($flow_id_options));?>
        },
        // methods: {
        // 	flow_name: function() {
        // 		for (var i=0; i<this.flow_id_options.length; i++) {
        // 			if (this.flow_id == this.flow_id_options[i].value) {
        // 				return this.flow_id_options[i].label;
        // 			}
        // 		}
        // 	}
        // },
        computed: {
            flow_name: function() {
                for (var i = 0; i < this.flow_id_options.length; i++) {
                    if (this.flow_id == this.flow_id_options[i].value) {
                        return this.flow_id_options[i].label;
                    }
                }
            }
        }
    })
</script>

</html>