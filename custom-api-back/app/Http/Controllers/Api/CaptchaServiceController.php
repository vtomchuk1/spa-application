<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Captcha;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class CaptchaServiceController extends Controller
{
    public function index()
    {
        // length string
        $length = 6;
        // generate random char string
        $code = Str::random($length);

        $image = imagecreatefrompng('captcha.png');

        $size = 36;
        $color = imagecolorallocate($image, 66, 182, 66);
        $font = 'SimpleHandmade.otf';
        $angle = rand(-10, 10);
        $x = 56;
        $y = 64;
        imagefttext($image, $size, $angle, $x, $y, $color, $font, $code);

        // name save file
        $name = 'img/' . Str::random(10) . '.png';
        // save file
        imagepng($image, $name);
        imagedestroy($image);

        // save hash captcha in database
        $hash = new Captcha();
        $hash->hash = crypt($code, '$1$asd5sd2$2');
        $hash->name_file = $name;
        $hash->save();

        $data = array('name' => $name);
        header("Content-Type: application/json");
        return json_encode($data);
    }

    public function captchaFormValidate($string_captcha)
    {
        $hash = crypt($string_captcha, '$1$asd5sd2$2');
        $validate = Captcha::query()
            ->where('hash', '=', $hash)
            ->first();
        if(isset($validate))
        {
            unlink($validate->name_file);
            $validate->delete();
            return 1;
        }
        else
            return 0;
    }
}
