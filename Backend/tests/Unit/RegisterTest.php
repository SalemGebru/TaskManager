<?php

namespace Tests\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * A basic unit test example.
     *
    use RefreshDatabase;
    
    
    /** @test */
public function it_registers_users()
{
    $response = $this->postJson('/api/register', [
        'name' => 'Jane Smith',
        'email' => 'janetymiddlefiddlesmith@gmail.com',
        'password' => 'Jane123!',  
    ]);

    $response->assertStatus(201)  
        ->assertJsonStructure([
            'user' => ['id', 'name', 'email', 'created_at', 'updated_at'],
            'token'
        ]);

    $this->assertDatabaseHas('users', ['email' => 'janesmith@gmail.com']);
}

    /** @test */
    public function it_fails_if_fields_are_missing(){
        $response = $this->postJson('/api/register', []);

      
        $response->assertStatus(422)  
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }
    
    /** @test */
    public function it_fails_if_email_is_in_use(){
        User::factory()->create(['email' => 'bonnetya@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'bonnetya@gmail.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(404)
                 ->assertJsonValidationErrors(['email']);
    }
}
