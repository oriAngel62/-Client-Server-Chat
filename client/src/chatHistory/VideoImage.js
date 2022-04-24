import React, { useState,useRef } from "react";


function VideoImage({sendDataBack , contact ,inputFileState, getModeVidPicState}) {
    var modeVidPicState = getModeVidPicState();
    const [selectedImage, setSelectedImage] = useState("");  
    const [inputFile, setInputFile] = useState(inputFileState);
    const [modeVidPic, setModeVidPic] = useState(modeVidPicState);
    let videoType = "";
    console.log( modeVidPicState);
return(
    <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <input
                                                        type="file"
                                                        name="myImage"
                                                        id="inputPicVid"
                                                         value={inputFile}
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
                                                            if (
                                                                modeVidPic ==
                                                                "pic"
                                                            )
                                                                if (
                                                                    name.endsWith(
                                                                        ".png"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".gif"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".jpeg"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".jpg"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".PNG"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".GIF"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".JPEG"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".JPG"
                                                                    )
                                                                ) {
                                                                    setSelectedImage(
                                                                        URL.createObjectURL(
                                                                            event
                                                                                .target
                                                                                .files[0]
                                                                        )
                                                                    );
                                                                } else {
                                                                    alert(
                                                                        "choose an image file please"
                                                                    );
                                                                    setInputFile(
                                                                        ""
                                                                    );
                                                                    setSelectedImage(
                                                                        ""
                                                                    );
                                                                }
                                                            else {
                                                                if (
                                                                    name.endsWith(
                                                                        ".mp4"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".mov"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".wmv"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".avi"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".avchd"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".mkv"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".flv"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".f4v"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".swf"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".webm"
                                                                    ) ||
                                                                    name.endsWith(
                                                                        ".html5"
                                                                    )
                                                                ) {
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
                                                                } else {
                                                                    alert(
                                                                        "choose a video file please"
                                                                    );
                                                                    setInputFile(
                                                                        ""
                                                                    );
                                                                    setSelectedImage(
                                                                        ""
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {/* <AddVidPic param={modeVidPic} selected={selectedImage} type={videoType}/>   almost working
                                                    its a display of the selected video or picture */}

                                                <div className="modal-footer">
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary btn-lg"
                                                            data-bs-dismiss="modal"
                                                            onClick={() => {
                                                                var messege =
                                                                    [];
                                                                if (
                                                                    selectedImage !=
                                                                    null
                                                                )
                                                                    if (
                                                                        modeVidPic ==
                                                                        "pic"
                                                                    ) {
                                                                        var imageSource =
                                                                            selectedImage;
                                                                        messege =
                                                                            [
                                                                                {
                                                                                    sender: "me",
                                                                                    type: "image",
                                                                                    date: "05/04/2022",
                                                                                    time: "12:54",
                                                                                    context:
                                                                                        imageSource,
                                                                                    lastContextTime:
                                                                                        "1 min ago",
                                                                                },
                                                                            ];
                                                                    } else {
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
                                                                    contact,
                                                                    messege[0],
                                                                    contact.id

                                                                );
                                                                setInputFile(
                                                                    ""
                                                                );
                                                                setModeVidPic("");
                                                            }}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
);
}

export default VideoImage;
