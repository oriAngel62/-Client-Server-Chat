import ChatHistory from "../chatHistory/ChatHistory";
import "./ContactItem.css";
import React, { useEffect, useState } from "react";

function ContactItem({ contactItem, sendDataToParent, token }) {
    // const numImg = Math.floor(Math.random() * (8 - 1 + 1) + 1).toString();
    // const srcImg1 =
    //     "https://www.bootdey.com/img/Content/avatar/avatar" + numImg + ".png";
    async function getMessages(id)
    {
        var fullURL = 'https://localhost:7285/api/contacts/' + id + '/messages/' ;
        const res = await fetch(fullURL, {
            method: "GET",
            "Authorization": "Bearer " +token 
        });
        const data = await res.json();
        if( data )
        return(data);
        else
        return null;
    }

    async function getMessage(id,mesgId)
    {
        var fullURL = 'https://localhost:7285/api/contacts/' + id + '/messages/' + mesgId ;
        const res = await fetch(fullURL, {
            method: "GET",
            "Authorization": "Bearer " +token 
        });
        const data = await res.json();
        if( data )
        return(data);
        else
        return null;
    }
    
    var list_of_messeges; 
    var lastMessage;
    
    useEffect(() => {
        async function read() {
        list_of_messeges = getMessages(contactItem.id);
        lastMessage = getMessage(contactItem.id,list_of_messeges.length)
        }
        read();
    }, []);

    const srcImg =
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp";
    return (
        <div className="contact">
            <div className="list-group">
                <button
                    href="#"
                    className="list-group-item list-group-item-action "
                    id="list-tab"
                    role="tablist"
                    aria-current="true"
                    // onClick={() => <ChatHistory />}
                    // data-toggle="collapse"
                    // data-target="#learnMore"
                    // onClick={showChatHistory(contactItem)}


                    /*
                    type:
                    text -0
                    video -1
                    image -2
                    audio -3
                    */

                    onClick={() => {
                        sendDataToParent(contactItem);
                    }}
                >
                    <div className="d-flex w-100 justify-content-between">
                        {contactItem.src === null ? (
                            <img src={null} width="80pxd"></img>
                        ) :  (
                            <img src={contactItem.src} width="80pxd"></img>
                        )}
                        { contactItem.name === null ? (
                        <h4 className="mb-1"></h4>
                        ) : (
                            <h4 className="mb-1">{contactItem.name}</h4>
                        )}
                        <br></br>
                        {lastMessage.created === null ? (
                            <small></small>
                        ) :  (
                            <small>{lastMessage.created}</small>
                        )}
                    </div>
                    {/* {lastMessage.type === 0 ? (                to bring back for next ass */}
                    {lastMessage.context === null ? (
                            <p className="mb-1"></p>
                        ) :  (
                            <p className="mb-1">{lastMessage.context}</p>
                        )}
                    {/* ) : lastMessage.type === 2 ? (
                        <p className="mb-1">image</p>
                    ) : lastMessage.type === 1 ? (
                        <p className="mb-1">video</p>
                    ) : lastMessage.type === 3 ? (
                        <p className="mb-1">audio</p>
                    ) : (
                        <p className="mb-1"></p>
                    )} */}
                </button>
            </div>
        </div>
    );
}

export default ContactItem;
