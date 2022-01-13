
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import base58 from 'bs58';
import config from '../shared/config';
const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
const programId  = new web3.PublicKey("FthrfCyLNJW3i7sPto5tyju8upYvVWyRzTTp8cUDkfeK")
const key: Uint8Array = Uint8Array.from([9,107,84,74,163,67,202,96,121,49,136,163,149,4,146,171,41,152,210,46,128,23,70,150,25,78,218,127,7,176,133,62,221,66,111,57,66,6,198,70,240,89,153,84,130,3,123,16,8,86,9,124,0,144,71,210,47,240,85,245,118,5,236,100])

async function main(){
    const signer: web3.Keypair=web3.Keypair.fromSecretKey(key)
    await connection.getBalance(signer.publicKey).then((balance) => {
        console.log("SOL: ", balance / web3.LAMPORTS_PER_SOL);
    });

    const transaction = new web3.Transaction().add(new web3.TransactionInstruction({
        keys: [],
        programId: programId,

    }));
    await web3.sendAndConfirmTransaction(connection, transaction , [signer]).then((sig) =>{
        console.log("sig: {}", sig)
    }) 

}

main()
    .then(() => process.exit)
    .catch((error)=> {
        console.error(error);
        process.exit(1)

    })
