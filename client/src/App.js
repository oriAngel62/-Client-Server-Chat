import "./App.css";
import audio from './record1.txt';
import image1 from './img1.jpg'
import video1 from './vid1.mp4'
import ContactItem from "./contactItem/ContactItem";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Popup from "./contactItem/Popup";
import ChatHistory from "./chatHistory/ChatHistory";

function App() {
    var videoSource =
    [
        video1,
        'video/mp4',
    ];
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
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context: audio,
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
        {
            sender: "me",
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context: audio,
            lastContextTime: "10 min ago",
        },
        {
            sender: "noa",
            type: "image",
            date: "05/04/2022",
            time: "12:54",
            context: image1,
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "video",
            date: "05/04/2022",
            time: "12:54",
            context: videoSource,
            lastContextTime: "10 min ago",
        }

    ];
    var listMessages3 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "fd df",
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context: audio,
            lastContextTime: "10 min ago",
        },
        {
            sender: "noa",
            type: "image",
            date: "05/04/2022",
            time: "12:54",
            context: image1,
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "video",
            date: "05/04/2022",
            time: "12:54",
            context: videoSource,
            lastContextTime: "10 min ago",
        }

    ];
    var listMessages4 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "fd df",
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context: audio,
            lastContextTime: "10 min ago",
        },
        {
            sender: "noa",
            type: "image",
            date: "05/04/2022",
            time: "12:54",
            context: image1,
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "video",
            date: "05/04/2022",
            time: "12:54",
            context: videoSource,
            lastContextTime: "10 min ago",
        }

    ];
    var listMessages5 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "fd df",
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context: audio,
            lastContextTime: "10 min ago",
        },
        {
            sender: "noa",
            type: "image",
            date: "05/04/2022",
            time: "12:54",
            context: image1,
            lastContextTime: "10 min ago",
        },
        {
            sender: "me",
            type: "video",
            date: "05/04/2022",
            time: "12:54",
            context: videoSource,
            lastContextTime: "10 min ago",
        }

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
        {
            id: 2,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
            name: "Avia",
            listMessages: listMessages3,
        },
        {
            id: 3,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp",
            name: "David",
            listMessages: listMessages4,
        },
        {
            id: 4,
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp",
            name: "Ori",
            listMessages: listMessages5,
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
        var index = (list.length + 1) % 7;
        if (index == 0) index++;
        var src =
            "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava" +
            index +
            "-bg.webp";
        const newList = list.concat({
            id: list.length,
            src: src,
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
                setCurrentId("");
                setCurrentId(contactItem.id);
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
