window["__1inch_connect_init_rpc__"] = {
  1: "https://mainnet.infura.io/v3/45f2c83c6fff49ddbab7eeb388963f51",
};
const scriptNode = document.createElement("script");
scriptNode.setAttribute(
  "src",
  "https://cdn.1inch.io/mobile/connect_button/desktop.js"
);
scriptNode.async = true;
// 2) this event will be called after loading and execution of our bundle.
window.addEventListener("1inch_connect_button_init", (e) => {
  // next line will show QR if user wasn't connected before or do connection without showing qr if user
  // connected;
  e.detail.provider.enable().then(() => {
    // here you should store e.detail.provider for further usage.
    // e.detail.provider is EIP-1193 provider object (like MetaMask).
    window["__1inch__"] = e.detail.provider;
  });
});
document.body.appendChild(scriptNode);
