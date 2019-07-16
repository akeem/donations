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

function donate(lockAddress, element) {
  let buttonValue = element.getAttribute("data-amount");
  let value = ethers.utils.parseUnits(buttonValue, 18);

  let abi = ["function purchaseFor(address _recipient) payable"];
  let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  var signer = provider.getSigner();
  let contract = new ethers.Contract(lockAddress, abi, provider);

  signer.getAddress().then(address => {
    let w = contract.connect(signer);
    w["purchaseFor(address)"](address, { value: value, gasLimit: 300000 });
  });
}
