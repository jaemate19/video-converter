

const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');
let visible_button = document.querySelector('.visible_button');

//global variable that will point to the file that will be uploaded
var fileobj;

//when the "select file" button is clicked,the hidden input button should also be "clicked"
visible_button.onclick = () => {
	selectfile.click();
};

//when file is dragged inside the drag area
dragArea.addEventListener('dragover', (event) => {
	event.preventDefault();
    change_content();
	dragArea.classList.add('active');
});

//Track when the file leaves the drag area,the main actions just restores the page as it originally was
dragArea.addEventListener('dragleave', (event) => {
	event.preventDefault();
    restore_content();
	dragArea.classList.remove('active');

});

//This will alter the presentation of the content in the drag area
function change_content()
{
	dragText.textContent = 'Release to upload file';               //communicate a different massage to the user
	document.getElementById("or_header").style.display = "none";   //hide the OR message
	visible_button.style.display = "none";                         //hide the file select button as well
}

//This will restore the contents of the drag area
function restore_content()
{
	dragText.textContent = 'Drag & Drop to upload';
	document.getElementById("or_header").style.display = "inline";
	visible_button.style.display = "inline";
}

//This function determines what will happen when a file is dropped into the area
//The file will be validated 1st to see if meets the type and size requirements
function drop_file(e)
{
	e.preventDefault();
	fileobj = e.dataTransfer.files[0];
	var validate = js_validation(fileobj);
	
	if(validate == '0')
	{
    	pre_convert_page();
    }
}

//When a file is selected through file explorer instead of being dropped into the the drag area
//The file wil be validated 1st to see if meets the type and size requirements
function file_explorer()
{
	fileobj = document.getElementById('selectfile').files[0];
	var validate = js_validation(fileobj);
	change_content();

	if(validate == '0')
	{
    	pre_convert_page();
    }
}

//This is called after either a file is dropped or file selected in the file browser. It unhides the submit button
function pre_convert_page()
{
	dragText.style.display = 'none';
	var label = document.getElementById('file_label');
	label.textContent = fileobj.name;
	label.style.display = "inline";
    document.getElementById("submit_button").style.display = "inline";  
}

//This is where you hide the submit button and reveal the loader animation
function pre_ajax_upload()
{
	document.getElementById("submit_button").style.display = "none";
	document.getElementById("loader").style.display = "inline";
	ajax_upload();
}

//This is where the file is uploaded to the PHP backend file
function ajax_upload()
{
	if(fileobj != undefined)
	{
		var result;
		var url;
		var xhr = new XMLHttpRequest();
		var payload = new FormData();

		payload.append("upload", fileobj);
		var download = document.getElementById("download");

		xhr.addEventListener("readystatechange", function(e)
		{
			if(xhr.status == 200 && xhr.readyState == 4)
			{	
				result = xhr.responseText;
				if (result == '1' || result == '2' || result == '3' )
				{
					php_handle_errors(result);
				}
				else
				{
				 	download_page(result);	
				}
			}
		});
		xhr.open('POST', 'convert.php', true);
		xhr.send(payload);
	}
	else
	{
		alert("PLEASE SELECT A FILE");
		location.reload();
	}
}

//After the backend operation is done,this page will be presented to the user to download the converted file
function download_page(download_link)
{
	document.getElementById("file_label").style.display = "none";
	document.getElementById("loader").style.display = "none";
	dragText.style.display = "none";
	document.getElementById("or_header").style.display = "none";
	document.getElementById("submit_button").style.display = "none";
	visible_button.style.display = "none";       

	var download = document.getElementById("download");
	download.style.display = "inline";
    download.setAttribute("href", download_link);
}

//The client side guard rail
function js_validation(file)
{
	const extension = file.type;
	const file_size = file.size;

	if(extension != 'video/mp4')
	{
		alert("Only mp4 files allowed");
		location.reload();
	}
	else if (file_size > 10000000)
	{
		alert("File exceeds the 10MB size limit")
		location.reload();
	}
	else
	{
		return '0'
	}
}

//Incase the javascript validation is defeated for some reason,the php error handling will inform the user here
function php_validation(error)
{
	document.getElementById("loader").style.display = "none";
	switch(error)
	{
		case '1':
			alert("File too large,max size=10MB");
			location.reload();
			break;

		case '2':
			alert("Wrong file format uploaded,only mp4 files allowed");
			location.reload();
			break;

		case '3':
			alert("You didn't submit any file")
			location.reload();
			break;

		default:
			alert("Unkown error");
	}
}












































