use anchor_lang::prelude::*;

declare_id!("3Zrk1LeDXB5RueXiDcjvsww8hZMPG7Lp5ej5j9Mt81Th");

#[program]
pub mod puppet {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub puppet: Account<'info, Data>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Data {
    pub data: u64,
}
