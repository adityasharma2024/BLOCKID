async function main() {
  const BlockID = await ethers.getContractFactory("BlockID");
  const blockid = await BlockID.deploy();
  await blockid.waitForDeployment();
  console.log(`BlockID deployed to: ${blockid.target}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
