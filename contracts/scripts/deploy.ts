import "@nomiclabs/hardhat-ethers"
import hre, { ethers } from "hardhat"

const main = async () => {
  const Contract = await ethers.getContractFactory("")
  const contract = await Contract.deploy()

  await contract.deployed()

  console.log(`Contract deployed : ${contract.address}`)
}

main()
  .then(() => {
    console.log("Deployment successful")
  })
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
