<?php
include_once 'inc/auth.inc.php';
include_once 'inc/utility_all.php';
include_once 'inc/utility_flow.php';
include_once 'inc/workflow/inc/common.inc.php';
// include_once '';

$form_id = ($_GET['form_id']) ? $_GET['form_id'] : 0 ;
$workflow_element_arr = TD::get_cache('workflow/form/ELEMENT_ARRAY_' . $form_id);

echo '<pre>';

$query = 'SELECT form_id, form_name FROM flow_form_type';
$curl = exequery(TD::conn(), $query);
echo '<select id="formid" onchange="submit()">';
while ($row = mysql_fetch_assoc($curl)) {
	echo '<option value=' . $row['form_id'] . '>' . $row['form_id'] . $row['form_name'] . '</option>';
}

echo '</select>';
print_r($workflow_element_arr);

?>
<script>
	function submit() {
		var val = document.getElementById('formid').value;
		window.location = '?form_id=' + val;
	}
</script>