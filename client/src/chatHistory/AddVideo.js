import React, { useState } from "react";

function AddVideo({ sendDataBack, contact }) {
    const [inputFile, setInputFile] = useState();
    const [selectedImage, setSelectedImage] = useState("");
    let videoType = "";
    var token = localStorage.getItem('token');

    async function getTime(){
        const time = await fetch("https://localhost:7285/api/contacts/GetTime/time",{
            method: 'GET',
            headers: {"Authorization" : "Bearer " + token} 
        });
        return(time);
    }

    /*
    type:
    text -0
    video -1
    image -2
    audio -3
    */

    return (
        <div>
            <div className="modal-body">
                <input
                    type="file"
                    className="myImage"
                    id="inputVid"
                    accept="video/mp4,video/x-m4v,video/mov,video/*"
                    onInput={(e) => setInputFile(e.target.value)}
                    onChange={(event) => {
                        var name = event.target.files[0].name;
                        setSelectedImage(
                            URL.createObjectURL(event.target.files[0])
                        );
                        const wordArray = name.split(".");
                        videoType = "video/" + wordArray[1];
                    }}
                />
            </div>
            <div className="modal-footer">
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            let messege = [];
                            if (selectedImage != null) {
                                var imageSource = [selectedImage, videoType];
                                messege = [
                                    {
                                        Type: "video",                       // to change next ass
                                        Content: imageSource,
                                        Sent: true,
                                        Created: getTime(),
                                    },
                                ];
                            }
                            setSelectedImage("");
                            sendDataBack(messege, contact);
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* <AddVidPic param="video" selected={selectedImage} type={videoType}/> */}
        </div>
    );
}

export default AddVideo;
