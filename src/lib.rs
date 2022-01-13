use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey
};
fn main() {
    
}
entrypoint!(process_instruction);
fn process_instruction(_program_id: &Pubkey,
    _accounts: &Vec<AccountInfo>,
    instruction_data: &[u8],
) -> ProgramResult {
    let key: &u8 = instruction_data.first().unwrap();
    match key {
        0 =>msg!("zero!"),
        1 =>msg!("one!"),
        _ => msg!("erorr"),
        
    }
    
    Ok(())
}