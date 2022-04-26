import React, { useState } from "react";
//import AddVidPic from "./AddVidpic";

function AddVideo({sendDataBack, contact}) {
const [inputFile, setInputFile] = useState();
const [selectedImage, setSelectedImage] = useState("");
let videoType = "";
return(
<div>
<div className="modal-body">
                                                    <input
                                                        type="file"
                                                        className="myImage"
                                                        id="inputVid"
                                                        //value={inputFile}
                                                        accept="video/mp4,video/x-m4v,video/mov,video/*"
                                                        onInput={(e) =>
                                                            setInputFile(
                                                                e.target.value
                                                            )
                                                        }
                                                        onChange={(event) => {
                                                            var name =
                                                            event.target
                                                                .files[0]
                                                                .name;
                                                                    setSelectedImage(
                                                                        URL.createObjectURL(
                                                                            event
                                                                                .target
                                                                                .files[0]
                                                                        )
                                                                    );
                                                                    const wordArray =
                                                                    name.split(
                                                                        "."
                                                                    );
                                                                videoType =
                                                                    "video/" +
                                                                    wordArray[1];
                                                            }
                                                        }
                                                    />
                                                </div>
                                                <div className="modal-footer">
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-lg"
                                                        data-bs-dismiss="modal"
                                                        onClick={() => {
                                                            
                                                            let messege =
                                                                [];
                                                            if (
                                                                selectedImage !=
                                                                null
                                                            )
                                                                {
                                                                    var imageSource =
                                                                    [
                                                                        selectedImage,
                                                                        videoType,
                                                                    ];
                                                                messege =
                                                                    [
                                                                        {
                                                                            sender: "me",
                                                                            type: "video",
                                                                            date: "05/04/2022",
                                                                            time: "12:54",
                                                                            context:
                                                                                imageSource,
                                                                            lastContextTime:
                                                                                "1 min ago",
                                                                        },
                                                                    ];
                                                            }
                                                        setSelectedImage(
                                                            ""
                                                        );
                                                        sendDataBack(
                                                            messege,
                                                            contact
                                                        );
                                                        }
                                                        }
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