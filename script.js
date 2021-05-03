let scanner = new Instascan.Scanner({
  video: document.getElementById("preview"),
});

var enter = String.fromCharCode(13); // Enter

scanner.addListener("scan", function (content) {

  // console.log("teste", content);

  var res = content.slice(0, 44);
  
  // console.log("res", res);

  document.getElementById("textArea").value += res + " " + enter;

});

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();

	URL.revokeObjectURL(a.href);
};

document.querySelector('#btnSave').addEventListener('click', () => {
  const textArea = document.querySelector('textarea');
  
  downloadToFile(textArea.value, 'my-new-file.txt', 'text/plain');
});


Instascan.Camera.getCameras()
  .then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
      $('[name="options"]').on("change", function () {
        if ($(this).val() == 1) {
          if (cameras[0] != "") {
            scanner.start(cameras[0]);
          } else {
            alert("No Front camera found!");
          }
        } else if ($(this).val() == 2) {
          if (cameras[1] != "") {
            scanner.start(cameras[1]);
          } else {
            alert("No Back camera found!");
          }
        }
      });
    } else {
      console.error("No cameras found.");
      alert("No cameras found.");
    }
  })
  .catch(function (e) {
    console.error(e);
  });

var video = document.getElementById("video");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    //video.src = window.URL.createObjectURL(stream);
    // video.srcObject = stream;
    // video.play();
  });
}
