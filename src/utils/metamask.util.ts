import ethers from "ethers"

const initializeMetamask = async (
  _accountChangeHandler: (e: any) => any,
  _userBalanceHandler: (e: any) => any
) => {
  if (window && window.ethereum) {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((result: any[]) => {
        accountChangedHandler(result[0], _accountChangeHandler)
        getUserBalance(result[0], _userBalanceHandler)
        console.log(result[0])
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
export default initializeMetamask

export const accountChangedHandler = (
  newAccount: React.SetStateAction<string>,
  callback: (e: any) => any
) => {
  callback(newAccount)
}

export const getUserBalance = (
  address: React.SetStateAction<string>,
  callback: (e: any) => any
) => {
  window.ethereum
    .request({
      method: "eth_getBalance",
      params: [address, "latest"],
    })
    .then((balance: React.SetStateAction<any>) => {
      callback(ethers.utils.formatEther(balance))
    })
}
