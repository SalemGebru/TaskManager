<?php

namespace Tests\Unit;


use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginTest extends TestCase
{
    
    /** @test */
    public function it_logs_in_with_correct_credentials()
    {
      User::factory()->create([
        'name'=>'sagedereja',
        'password'=> bcrypt('Sagedereja123!')
      ]);

      $response=$this->postJson('api/login',[
        'name'=>'sagedereja',
        'password'=>'Sagedereja123!'
      ]);

      $response->assertStatus(201);
    }
    
     /** @test */
    public function it_fails_for_incorrect_credentials(){
        User::factory()->create([
            'name'=>'sagederejacom',
            'password'=> bcrypt('Sagedereja123!')
          ]);

          $response=$this->postJson('api/login',[
            'name'=>'sagedereja',
            'password'=>'Sagedereja123!'
          ]);
          $response->assertStatus(404);
    }
}
