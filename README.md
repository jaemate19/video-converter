#Video Converter 

##A web application that accepts mp4 files and converts them to mp3.

This is a project that mainly exists for educational purposes for myself. The application accepts mp4 files and converts them to mp3 files and the resulting file is available for download. There is size and type restrictions,the uploaded file cannot be over the 10MB size and mp4 format is the only format that is currently accepted. The application enables files to be uploaded either by dragging and dropping a file into the active area,or by selecting the file manually. 

##How to use this application on your own machine
I have developed this application on Fedora Linux,so these instructions will work best there and other Red Hat based Linux distributions. 

1. Make sure you have an Apache web server installed on the machine. The web server service should be enabled to make sure it starts during startup.
2. You may reconfigure the /etc/httpd/conf/httpd.conf file if you need to,but the default parameters should be fine as they are.
3. Make sure you have php-cli and php-pfm installed on your machine.
4. In the /etc/php.ini file and make sure the following parameters are set as follows:"file_uploads = on", "upload_max_filesize = 10M".
5. Make sure you have ffmpeg installed.
6. You will need to create a directory called "uploads" in the directory you have chosen to house the application. During development I have used the "/var/www/html/" directory.
7. You may run into some issues related to file permissions on your machine. On my machine,I had to change the ownership of the files to user "apache" using the command "chown apacha:apache *". Because the application will need to create new directories and needs the ability to write into those directories,you need to give the "s" permission to the "uploads" directory. I used the "chmod u+s uploads" "chmod g+s uploads" commands.
8. Lastly,on Red Hat based distros such as Fedora,you will find that SeLinux gets in the way,I have not yet worked out a way to make the application function with SeLinux on enforcing mode,for now I have had to set it on permissive..

##How to tweak this project for your own uses
Since this is a project for educational purposes,I would encourage you to clone and rename the project.

##Find a bug?
If you found an issue or would like to submit an improvement to this project,please submit an issue using the issues tab above,thank you.








