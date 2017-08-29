<?php 
	try {
		$upload_success = null;
		$upload_error = '';
	if (isset($_FILES['files'])) {
	    $extensions = array("jpeg","jpg","png");
	    $is_success  = true;
		$error_msg = false;
			foreach ($file_error as $key => $error) {
				if ($error==UPLOAD_ERR_OK) {
					$tmp_name = $_FILES['files']['tmp_name'][$key];
					$name = $_FILES['files']['name'][$key];
					$tagret_dir ="pictures/" . basename($name);
					move_uploaded_file($tmp_name,  $tagret_dir);
				}
			}
	 die(json_encode([
			  'success'=> $is_success,
			  'error'=> $error_msg]));

	}
	} catch (Exception $e) {
		$error_msg = $e->getMessage();
		echo $error_msg;
	}

	include 'index.html';

 ?>