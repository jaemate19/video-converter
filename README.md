# MP4 to MP3 Converter Web App

This is a simple web-based application that allows users to upload an `.mp4` video file (max size: 10MB) and convert it to `.mp3` audio. The app supports drag-and-drop functionality and a traditional file picker. The conversion is handled by a PHP backend that invokes a shell script.

## Features

-  Drag & Drop file upload
-  File picker fallback
-  Client-side validation (file type and size)
-  Loader animation during conversion
-  Direct MP3 download link after conversion
-  PHP backend with error handling
-  Mobile responsive and user-friendly UI

## How to Use

1. Clone or download this repository:
   git clone git@github.com:jaemate19/video-converter.git
   cd video-converter
2. Make sure your server supports PHP and has ffmpeg installed (used in convert.sh).
3. Place this app in a local or remote PHP-enabled server (like XAMPP, WAMP, or Apache).
4. Open the index.html in your browser via the server and follow the UI instructions:
   -Drag & drop an .mp4 file (10MB max), or click "Select File".
   -Click "Convert" once the file is validated.
   -Download the generated .mp3 file via the provided link.

## Requirements

PHP 7.0+
ffmpeg installed and available via command line
Apache/Nginx or local dev server
Web browser (Chrome, Firefox, etc.)

## Future Improvements

1. Progress bar to be added
2. Support for other file types
3. Allowance for batch uplods