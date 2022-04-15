import ChatHistory from "../chatHistory/ChatHistory";
import "./ContactItem.css";
import React, { useState } from "react";

function ContactItem({ contactItem }) {
    const [ChatHistory, setChatHistory] = useState(false);

    // const [count, setCount] = useState(0);
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });
    // console.log(
    //     contactItem.listMessages[contactItem.listMessages.length - 1].time
    // );
    // <ChatHistory contactList={contactItem}
    // function handleClick(contactItem) {
    //     return (
    //         <div className="game">
    //             <p>dlaskdklasjdk</p>
    //         </div>
    //     );

    //     // return <ChatHistory contactList={contactItem} />;
    // }

    function showText() {
        console.log(
            contactItem.listMessages[contactItem.listMessages.length - 1]
                .type == "text"
        );
        if (
            contactItem.listMessages[contactItem.listMessages.length - 1]
                .type == "text"
        )
            return (
                <p className="mb-1">
                    contactItem.listMessages[ contactItem.listMessages.length -
                    1 ].context
                </p>
            );
    }
    function handleClick(contactItem) {
        return <p>dasd</p>;
    }

    const numImg = Math.floor(Math.random() * (8 - 1 + 1) + 1).toString();
    const srcImg =
        "https://www.bootdey.com/img/Content/avatar/avatar" + numImg + ".png";
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

                    onClick={() => setChatHistory(true)}
                >
                    <div className="d-flex w-100 justify-content-between">
                        <img src={srcImg} width="80pxd"></img>
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
