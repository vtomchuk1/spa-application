<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Models\Post;
use App\Models\Models\Usert;
use http\Client\Curl\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mews\Captcha\Facades\Captcha;
use Mockery\Exception;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $posts = Post::all();

        return $posts;
    }

    public function sort($params, $flag)
    {
        if($params == 'email' || $params == 'username') {
            $posts = Post::join('userts', 'userts.id', '=', 'posts.user_id')
                ->orderBy('userts.'.$params, $flag)
                ->with('user')
                ->select('posts.*')
                ->get();
        }
        else {
            $posts = Post::query()
                ->orderBy($params, $flag)
                ->with('user')
                ->get();
        }
        return $posts;
    }

    public function show_reply($id){

        $posts = Post::query()
            ->where('reply', '=', $id)
            ->with('user')
            ->get();

        return $posts;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Post
     */
    public function store(Request $request)
    {


        if(!preg_match("/^[a-zA-Z0-9_-]{2,50}$/", $request->data['username']))
            return "error";

        if(!preg_match("/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i", $request->data['email']))
            return "error";
        /*
        try {
            if(!preg_match("/^[a-zA-Zа-яА-Я0-9_-]{2,50}$/", $request->data['title']))
                return "error";
        }
        catch (Exception $e){
            $a = 1;
        }
        */


        if(!preg_match("/^[a-zA-Z0-9_-]{2,50}$/", $request->data['captcha']))
            return "error";

        $nnn = new CaptchaServiceController();
        $flag = $nnn->captchaFormValidate($request->data['captcha']);

        if(!$flag)
            return "error";

        $post = new Post;

        $user_email = $request->data['email'];
        $user_username = $request->data['username'];

        $user = Usert::query()
            ->where('email', '=', $user_email)
            ->where('username', '=', $user_username)
            ->first();

        if(!isset($user->id)){
            $user = new Usert;
            $user->username = $user_username;
            $user->email = $user_email;
            if(isset($request->data['homepage']))
                $user->homepage = $request->data['homepage'];
            $user->save();
        }

        $post->user_id = $user->id;

        if(isset($request->data['title']))
            $post->title =  $request->data['title'];
        else
            $post->title = null;

        if(isset($request->data['reply']))
            $post->reply = $request->data['reply'];
        else
            $post->reply = null;

        $post->body = $request->data['body'];
        if(isset($request->data['include_file']))
            $post->include_file = $request->data['include_file'];
        else
            $post->include_file = '';
        $post->save();

        //$file = $request->file('file')->store('uploads');
        //$url = Storage::url($file);

        /*
        $destinationPath = 'uploads';
        $file->move($destinationPath,$file->getClientOriginalName());
        $post->include_file = $file->getClientOriginalName();
        */

        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object
     */
    public function show($id)
    {
        $posts = Post::query()
            ->where('id', '=', $id)
            ->with('user')
            ->first();
        return $posts;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Post
     */
    public function update(Request $request, Post $post)
    {
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response(null, 204);
    }
}
