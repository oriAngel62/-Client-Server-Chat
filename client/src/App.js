import "./App.css";
import ContactItem from "./contactItem/ContactItem";
import React, { useState, useEffect } from "react";
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
            id: 0,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            name: "Yoni",
            listMessages: listMessages,
        },
        {
            id: 1,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
            name: "Noa",
            listMessages: listMessages2,
        },
    ];

    const usersList = [
        { username: "Ori" },
        { username: "David" },
        { username: "Avia" },
        { username: "Yoni" },
        { username: "Noa" },
    ];

    const [list, setList] = useState(contactList);
    const [currentId, setCurrentId] = useState(0);
    const [lastMessage, setLastMessage] = useState("");
    const [users, setusers] = useState(usersList);

    // useEffect(() => {}, [chatHistory]);

    const callbackContactItem = (childData) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == childData.id) {
                setCurrentId(childData.id);
                setList(list);
            }
        }
    };
    const callbackPopUp = (childData) => {
        if (childData.name !== "") {
            handleAdd(childData.name);
        }
    };

    function handleAdd(name) {
        const newList = list.concat({
            id: list.length,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
            name: name,
            listMessages: [{}],
        });
        setList(newList);

        const newUser = users.concat({ username: name });
        setList(newList);
        setusers(newUser);
    }

    const callbackChatHistory = (contactItem, meesage, id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i].listMessages.push(meesage);
                const newList = list.concat({
                    id: list[i].id,
                    src: list[i].src,
                    name: list[i].name,
                    listMessages: list[i].listMessages,
                });
            }
        }
    };

    var contactMap = list.map((contact, key) => {
        return (
            <ContactItem
                contactItem={contact}
                sendDataToParent={callbackContactItem}
                key={key}
            />
        );
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <Popup sendDataToParent={callbackPopUp} users={users} />
                    <div className="scroll">{contactMap}</div>
                </div>
                <div className="col-9">
                    <ChatHistory
                        contact={list[currentId]}
                        sendDataToParent={callbackChatHistory}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
