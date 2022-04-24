import React, { useState } from "react";



function Recording({sendDataBack}) {
  let recording = false;
  const [recordingSource, setRecordingSource] = useState("");
  console.log(recordingSource);
  let globalRecorder;
  let audioUrl;
  let audio = document.createElement('audi');
  audio.setAttribute('controls', '');
  const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          audioUrl = URL.createObjectURL(audioBlob);
          setRecordingSource(URL.createObjectURL(audioBlob));
          // audio = new Audio(audioUrl);
          resolve({ audioBlob, audioUrl});
        });

        mediaRecorder.stop();
      });

      

    resolve({ start, stop });
  });

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  async function  start() {
  globalRecorder = await recordAudio();
  globalRecorder.start();
  recording = true;
  console.log("started");
  await sleep(30000);
  if(recording)
  {
  globalRecorder.stop();
  recording = false;
  console.log("stopped");
  }
  }

  async function stop(){
    if(recording)
    {
      globalRecorder.stop();
      recording = false;
      console.log("stopped");
    }
  }
    

    

  return (
    <div>
      <div className="modal-body">
      <button                                        id="oneButton"
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onMouseDown={start}
                                                    onMouseUp={stop}
                                                    >Press and hold to record
                                                    </button>
                                                    <div  className="audio" >
                                                    <audio controls src={recordingSource} type='audio/mpeg'>
                                                    </audio>
          </div>
          </div>   
          <div className="modal-footer">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-lg"
                                                    data-bs-dismiss="modal"
                                                    onClick={() => {sendDataBack(recordingSource);
                                                    setRecordingSource("");}}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>                               
    </div>
  );
}

export default Recording;
