<?php
include_once 'inc/auth.inc.php';
include_once 'inc/utility_all.php';

function flow_arr($sort_parent = 0) {
	$query = 'SELECT * FROM flow_sort WHERE SORT_PARENT = ' . $sort_parent . ' ORDER BY SORT_NO';
	$curl = exequery(TD::conn(), $query);
	while ($row = mysql_fetch_assoc($curl)){
		$sort = array(
			'sort_id' => $row['SORT_ID'],
			'sort_no' => $row['SORT_NO'],
			'sort_name' => $row['SORT_NAME'],
			'have_child' => $row['HAVE_CHILD'],
		);
		if($row['HAVE_CHILD']) {
			$sort['child_arr'] = flow_arr($row['SORT_ID']);
		}
		$sort_list[] = $sort;
	}
	return $sort_list;
}

function flow_list_to_json($arr) {
	if(is_array($arr)) {
		for($i=0; $i<count($arr); $i++) {
			$select .= '{value : ' . $arr[$i]['sort_id'] . ', label : \'©À' . $arr[$i]['sort_name'] . '\', disabled : false },';
			if($arr[$i]['have_child'] == '1') {
				$select .= flow_list_to_json($arr[$i]['child_arr']);
			} else {
				continue;
			}
		}
	}
	return $select;
}


$flow_arr = flow_arr();
$count = count($flow_arr);
echo '<pre>';
// var_dump($flow_arr);
$select = flow_list_to_json($flow_arr);
// echo $select;
?>
<link rel="stylesheet" href="//cdn.bootcss.com/element-ui/1.2.7/theme-default/index.css">
<script src="//cdn.bootcss.com/vue/2.2.6/vue.js"></script>
<script src="//cdn.bootcss.com/element-ui/1.2.7/index.js"></script>
<div id="app">
	<el-row type="flex" justify="center">
		<el-col :span="4">
			<el-select v-model="list" placeholder="ÇëÑ¡Ôñ">
				<el-option v-for="item in select" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
			</el-select>
		</el-col>
		<el-col :span="4">
			<el-input v-model="list" icon="search"></el-input>
		</el-col>
	</el-row>
</div>
<script>
var vm = new Vue({
	el: '#app',
	data: {
		list: '',
		select: [<?=$select?>],
	},
	methods: {
		selectLabel: function(label) {
			return label = '<i class="el-icon-document">' + '</i>' + label;
		}
	}
});
</script>