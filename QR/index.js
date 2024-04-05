import QRCode from "https://esm.sh/qrcode";

function download(dataurl, filename) {
  const link = document.createElement("a");

  link.href = dataurl;
  link.download = filename;
  link.click();

  document.removeElement(link);
}

QRCode.toDataURL("I am a pony!", function (err, qrCodeImageDataUrl) {
  console.log(qrCodeImageDataUrl);

  download(qrCodeImageDataUrl, "qrcode.png");
});
