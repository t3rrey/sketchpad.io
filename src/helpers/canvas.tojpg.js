// edited from https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
function dataURIToBlob(dataURI, callback) {
    var binStr = atob(dataURI.split(",")[1]),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }

    callback(new Blob([arr]));
}

function callback(blob) {
    var a = document.createElement("a");
    a.download = "drawing";
    a.innerHTML = "download";
    // the string representation of the object URL will be small enough to workaround the browser's limitations
    a.href = URL.createObjectURL(blob);
    // you must revoke the object URL,
    //   but since we can't know when the download occured, we have to attach it on the click handler..
    a.onclick = function() {
        // ..and to wait a frame
        requestAnimationFrame(function() {
            URL.revokeObjectURL(a.href);
        });
        a.removeAttribute("href");
    };
}

export default function download(canvas) {
    const dataURL = canvas.toDataURL({ format: "png", multiplier: 4 });
    const blob = dataURIToBlob(dataURL, callback);

    console.log({ dataURL, blob });

    const link = document.createElement("a");
    link.href = dataURL;
    const filename = window.prompt("File name:", "sketch");
    link.download = filename;
    link.click();
}