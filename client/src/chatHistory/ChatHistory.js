import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, { useState, useEffect, useRef } from "react";
import Recording from "./Recording";
import "./paperclip.png";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import { HubConnectionBuilder } from "@microsoft/signalr";

function ChatHistory({
    selectedContact,
    token,
    userId,
    setLMessage,
    lMessage,
}) {
    var chatList = [];
    const [messages, setMessages] = useState([]);
    const [sendNewMes, setSendNewMes] = useState(true);

    const lastMsgs = useRef(null);
    lastMsgs.current = messages;
    const [conn, setConn] = useState(null);
    const [timeMsg, setTimeMsg] = useState(new Date());
    var didGotMessages = false;
    const [counter, setCounter] = useState(0);

    //GET API function for the server's time so it would be consistant
    async function getTime() {
        const time = await fetch(
            "http://localhost:5285/api/contacts/GetTime/time",
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );
        return time;
    }

     //GET API function 
    async function getMessages(id) {
        var fullURL = "http://localhost:5285/api/contacts/" + id + "/messages/";
        const res = await fetch(fullURL, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        lastMsgs.current = data;
        return data;
    }
    useEffect(() => {
        getMessages(selectedContact.contactName).then((data) => {
            lastMsgs.current = data;
            console.log(lastMsgs.current);
            setMessages(lastMsgs.current);
        });
    }, [selectedContact.contactName, sendNewMes, counter]);

    didGotMessages = true;
    let anymessages = true;
    const [count, setCount] = useState(0);
    useEffect(() => {
        const newConn = new HubConnectionBuilder()
            .withUrl("http://localhost:5285/hubs/chat")
            .withAutomaticReconnect()
            .build();

        setConn(newConn);
    }, []);

    useEffect(() => {
        if (conn) {
            conn.start().then((started) => {
                conn.on("Receive", (signalMessage) => {
                    console.log("Receive message");
                    console.log(signalMessage);
                    var msg = {
                        id: 200,
                        content: signalMessage.content,
                        sent: false,
                        created: "2022-04-24T19:46:09.7077994",
                    };
                    lastMsgs.current.push(msg);
                    setMessages(lastMsgs.current);
                    setCounter(Math.random());

                    var box = document.getElementById("box");
                });
            });
        }
    }, [conn]);

    useEffect(() => {
        async function read() {
            if (selectedContact.contactName) {
                var msgs = await getMessages(selectedContact.contactName);
                setMessages(msgs);
                lastMsgs.current = msgs;
                anymessages = true;
            } else anymessages = false;
        }
        read();
    }, []);

    useEffect(() => {
        async function read() {
            var mess = await getMessages(selectedContact.contactName);
            setMessages(mess);
            lastMsgs.current = mess;
        }
        read();
    }, []);
    const [modeVidPic, setModeVidPic] = useState("pic");

    const [input, setInput] = useState("");
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
    }, []);
    const addImageVideo = (messege) => {
        var newList = [];
        newList = messages.concat(messege);
        setMessages(newList);
        lastMsgs.current = newList;
    };

    async function postMessage(message) {
        const status = await fetch(
            "http://localhost:5285/api/contacts/" +
                selectedContact.contactName +
                "/messages",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(message),
            }
        );
    }

    async function syncmessagesAfterPost(id, message) {
        var newList = [];
        newList = messages.concat(message);
        if (sendNewMes == true) {
            setSendNewMes(false);
        } else {
            setSendNewMes(true);
        }

        if (lMessage == true) {
            setLMessage(false);
        } else {
            setLMessage(true);
        }
    }

    const addAudio = (audioSrc) => {
        var audSource = audioSrc;
        let messege = [
            {
                Type: "audio", // to change next ass
                Content: audSource,
                Sent: true,
                Created: getTime(),
            },
        ];
        var newList = [];
        newList = messages.concat(messege);
        setMessages(newList);
        lastMsgs.current = newList;
    };

    return (
        <div className="container py-5">
            <div className="card" id="chat2">
                <div className="row d-flex justify-content-center">
                    <div className="card-header d-flex justify-content-between align-items-center p-3">
                        {selectedContact.nickName ? (
                            <h5 className="mb-0">{selectedContact.nickName}</h5>
                        ) : null}
                    </div>
                    <div
                        className="card-body"
                        style={{ position: "relative", height: "400px" }}
                    >
                        <div className="chatBox" id="box">
                            {messages.map((messege, key) => {
                                return (
                                    <MessegeBox
                                        messege={messege}
                                        key={key}
                                        counter={counter}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="bottomPart">
                        <div ref={menuRef}>
                            {showMenu ? (
                                <div
                                    className="btn-group"
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
                                            <i className="bi bi-file-image"></i>
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
                                            <i className="bi bi-camera-video"></i>
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal2"
                                    >
                                        <span>
                                            <i className="bi bi-voicemail"></i>
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
                                                    token={token}
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
                                                    token={token}
                                                    sendDataBack={addImageVideo}
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
                    <div className="flex-grow-0 py-3 px-4 border-top">
                        <div className="input-group">
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
                                className="form-control"
                                type="text"
                                placeholder="Write a new message"
                                id="text"
                                value={input}
                                onInput={(e) => setInput(e.target.value)}
                            ></input>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    const message = {
                                        from: userId,
                                        to: selectedContact.contactName,
                                        type: "text",
                                        created: new Date(),
                                        content: input,
                                        sent: true,
                                    };
                                    conn.invoke(
                                        "Send",
                                        userId,
                                        selectedContact.contactName,
                                        input
                                    );
                                    if (input !== "") {
                                        postMessage(message);
                                        syncmessagesAfterPost(
                                            selectedContact.contactName,
                                            message
                                        );
                                        const textBox =
                                            document.getElementById("text");
                                        setInput("");
                                    }
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="renderAgain">{counter}</div>
        </div>
    );
}

export default ChatHistory;
