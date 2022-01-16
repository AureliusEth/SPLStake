
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
const splToken = require('@solana/spl-token');
const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
const programId  = new web3.PublicKey("895ZeWDVGjZmoSwbPq72Ms3q7QxkL2bN83EAn1LVcGay")
const mintPub = new web3.PublicKey("F7Nm4LAWYnn7k2Pa8VxRNNZzzijbDuBknRmtzWa86WVX")
const key: Uint8Array = Uint8Array.from([9,107,84,74,163,67,202,96,121,49,136,163,149,4,146,171,41,152,210,46,128,23,70,150,25,78,218,127,7,176,133,62,221,66,111,57,66,6,198,70,240,89,153,84,130,3,123,16,8,86,9,124,0,144,71,210,47,240,85,245,118,5,236,100])
const senderKeypair: Keypair = Keypair.generate();
import * as readline from 'readline';

var create_reward_pool
setTimeout(async function(){ 
    const Arrived = await connection.requestAirdrop(senderKeypair.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(Arrived);
    const signer: web3.Keypair=web3.Keypair.fromSecretKey(key)
    console.log("function called!")
    const mint = await splToken.Token.createMint(connection, signer, signer.publicKey, null, 9, splToken.TOKEN_PROGRAM_ID).catch(await connection.getBalance(senderKeypair.publicKey)
    .then((balance) => {console.log("SOL: ", balance / web3.LAMPORTS_PER_SOL)}))
    console.log('mint public address: ' + mint.publicKey.toBase58());

    //get the token accont of this solana address, if it does not exist, create it
    create_reward_pool = await mint.getOrCreateAssociatedAccountInfo(
        senderKeypair.publicKey
    )


    //minting 100 new tokens to the token address we just created
    await mint.mintTo(create_reward_pool.address, signer.publicKey, [], 1000000000);

    
    console.log('tokens created!');
    const usersToken = new Token(
        connection,
        mintPub,
        TOKEN_PROGRAM_ID,
        signer
      );

    var fromTokenAccount = await usersToken.getOrCreateAssociatedAccountInfo(
        signer.publicKey
      )
    var toTokenAccount = await usersToken.getOrCreateAssociatedAccountInfo(
        senderKeypair.publicKey
    )
    var token = "F7Nm4LAWYnn7k2Pa8VxRNNZzzijbDuBknRmtzWa86WVX"
    const tokenID = new web3.PublicKey(token)
    const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
        usersToken.associatedProgramId,
        usersToken.programId,
        mintPub,
        signer.publicKey
      );
    console.log("checing for recieving account data")
    const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);
    if (receiverAccount === null) {
        console.log("exeception handled")
        var transaction = new web3.Transaction()
        .add(
          Token.createAssociatedTokenAccountInstruction(
            usersToken.associatedProgramId,
            usersToken.programId,
            mintPub,
            associatedDestinationTokenAddr,
            toTokenAccount.address,
            signer.publicKey
          ))
      }
    console.log("sending tokens from")
    console.log(usersToken.programId.toBase58())
    console.log(TOKEN_PROGRAM_ID.toBase58())
    console.log(signer.publicKey.toBase58())
    console.log(fromTokenAccount.address.toBase58())
    var transaction = new web3.Transaction()
    .add(
      Token.createTransferInstruction(
        
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        signer.publicKey,
        [],
        1000
      )
    );
    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [signer],
        {commitment: 'confirmed'}
      );
      console.log("SIGNATURE", signature);
      console.log("SUCCESS");

}, 20000);

