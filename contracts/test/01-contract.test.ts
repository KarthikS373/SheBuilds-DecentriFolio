import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Contract", async () => {
  const deployContract = async () => {
    const [owner, otherAccount] = await ethers.getSigners()

    const Contract = await ethers.getContractFactory("")
    const contract = await Contract.deploy()

    return { contract, owner, otherAccount }
  }

  describe("Deployment", function () {
    it("", async () => {
      const { contract } = await loadFixture(deployContract)
    })
  })

  describe("Events", function () {})

  describe("Transfers", function () {})
})
