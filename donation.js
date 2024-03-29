function extractLockAddress() {
  var url = new URL(window.location);
  var params = new URLSearchParams(url.search);
  return params.get("lockAddress");
}

function extractDescription() {
  var url = new URL(window.location);
  var params = new URLSearchParams(url.search);
  return params.get("description");
}

async function ethPriceConversion(price){
  let url = 'https://api.coinbase.com/v2/prices/ETH-USD/buy'
  let result = await fetch(url)
  let foo = await result.json()
  
  return price/Number(foo.data.amount)
}

async function donate(lockAddress, element) {
  let buttonValue = element.getAttribute("data-amount");
  let convertedPrice = await ethPriceConversion(buttonValue) 

  let value = ethers.utils.parseUnits(convertedPrice.toString(), 18);

  let abi = ["function purchaseFor(address _recipient) payable"];
  let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  var signer = provider.getSigner();
  let contract = new ethers.Contract(lockAddress, abi, provider);

  signer.getAddress().then(address => {
    let w = contract.connect(signer);
    w["purchaseFor(address)"](address, { value: value, gasLimit: 300000 });
  });
}
