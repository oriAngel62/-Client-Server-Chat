import React, { useState } from "react";

function AddVideo({ sendDataBack, contact, token }) {
    const [inputFile, setInputFile] = useState();
    const [timeCreated, setTimeCreated] = useState(getTime());
    const [selectedImage, setSelectedImage] = useState("");
    let videoType = "";

    async function getTime(){
        const time = await fetch("http://localhost:5285/api/contacts/GetTime/time",{
            method: 'GET',
            headers: {"Authorization" : "Bearer " + token} 
        });
        return(time);
    }


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
                                        Created: timeCreated,
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
