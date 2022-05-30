import ChatHistory from "../chatHistory/ChatHistory";
import "./ContactItem.css";
import React, { useEffect, useState } from "react";

function ContactItem(props) {
    var lastMessage = {
        id: 1,
        type: 0,
        content: "hi",
        created: new Date()
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"),
        sent: true,
    };
    // const numImg = Math.floor(Math.random() * (8 - 1 + 1) + 1).toString();
    // const srcImg1 =
    //     "https://www.bootdey.com/img/Content/avatar/avatar" + numImg + ".png";
    async function getMessages(id) {
        var fullURL = "http://localhost:5285/api/contacts/" + id + "/messages/";
        const res = await fetch(fullURL, {
            method: "GET",
            headers: { Authorization: "Bearer " + props.token },
        });
        const data = await res.json();
        if (data) return data;
        else return null;
    }

    var list_of_messeges;

    useEffect(() => {
        async function read() {
            console.log(props.contactItem);
            console.log(props.contactItem);
            console.log("contact name is: " + props.contactItem.contactName);
            list_of_messeges = getMessages(props.contactItem.contactName);

            var fullURL =
                "http://localhost:5285/api/contacts/" +
                props.contactItem.contactName +
                "/messages/";
            const res = await fetch(fullURL, {
                method: "GET",
                headers: { Authorization: "Bearer " + props.token },
            });
            const data = await res.json();
            if (data && data.length > 0) lastMessage = data[data.length - 1];
            console.log(lastMessage);

            lastMessage.created = new Date(Date.parse(lastMessage.created))
                .toLocaleTimeString()
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
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
                    onClick={() => {
                        props.sendDataToParent(props.contactItem);
                    }}
                >
                    <div className="d-flex w-100 justify-content-between">
                        {props.contactItem.src === null ? (
                            <img
                                src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                                width="80pxd"
                            ></img>
                        ) : (
                            <img
                                src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                                width="80pxd"
                            ></img>
                        )}
                        <b>{props.contactItem.nickName}</b>
                        <br></br>
                        <span className="hour">
                            {lastMessage.created === null ? (
                                <small></small>
                            ) : (
                                <small>{lastMessage.created}</small>
                            )}
                        </span>
                    </div>
                    {/* {lastMessage.type === 0 ? (                to bring back for next ass */}
                    {lastMessage.content === null ? (
                        <p className="mb-1"></p>
                    ) : (
                        <p className="mb-1">{lastMessage.content}</p>
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
