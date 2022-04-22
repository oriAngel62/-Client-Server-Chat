import React, { useState } from "react";



function Recording() {
  const [recordstate, setrecordstate] = useState("NONE");
  var [recording,set_recording] = useState(false);
  const [blobURL, setblobURL] = useState("");
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  let mediaRecorder = new MediaRecorder(stream);
  const audioChunks = [];
  let audioUrl;
  
  const start = () => {
      if(!recording)
      {
        set_recording(true);      
    console.log(recordstate);
    console.log("start");
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    mediaRecorder.start();
    // setrecordstate(RecordState.START);
      }
  };

  

const stop = () => {
  if(recording)
  {
    set_recording(false);   
    console.log("stop");
    new Promise(resolve => {
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        resolve({ audioBlob, audioUrl});
      });
      mediaRecorder.stop();
    });
  };
}

  // const onStop = (audioData) => {
  //   console.log("audio data: " + audioData.url);
  //   setblobURL(audioData.url);
  //   console.log(blobURL);
  // };

  return (
    <div>
      <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={recording ? stop : start}
                                                    >{recording ? 'Stop Recording' : 'Start Recording'}
                                                    </button>
    </div>
  );
}
export default Recording;
