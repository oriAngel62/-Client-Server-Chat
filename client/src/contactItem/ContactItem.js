import ChatHistory from "../chatHistory/ChatHistory";
import "./ContactItem.css";
import React, { useState } from "react";

function ContactItem({ contactItem, sendDataToParent }) {
    // const numImg = Math.floor(Math.random() * (8 - 1 + 1) + 1).toString();
    // const srcImg1 =
    //     "https://www.bootdey.com/img/Content/avatar/avatar" + numImg + ".png";
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

                    onClick={() => {
                        sendDataToParent(contactItem);
                    }}
                >
                    <div className="d-flex w-100 justify-content-between">
                        <img src={contactItem.src} width="80pxd"></img>
                        <h4 className="mb-1">{contactItem.name}</h4>
                        <br></br>
                        <small>
                            {
                                contactItem.listMessages[
                                    contactItem.listMessages.length - 1
                                ].lastContextTime
                            }
                        </small>
                    </div>
                    {contactItem.listMessages[
                        contactItem.listMessages.length - 1
                    ].type == "text" ? (
                        <p className="mb-1">
                            {
                                contactItem.listMessages[
                                    contactItem.listMessages.length - 1
                                ].context
                            }
                        </p>
                    ) : (
                        <p className="mb-1">Media</p>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ContactItem;
