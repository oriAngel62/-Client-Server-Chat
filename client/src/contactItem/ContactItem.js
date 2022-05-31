import ChatHistory from "../chatHistory/ChatHistory";
import "./ContactItem.css";
import React, { useEffect, useState } from "react";

function ContactItem(props) {
    const [lastMessage, setLastMessage] = useState("");

    //GET API function
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
            if (data && data.length > 0) {
                setLastMessage(data[data.length - 1]);
            }
            // console.log(lastMessage);

            // lastMessage.created = new Date(Date.parse(lastMessage.created))
            //     .toLocaleTimeString()
            //     .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        }
        read();
    }, [props.lMessage]);

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
                        {props.contactItem.src ? (
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
                            {lastMessage.created ? (
                                <small>{lastMessage.created}</small>
                            ) : (
                                <small></small>
                            )}
                        </span>
                    </div>
                    {/* {lastMessage.type === 0 ? (                to bring back for next ass */}
                    {lastMessage.content ? (
                        <p className="mb-1">{lastMessage.content}</p>
                    ) : (
                        <p className="mb-1"></p>
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
