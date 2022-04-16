import React, { useState } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import ReactAudioPlayer from "react-audio-player";


function Recording() {
  const [recordstate, setrecordstate] = useState("NONE");
  var [recording,set_recording] = useState(false);
  const [blobURL, setblobURL] = useState("");

  const start = () => {
      if(!recording)
      {
        set_recording(true);      
    console.log(recordstate);
    console.log("start");
    setrecordstate(RecordState.START);
      }
  };

  const stop = () => {
    if(recording)
    {
        set_recording(false);   
    console.log("stop");
    setrecordstate(RecordState.STOP);
    }
  };

  const onStop = (audioData) => {
    console.log("audio data: " + audioData.url);
    setblobURL(audioData.url);
    console.log(blobURL);
  };

  return (
    <div>
      <AudioReactRecorder state={recordstate} onStop={onStop} />
      <ReactAudioPlayer src={blobURL} controls />
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
