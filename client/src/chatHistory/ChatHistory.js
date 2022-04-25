import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, { useState, useEffect, useRef } from "react";
import Recording from "./Recording";
import "./paperclip.png";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";

function ChatHistory({ contact, sendDataToParent }) {
    var [list_of_messeges, set_list_of_messeges] = useState(
        contact.listMessages
    );

    // set_list_of_messeges(contact.listMessages);
    useEffect(() => {
        set_list_of_messeges(contact.listMessages);
    }, [contact.listMessages]);
    const [modeVidPic, setModeVidPic] = useState("pic"); //
    var chatList = list_of_messeges.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    const [input, setInput] = useState("");
    const [showMenu, setShowMenu] = useState(false); //
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
    const addImageVideo = (messege, contact) => {
        var newList = [];
        newList = list_of_messeges.concat(messege[0]);
        set_list_of_messeges(newList);
        sendDataToParent(contact, messege[0], contact.id);
    };

    const addAudio = (audioSrc) => {
        var audSource = audioSrc;
        let messege = [
            {
                sender: "me",
                type: "audio",
                date: "05/04/2022",
                time: "12:54",
                context: audSource,
                lastContextTime: "1 min ago",
            },
        ];
        var newList = [];
        newList = list_of_messeges.concat(messege);
        set_list_of_messeges(newList);
        sendDataToParent(contact, messege[0], contact.id);
    };

    return (
        <div class="container py-5">
            <div className="card" id="chat2">
                <div class="row d-flex justify-content-center">
                    <div class="card-header d-flex justify-content-between align-items-center p-3">
                        <h5 class="mb-0">{contact.name}</h5>
                    </div>
                    <div
                        class="card-body"
                        style={{ position: "relative", height: "400px" }}
                    >
                        <div calssName="chatBox" id="box">
                            {chatList}
                        </div>
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
                                        data-bs-target="#exampleModal3"
                                        onClick={() => {
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
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <Recording
                                                    sendDataBack={addAudio}
                                                />
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
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <AddImage
                                                    sendDataBack={addImageVideo}
                                                    contact={contact}
                                                />
                                                {/*  <AddVidPic param="pic" selected={selectedImage} type=""/> almost working
                                                    its a display of the selected video or picture */}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="modal fade"
                                        id="exampleModal3"
                                        tabIndex="-1"
                                        role="dialog"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <AddVideo
                                                    sendDataBack={addImageVideo}
                                                    contact={contact}
                                                />

                                                {/* <AddVidPic param={modeVidPic} selected={selectedImage} type={videoType}/>   almost working
                                                    its a display of the selected video or picture */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div class="flex-grow-0 py-3 px-4 border-top">
                        <div class="input-group">
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
                                class="form-control"
                                type="text"
                                placeholder="Write a new message"
                                id="text"
                                value={input}
                                onInput={(e) => setInput(e.target.value)}
                            ></input>
                            <button
                                class="btn btn-primary"
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
                                    if (input !== "") {
                                        newList =
                                            list_of_messeges.concat(messege);
                                        set_list_of_messeges(newList);
                                        const textBox =
                                            document.getElementById("text");
                                        setInput("");
                                        sendDataToParent(
                                            contact,
                                            messege[0],
                                            contact.id
                                        );
                                    }
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatHistory;
