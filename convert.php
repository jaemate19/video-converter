<?php

$file_name = $_FILES['upload']['name'];
$file_size = $_FILES['upload']['size'];
$file_tmp = $_FILES['upload']['tmp_name'];

$allowed_extentions = array('mp4') ;
$max_file_size = 10000000; 

if(!empty($_FILES['upload']['name']))  
{
    // Get file extension
    $file_extention = explode('.', $file_name);
    $file_extention = strtolower(end($file_extention));
        
    if(in_array($file_extention, $allowed_extentions)) 
    {
        if($file_size <= $max_file_size)
        {
            $random_dir_name = uniqid();
            mkdir("uploads/${random_dir_name}", 0777); 
            $target_dir = ("uploads/${random_dir_name}");
            $target_file = ("$target_dir/${file_name}");

            move_uploaded_file($file_tmp, $target_file);
     
            $output = shell_exec("cd $target_dir; ../../convert.sh; ls *.mp3 ");
            $url = "$target_dir/${output}";

            echo $url;
        }
        else
        {
        	//1 = File too large
            echo '3';
            exit();
        }
    }
    else
    {
    	//2 = wrong file extension
        echo '2'; 
        exit();
    }
} 
else
{
	//3 = No file submitted
    echo '1';
}

?>
