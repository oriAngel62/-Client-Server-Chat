import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, { useState, useEffect, useRef } from "react";
import Recording from "./Recording";
import "./paperclip.png";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";

function ChatHistory({ contact, sendDataToParent }) {



    async function getTime(){
        const time = await fetch("https://localhost:7285/api/contacts/GetTime/time");
        return(time);
    }


    async function getMessages(id)
    {
        var fullURL = 'https://localhost:7285/api/contacts/' + id + '/messages/' ;
        const res = await fetch(fullURL);
        const data = await res.json();
        return(data);
    }
    //to change according to api
    let anyMesseges = true;
    var [list_of_messeges, set_list_of_messeges] = useState([]);
    if(contact !== null)
    {
        if(contact.id !== null){
        set_list_of_messeges(getMessages(contact.id));
        anyMesseges = true;
        }
        else
        anyMesseges = false;
    }
    else{
    anyMesseges = false;}
    let typeText = 0;
    //this too
    var mess = getMessages(contact.id);
    useEffect(() => {
        set_list_of_messeges(mess);
    }, [getMessages(mess)]);
    const [modeVidPic, setModeVidPic] = useState("pic"); 
    var chatList = list_of_messeges.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;    
    });
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
    });
    const addImageVideo = (messege, contact) => {
        var newList = [];
        newList = list_of_messeges.concat(messege[0]);
        set_list_of_messeges(newList);
        sendDataToParent(contact, messege[0], contact.id);
    };

    
    
    
    /*
    type:
    text -0
    video -1
    image -2
    audio -3
    */
    async function postMessage(message){
        if(message[0].Type === "text")
        {
            const status = await fetch("https://localhost:7285/api/contacts",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Type: "text",                       // to change next ass
                    Content: message[0].content,
                    Sent: true,
                    Created: getTime(),
                }),
            });
        }
    }

    

    async function syncMessegesAfterPost(id){
        set_list_of_messeges(getMessages(id));
    }

    const addAudio = (audioSrc) => {
        var audSource = audioSrc;
        let messege = [
            {
                Type: "audio",                       // to change next ass
                Content: audSource,
                Sent: true,
                Created: getTime(),
            },
        ];
        var newList = [];
        newList = list_of_messeges.concat(messege);
        set_list_of_messeges(newList);
        sendDataToParent(contact, messege[0], contact.id);
    };

    return (
        <div className="container py-5">
            <div className="card" id="chat2">
                <div className="row d-flex justify-content-center">
                    <div className="card-header d-flex justify-content-between align-items-center p-3">
                        {contact.name ? (
                        <h5 className="mb-0">{contact.name}</h5>)   
                        // trying here
                        : null}
                    </div>
                    <div
                        className="card-body"
                        style={{ position: "relative", height: "400px" }}
                    >
                        <div calssname="chatBox" id="box">
                            {chatList}
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
                                type = "text"
                                placeholder="Write a new message"
                                id="text"
                                value={input}
                                onInput={(e) => setInput(e.target.value)}
                            ></input>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    const messege = [
                                        {
                                            content: input,
                                            sent: true,
                                            type: "text",
                                            created: getTime(),
                                        },
                                    ];
                                    if (input !== "") {
                                        postMessage(messege);
                                        syncMessegesAfterPost(contact.id);
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
