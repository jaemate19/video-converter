<?php

$allowed_extentions = array('mp4') ;                 //an array of allowed extensions of the uploaded files,so far it's just mp4..
$max_file_size = 10000000;                           //this is the maximum allowable size of the uploaded mp4 file, 1000000 = 10MB

if(isset($_POST['submit']))                          //check if the submit button has been clicked(ie, has the form been submitted?)
{
    if(!empty($_FILES['upload']['name']))            //check to see if the file actually uploaded
    {
        $file_name = $_FILES['upload']['name'];
        $file_size = $_FILES['upload']['size'];
        $file_tmp = $_FILES['upload']['tmp_name'];

        // Get file extension
        $file_extention = explode('.', $file_name);
        $file_extention = strtolower(end($file_extention)); //Get the last entry of the array
        
        if(in_array($file_extention, $allowed_extentions))  // Validate file type/extension
        {
            if($file_size <= $max_file_size) // 10000000 bytes = 10MB
            {
               $random_dir_name = uniqid();  //generate a random number that will be used to name a directory
               mkdir("uploads/${random_dir_name}");   //this is the randomly named directory that will house the current operation
               $target_dir = ("uploads/${random_dir_name}");
               $target_file = ("$target_dir/${file_name}");

               move_uploaded_file($file_tmp, $target_file);  //move the uploaded file from the temporary directory to the operation directory
      
               $output = shell_exec("cd $target_dir; ffmpeg -i *.mp4 output.mp3; ls *.mp3"); //the ls command returns the name of the mp3 file 
               $url = "$target_dir/${output}";  //this is the final url of the file that is going to be available for download
               echo "<a href='$url' Download=''>Get Your File</a>";  //finally present a download link to the client
            }
            else
            {
               echo '<p style="color: red;">File too large!</p>';
            }
        }
        else
        {
            echo '<p style="color: red;">Ooops,the the wrong file extension was submited</p>'; 
        }
    } 
    else
    {
        echo '<p style="color: red;">Please choose a file</p>';
    }
}

?>