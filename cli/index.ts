
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
const splToken = require('@solana/spl-token');
const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
const programId  = new web3.PublicKey("895ZeWDVGjZmoSwbPq72Ms3q7QxkL2bN83EAn1LVcGay")
const key: Uint8Array = Uint8Array.from([9,107,84,74,163,67,202,96,121,49,136,163,149,4,146,171,41,152,210,46,128,23,70,150,25,78,218,127,7,176,133,62,221,66,111,57,66,6,198,70,240,89,153,84,130,3,123,16,8,86,9,124,0,144,71,210,47,240,85,245,118,5,236,100])
const senderKeypair: Keypair = Keypair.generate();
async function main(){
    var _balance = 0;
    const signer: web3.Keypair=web3.Keypair.fromSecretKey(key)
    await  connection.getBalance(signer.publicKey).then((balance) => {
        console.log("SOL: ", balance / web3.LAMPORTS_PER_SOL);
        
    });
    const data: Buffer = Buffer.from(Uint8Array.of(1)) 
    const transaction = new web3.Transaction().add(new web3.TransactionInstruction({
        keys: [],
        programId,
        data,

    }));
    await web3.sendAndConfirmTransaction(connection, transaction , [signer]).then((sig) =>{
        console.log("sig: {}", sig)
    })
     
    const Arrived = await connection.requestAirdrop(senderKeypair.publicKey, 1000000000);
    await connection.confirmTransaction(Arrived);    
}
var create_reward_pool
setTimeout(async function(){ 
    
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
    console.log("please airdrop sol to this public address if the value above is and then hit any key",senderKeypair.publicKey.toBase58())
    await delay(20000); 

    //create mint
    console.log("function called!")
    const mint = await splToken.Token.createMint(connection, senderKeypair, senderKeypair.publicKey, null, 9, splToken.TOKEN_PROGRAM_ID)
    console.log('mint public address: ' + mint.publicKey.toBase58());

    //get the token accont of this solana address, if it does not exist, create it
    create_reward_pool = await mint.getOrCreateAssociatedAccountInfo(
        senderKeypair.publicKey
    )

    console.log('token public address: ' + create_reward_pool.address.toBase58());

    //minting 100 new tokens to the token address we just created
    await mint.mintTo(create_reward_pool.address, senderKeypair.publicKey, [], 1000000000);

    console.log('tokens created!');

}, 20000);



main()
    .then(() => process.exit)
    .catch((error)=> {
        console.error(error);
        process.exit(1)

    })
