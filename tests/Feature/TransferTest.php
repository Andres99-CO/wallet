<?php

namespace Tests\Feature;

use App\Transfer;
use App\Wallet;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TransferTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testPostTransfer()
    {
        $wallet = factory(Wallet::class)->create();
        $transfer = factory(Transfer::class)->make();

        $response = $this->json('POST', '/api/transfer', [
            'amount' => $transfer->amount,
            'description' => $transfer->description,
            'wallet_id' => $wallet->id
        ]);

        $response->assertJsonStructure(['transfer' => [
            'id', 'amount', 'description', 'wallet_id'
        ]])->assertStatus(201);

        $this->assertDatabaseHas('transfers', [
            'amount' => $transfer->amount,
            'description' => $transfer->description,
            'wallet_id' => $wallet->id
        ]);

        $this->assertDatabaseHas('wallets', [
            'id' => $wallet->id,
            'money' => $wallet->money + $transfer->amount,
        ]);
    }
}
