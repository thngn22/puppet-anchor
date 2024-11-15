import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Puppet } from "../target/types/puppet";
import { PuppetMaster } from "../target/types/puppet_master";
import { expect } from "chai";

describe("puppet", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const puppetProgram = anchor.workspace.Puppet as Program<Puppet>;
  const puppetMasterProgram = anchor.workspace
    .PuppetMaster as Program<PuppetMaster>;

  const puppetKeypair = anchor.web3.Keypair.generate();
  const authorityKeypair = anchor.web3.Keypair.generate();

  it("puppet!", async () => {
    // Add your test here.
    await puppetProgram.methods
      .initialize(authorityKeypair.publicKey)
      .accounts({
        puppet: puppetKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([puppetKeypair])
      .rpc();

    await puppetMasterProgram.methods
      .pullString(new anchor.BN(42))
      .accounts({
        puppet: puppetKeypair.publicKey,
        authority: authorityKeypair.publicKey,
      })
      .signers([authorityKeypair])
      .rpc();

    expect(
      (
        await puppetProgram.account.data.fetch(puppetKeypair.publicKey)
      ).data.toNumber()
    ).to.equal(42);
  });
});
