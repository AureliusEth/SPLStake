use solana_program::{
    account_info::{next_account_info, AccountInfo}, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey
};

entrypoint!(process_instruction);
fn process_instruction(_program_id: &Pubkey,
    _accounts: &Vec<AccountInfo>,
    instruction_data: &[u8],
) -> ProgramResult {
    let key: &u8 = instruction_data.first().unwrap();
    match key {
        0 =>msg!("zero!"),
        1 =>msg!("one!"),
        _ => msg!("erorr {:?}",instruction_data),
        
    };
    
    msg!("your in control!");
    Ok(())
}