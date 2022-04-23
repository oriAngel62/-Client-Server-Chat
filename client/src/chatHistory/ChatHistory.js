import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, { useState, useEffect, useRef } from "react";
 import Recording from "./Recording";
import "./paperclip.png";
import AddVidPic from "./AddVidPic";

function ChatHistory({ contact, sendDataToParent }) {
    let videoType = "";
    var [list_of_messeges, set_list_of_messeges] = useState(
        contact.listMessages
    );
    

// set_list_of_messeges(contact.listMessages);
    useEffect(() => {
    set_list_of_messeges(contact.listMessages);
    }, [contact.listMessages]);
    const [selectedImage, setSelectedImage] = useState();
    const [modeVidPic, setModeVidPic] = useState("pic");
    var chatList = list_of_messeges.map((messege, key) => {
    return <MessegeBox messege={messege} key={key} />;
    });
    const [input, setInput] = useState("");
    const [inputFile, setInputFile] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    let menuRef = useRef();
    let menuButtonRef = useRef();
    useEffect(() => {
    document.addEventListener("mousedown", (event) => {
        if (
            !menuRef.current.contains(event.target) &&
            !menuButtonRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        });
    });
    const addAudio = (audioSrc) => {
        var audSource = audioSrc;
    let messege = [
        {
            sender: "me",
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context:
                audSource,
            lastContextTime:
                "1 min ago",
        },
                    ];
    var newList =
        [];
    newList =
        list_of_messeges.concat(
            messege
        );
    set_list_of_messeges(
        newList
    );
    
    sendDataToParent(
    contact,
    messege[0],
    contact.id
    );
    }


    return (
        <div className="chatPlace">
            <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div calssName="chatBox" id="box">
                {chatList}
            </div>
            <div className="bottomPart">
                <div ref={menuRef}>
                    {showMenu ? (
                        <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic example"
                        >
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                onClick={() => {
                                    setInputFile("");
                                    setModeVidPic("pic");
                                }}
                            >
                                <span>
                                    <i class="bi bi-file-image"></i>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                onClick={() => {
                                    setInputFile("");
                                    setModeVidPic("vid");
                                }}
                            >
                                <span>
                                    <i class="bi bi-camera-video"></i>
                                </span>
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal2"
                            >
                                <span>
                                    <i class="bi bi-voicemail"></i>
                                </span>
                            </button>
                            <div
                                className="modal fade"
                                id="exampleModal2"
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                            <Recording sendDataBack={addAudio}/>
                                        
                                        

                                       
                                    </div>
                                </div>
                            </div>
                            <div
                                className="modal fade"
                                id="exampleModal1"
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <input
                                                type="file"
                                                name="myImage"
                                                id="inputPicVid"
                                                value={inputFile}
                                                onInput={(e) =>
                                                    setInputFile(e.target.value)
                                                }
                                                onChange={(event) => {
                                                    var name =
                                                        event.target.files[0]
                                                            .name;
                                                    if (modeVidPic == "pic")
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
                                                                    event.target
                                                                        .files[0]
                                                                )
                                                            );
                                                        } else {
                                                            alert(
                                                                "choose an image file please"
                                                            );
                                                            setInputFile("");
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
                                                                    event.target
                                                                        .files[0]
                                                                )
                                                            );
                                                            const wordArray =
                                                                name.split(".");
                                                            videoType =
                                                                "video/" +
                                                                wordArray[1];
                                                        } else {
                                                            alert(
                                                                "choose a video file please"
                                                            );
                                                            setInputFile("");
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
                                                        var messege = [];
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
                                                                messege = [
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
                                                                var newList =
                                                                    [];
                                                                newList =
                                                                    list_of_messeges.concat(
                                                                        messege
                                                                    );
                                                                set_list_of_messeges(
                                                                    newList
                                                                );
                                                            } else {
                                                                var imageSource =
                                                                    [
                                                                        selectedImage,
                                                                        videoType,
                                                                    ];
                                                                messege = [
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
                                                                var newList =
                                                                    [];
                                                                newList =
                                                                    list_of_messeges.concat(
                                                                        messege
                                                                    );
                                                                set_list_of_messeges(
                                                                    newList
                                                                );
                                                            }
                                                        setSelectedImage("");
                                                        sendDataToParent(
                                                            contact,
                                                            messege[0],
                                                            contact.id
                                                        );
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div ref={menuButtonRef} className="attachment">
                    <button
                        type="button"
                        className="btn btn-primary"
                        aria-label="glyphicon glyphicon-paperclip"
                        onClick={() => {
                            if (showMenu) {
                                setShowMenu(false);
                            } else setShowMenu(true);
                        }}
                    >
                        <span
                            className="glyphicon glyphicon-paperclip"
                            aria-hidden="true"
                        >
                            <i className="bi bi-paperclip"></i>
                        </span>
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Write a new message"
                    id="text"
                    value={input}
                    onInput={(e) => setInput(e.target.value)}
                ></input>
                <button
                    onClick={() => {
                        const messege = [
                            {
                                sender: "me",
                                type: "text",
                                date: "05/04/2022",
                                time: "12:54",
                                context: input,
                                lastContextTime: "1 min ago",
                            },
                        ];
                        var newList = [];
                        if(input !== "")
                        {
                        newList = list_of_messeges.concat(messege);
                        set_list_of_messeges(newList);
                        const textBox = document.getElementById("text");
                        setInput("");
                        sendDataToParent(contact, messege[0], contact.id);
                        }
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatHistory;
