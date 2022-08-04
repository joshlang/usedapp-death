import { ChainId, useCall, useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import './App.css';
import erc20 from "./ERC20.json"

function App() {

  const usdcBinance = new Contract("0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", erc20)
  const usdcFantom = new Contract("0x04068da6c83afcfa0e13ba15a6696662335d5b75", erc20)
  const usdcLocal = new Contract("0x1234567890123456789012345678901234567890", erc20)

  const { chainId, account, activateBrowserWallet, deactivate } = useEthers()
  //const binanceResult = useCall({ contract: usdcBinance, method: "totalSupply", args: [] }, { chainId: ChainId.BSC })
  //const fantomResult = useCall({ contract: usdcFantom, method: "totalSupply", args: [] }, { chainId: ChainId.Fantom })
  const localResult = useCall({ contract: usdcLocal, method: "totalSupply", args: [] }, { chainId: 2 })

  //const binanceSupply = binanceResult?.value?.[0]
  //const fantomSupply = fantomResult?.value?.[0]
  const localSupply = localResult?.value?.[0]

  return <>
  <div><button onClick={() => activateBrowserWallet()}>Connect</button></div>
  <div><button onClick={() => deactivate()}>Disconnect</button></div>
  <div>Currently connected to account '{account}' on chainId={chainId}</div>
  {/* <div>Binance supply: {binanceSupply ? formatEther(binanceSupply) : "Not loaded"}</div>
  <div>Fantom supply: {fantomSupply ? formatUnits(fantomSupply, 6) : "Not loaded"}</div> */}
  <div>Local supply: {localSupply ? formatUnits(localSupply, 6) : "Not loaded"}</div>
  </>
}

export default App;
