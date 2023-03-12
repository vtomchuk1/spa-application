<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UploadFileController extends Controller {
    public function index(){
        return "hello";
    }
    public function showUploadFile(Request $request){
        /*
        $path = $request->file('file')->store('uploads');
        $url = Storage::url($path);
        return $url;

        */

        $file = $request->file('file');

        // отображаем имя файла
        //echo 'File Name: '.$file->getClientOriginalName();


        //file size byte
        $file_ext = $file->getClientOriginalExtension();

        if($file_ext == 'jpg' || $file_ext == 'png' || $file_ext == 'gif' || $file_ext == 'txt'){

        }
        else
            return 'error type file';


        //move file
        $destinationPath = 'uploads';
        $new_name = sha1(time()).'.'.$file->getClientOriginalExtension();
        $file->move($destinationPath,$new_name);

        list($width, $height, $type, $attr) = getimagesize('uploads/' . $new_name);

        if($width > 320 || $height > 240)
            return "error size image ".$width.' '.$height;

        /*
        $file_size = $file->getSize();
        if($file_size > 100000)
            return "error file size";
*/
        return 'uploads/' . $new_name;

        // echo 'File Extension: '.$file->getClientOriginalExtension();
        // echo '<br>';



        //file size
        //echo 'File Size: '.$file->getSize();


        //отображаем Mime-тип файла
        //echo 'File Mime Type: '.$file->getMimeType();


    }
}
