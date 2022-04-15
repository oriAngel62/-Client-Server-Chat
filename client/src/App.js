import "./App.css";
import ContactItem from "./contactItem/ContactItem";
import React, { useState } from "react";
import { render } from "react-dom";
import Popup from "./contactItem/Popup";
import ChatHistory from "./chatHistory/ChatHistory";

function App() {
    const listMessages = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "somthing intrseting",
            lastContextTime: "10 min ago",
        },
        {
            sender: "tome",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "somthing intrseting",
            lastContextTime: "11 min ago",
        },
        {
            sender: "tome",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context:
                "dasdasdad  fdsfsf dsf sf dsf sdf sf sf sfsdfsd s f sdfsf sf df sdf ",

            lastContextTime: "11 min ago",
        },
    ];
    const contactList = [
        {
            id: 1,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            name: "tome",
            listMessages,
        },
        {
            id: 2,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
            name: "David",
            listMessages,
        },
    ];
    const [list, setList] = useState(contactList);
    const [chatHistory, setChatHistory] = useState("");
    const callbackContactItem = (childData) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == childData.id) setChatHistory(childData);
        }
    };
    const callbackPopUp = (childData) => {
        if (childData.name !== "") {
            handleAdd(childData.name);
        }
    };

    const contactMap = list.map((contact, key) => {
        return (
            <ContactItem
                contactItem={contact}
                sendDataToParent={callbackContactItem}
            />
        );
    });

    function handleAdd(name) {
        const newList = list.concat({
            name: name,
            listMessages,
        });
        setList(newList);
        // console.log(contactList);
    }

    function showChatHistory() {
        return <ChatHistory contact={chatHistory} />;
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <Popup sendDataToParent={callbackPopUp} />
                    <div className="scroll">{contactMap}</div>
                </div>
                <div className="col-9 vh-100">
                    {chatHistory != "" ? (
                        <ChatHistory contact={chatHistory} />
                    ) : (
                        <p className="mb-1">Choose Contact to talk with</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
