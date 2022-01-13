
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import base58 from 'bs58';
import config from '../shared/config';
async function main(){

}
main()
    .then(() => process.exit)
    .catch((error)=> {
        console.error(error);
        process.exit(1)
    })