<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskList;

class TaskController extends Controller
{
    public function showTasks(Request $request){
        $user=$request->user();
        $tasks=TaskList::where('created_by',$user->id)->get();
        if($tasks){
            return response()->json([
                'data'=>$tasks->sortByDesc('due')->values()->toArray(),
                'message'=>'tasks fetched'
            ],status:201);
        
        }
        return response()->json([
            
            'error'=>'tasks fetching failed'
        ],status:404);
    }

    public function createTasks(Request $request){
        $user=$request->user();
        $validated=$request->validate([
            'title'=>['required'],
            'description'=>['nullable','string'],
            'due'=>['nullable','date',],
            'status'=>['nullable','boolean'],
           
        ]);
        $tasks=new TaskList([
            'title'=>$validated['title'],
            'description'=>$validated['description']??null,
            'due'=>$validated['due']??null,
            'status'=>$validated['status']??null,
            'created_by'=> $user->id
        ]);
        $tasks->save();
        return response()->json([
            'message'=>'Task successfully recorded',
            'user'=>$tasks
        ],201);
    }
    public function updateTasks(Request $request,$id){
        $validated=$request->validate([
            'title'=>['required'],
            'description'=>['nullable','string'],
            'due'=>['nullable','date',],
            'status'=>['nullable','boolean'],
            'created_by'=>['required',]
        ]);
        
        $tasks=TaskList::find($id);

        if (!$tasks) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        
     
        $tasks->title = $validated['title'];
        $tasks->description = $validated['description'] ?? null;
        $tasks->due = $validated['due'] ?? null;
        $tasks->status = $validated['status'] ?? null;
        $tasks->created_by = $validated['created_by'];
        
       
        $tasks->update();
        return response()->json([
            'message'=>'Task successfully updated',
            'user'=>$tasks
        ],200);
    }

    public function deleteTasks(Request $request,$id){
        $tasks=TaskList::find($id);
        if($tasks){
            $tasks->delete();
            return response()->json([
                'message'=>'Deleted successfully',
                
            ],status:201);
        }
        else{
            return response()->json([
                'message'=>'Delete failed',
                
            ],status:404);
        }
    }

}
