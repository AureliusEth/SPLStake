
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
const splToken = require('@solana/spl-token');
const connection = new web3.Connection(web3.clusterApiUrl("devnet")) // sets the connection as devnet
const fs = require('fs') 
const senderKeypair: Keypair = Keypair.generate(); // generates a keypair for the programs account
var create_reward_pool
setTimeout(async function(){
    let pKey: number[] = [] // makes our public key an iterable array as that is what is required
 
    let keyinfo = fs.readFileSync("keyInfo.txt", 'utf8') // reads the private key
    let data = fs.readFileSync(keyinfo.toString(),"utf8") //makes it into a string
    var buildkey = ""
    for (const ch of data){
        
        if (ch != "," && ch !="]" && ch!="["){
            buildkey = buildkey+ch // concatenates each integer to make the key value before the comma 
            console.log(buildkey)
            setTimeout(function(){
            }, 1000); 
        }
        
        if (ch === "," || ch === "]"){
            pKey.push(Number(buildkey)) // if a comma is reached then make the concatanated string a number and push it
            console.log("Okay")
            buildkey = "" // reset the building of the string
            
        }
        
    };
    
    const rawPubMint = fs.readFileSync("addressInfo.txt", 'utf8')   //gets the public mint address from the file
    console.log("fetched",rawPubMint)
    console.log("fetched mint address",pKey)
    console.log(pKey.length)
    const mintPub = new web3.PublicKey(rawPubMint) // makes this into a publickey
    console.log("Accepted Mint Address")
    const key: Uint8Array = Uint8Array.from(pKey) 
    const signer: web3.Keypair=web3.Keypair.fromSecretKey(key) // creates signer from private key
    console.log("function called!")
    const mint = await splToken.Token.createMint(connection, signer, signer.publicKey, null, 9, splToken.TOKEN_PROGRAM_ID).catch(await connection.getBalance(senderKeypair.publicKey)
    .then((balance) => {console.log("SOL: ", balance / web3.LAMPORTS_PER_SOL)}))
    console.log('mint public address: ' + mint.publicKey.toBase58());
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
      ); // gets the users  token

    var fromTokenAccount = await usersToken.getOrCreateAssociatedAccountInfo(
        signer.publicKey // get the users token account or make one
      )
    var toTokenAccount = await usersToken.getOrCreateAssociatedAccountInfo(
        senderKeypair.publicKey 
    ) //   get or v the associated token
    const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
        usersToken.associatedProgramId,
        usersToken.programId,
        mintPub,
        signer.publicKey
      ); //  make a token account for the associated token
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
      ) // transfers users tokens
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

