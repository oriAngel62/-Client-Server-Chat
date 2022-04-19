import "./App.css";
import ContactItem from "./contactItem/ContactItem";
import React, { useState } from "react";
import { render } from "react-dom";
import Popup from "./contactItem/Popup";
import ChatHistory from "./chatHistory/ChatHistory";

function App() {
    var listMessages = [
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
    var listMessages2 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "fd df",
            lastContextTime: "10 min ago",
        },
    ];
    var contactList = [
        {
            id: 1,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            name: "tome",
            listMessages: listMessages,
        },
        {
            id: 2,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
            name: "David",
            listMessages: listMessages2,
        },
    ];
    const [list, setList] = useState(contactList);
    const [chatHistory, setChatHistory] = useState("");
    const [lastMessage, setLastMessage] = useState("");
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

    const callbackChatHistory = (contactItem, meesage, id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i].listMessages.push(meesage);
                // setLastMessage(meesage);
                setChatHistory(contactItem);
                // setList(list);
                console.log(list);
            }
        }
    };

    var contactMap = list.map((contact, key) => {
        return (
            <ContactItem
                contactItem={contact}
                sendDataToParent={callbackContactItem}
            />
        );
    });

    function handleAdd(name) {
        const newList = list.concat({
            id: list.length + 1,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
            name: name,
            listMessages: [{}],
        });
        setList(newList);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <Popup sendDataToParent={callbackPopUp} />
                    <div className="scroll">{contactMap}</div>
                </div>
                <div className="col-9">
                    {chatHistory != "" ? (
                        <ChatHistory
                            contact={chatHistory}
                            sendDataToParent={callbackChatHistory}
                        />
                    ) : (
                        <p className="mb-1">Choose Contact to talk with</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
