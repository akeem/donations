function extractLockAddress() {
  return document
    .querySelector("meta[property='og:lockAddress']")
    .getAttribute("content");
}

function extractDescription() {
  return document
    .querySelector("div[id='unlock-donation']")
    .getAttribute("data-message");
}

function iframeSource() {
  let lockAddress = extractLockAddress();
  let description = encodeURIComponent(extractDescription());
  // return `https://akeem.github.io/donations/button.html?lockAddress=${lockAddress}&description=${description}`;
  return `./button.html?lockAddress=${lockAddress}&description=${description}`;
}

let donationDiv = document.getElementById("unlock-donation");
let donationIframe = document.createElement("iframe");

donationIframe.src = iframeSource();
donationIframe.width = "500";
donationIframe.height = "500";
donationIframe.setAttribute("frameborder", "0");
donationDiv.appendChild(donationIframe);
