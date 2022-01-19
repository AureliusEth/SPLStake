# SPLStake

Description

This program performs various staking functions such as minting and getting a users SPL Token and locking it up in a contract for the purpose of staking.

Instructions:
0. cd into the cli part of the program.
1. Put the path to your private key (/id.json) into the keyInfo.txt file.
2. Put your chosen tokens public mint address into the file called addressInfo.txt.
3. run the program by typing npx ts-node index.ts .
4.  It will transfer 1000 of that selected token while also minting a reward pool.

Tests:

There are two unit tests to run y simply running npm test
the first test are for checking that the file path given for the private key is the correct file type.
the second test checks if the address given in keyInfo.txt is a valid public mint address.
