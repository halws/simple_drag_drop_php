<?php 
	try {
		$upload_success = null;
		$upload_error = '';
		// $tagret_dir = "pictures/";
	if (isset($_FILES['files'])) {
	    $extensions = array("jpeg","jpg","png");
	    $file_error = $_FILES['files']['error'];
	    $is_success  = true;
		$error_msg ='';
		$uploadOk = 1;
			foreach ($file_error as $key => $error) {
				if ($error==UPLOAD_ERR_OK) {
					$tmp_name = $_FILES['files']['tmp_name'][$key];
					$name = $_FILES['files']['name'][$key];
					$type = $_FILES['files']['type'][$key];
					$size = $_FILES['files']['size'][$key];
					$target_file ="pictures/" . basename($name);

					// $check = ;
					if (getimagesize($tmp_name)!==false) {
						$uploadOk = 1;
					} else {
						$error_msg .= $name . " is not an image " . " <br> ";
						$uploadOk = 0;
					}
					if ($size>2097152) {
						$error_msg .= $name . " it's too large " . " <br> ";
						$uploadOk = 0;
						
					}
					if($type!="image/jpg" && $type!="image/png" && $type!="image/jpeg" && $type!="image/gif" ) {
						$error_msg .= $name . " is not an image " . $type . " <br> ";
   				 $uploadOk = 0;
}
					if ($uploadOk == 0) {
						$error_msg .=" sorry, try again ";
						$is_success = false;
						
					}else{
						// $is_success = false;
					move_uploaded_file($tmp_name,  $target_file);
					}

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