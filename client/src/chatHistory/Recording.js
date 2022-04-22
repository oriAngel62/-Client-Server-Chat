import React, { useState } from "react";



function Recording() {
  var [recording,set_recording] = useState(false);
  let isRec = false;
  let chunks =[];
  console.log({recording});
  const audio = document.querySelector('.audi');

  function record() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia (
       {
          audio: true
       })
 
       .then(function(stream) {
         const mediaRecorder = new MediaRecorder(stream);
         console.log("startedAll");
           if(!recording)
           {
           mediaRecorder.start();
           console.log("started");
           console.log(mediaRecorder.state);
           console.log({recording});
           mediaRecorder.ondataavailable = function(e) {
             chunks.push(e.data);
            }
            isRec = true;
            set_recording(true);
            console.log("after started");
           
           }
           else{
             isRec = false;
             console.log("stopped");
             console.log(mediaRecorder.state);
             const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
             chunks = [];
             const audioURL = window.URL.createObjectURL(blob);
             console.log({audioURL});
             audio.src = audioURL;
             set_recording(false);
             console.log("off finish");
             mediaRecorder.stop();
            }
     
         }

      )}
    }

    

  return (
    <div>
      <button                                        id="oneButton"
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={record}
                                                    >{recording ? 'Stop Recording' : 'Start Recording'}
                                                    </button>
                                                    <audio className="audi" controls></audio>
    </div>
  );
}

export default Recording;
