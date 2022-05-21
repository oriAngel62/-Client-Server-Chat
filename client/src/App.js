import "./App.css";
import audio from "./record1.txt";
import image1 from "./img1.jpg";
import video1 from "./vid1.mp4";
import ContactItem from "./contactItem/ContactItem";
import React, { useEffect, useState } from "react";
import Popup from "./contactItem/Popup";
import ChatHistory from "./chatHistory/ChatHistory";

function App() {
    var videoSource = [video1, "video/mp4"];
    var listMessages = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Hi Yoni! How are you?",
            lastContextTime: "12 min ago",
        },
        {
            sender: "Yoni",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Great! I want to send you audio",
            lastContextTime: "11 min ago",
        },
        {
            sender: "Yoni",
            type: "audio",
            date: "05/04/2022",
            time: "12:54",
            context: audio,
            lastContextTime: "3 min ago",
        },
    ];
    var listMessages2 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Hi Noa, I have cool audio for you!",
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
            sender: "Noa",
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
            lastContextTime: "4 min ago",
        },
    ];
    var listMessages3 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Hi Avia, look at this audio it's so cool!",
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
            sender: "Avia",
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
            lastContextTime: "7 min ago",
        },
    ];
    var listMessages4 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Hi David! Nice to meet you",
            lastContextTime: "10 min ago",
        },
        {
            sender: "David",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Nice to meet you too!",
            lastContextTime: "9 min ago",
        },
    ];
    var listMessages5 = [
        {
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Hi Shaked! Nice to meet you",
            lastContextTime: "10 min ago",
        },
        {
            sender: "Shaked",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "Nice to meet you too!",
            lastContextTime: "9 min ago",
        },
    ];
    var contactList = [
        {
            id: "ori",
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            name: "ori12",
            listMessages: listMessages,
        },
        {
            id: "david",
            src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
            name: "david12",
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
            name: "Shaked",
            listMessages: listMessages5,
        },
    ];

    const usersList = [
        { username: "Ori" },
        { username: "David" },
        { username: "Avia" },
        { username: "Yoni" },
        { username: "Noa" },
        { username: "Shaked" },
        { username: "Aviv" },
    ];

    const [backendContact, backendContactSetList] = useState([
        {
            id: "Ori",
            nickName: "o1",
            server: "abc",
            last: "abc",
            lastDate: "2022-05-20T15:37:52.8042078+03:00",
            messageList: [
                {
                    id: 1,
                    type: 0,
                    content: "hi",
                    created: "2022-05-20T15:37:52.8042123+03:00",
                    sent: true,
                },
                {
                    id: 2,
                    type: 0,
                    content: "hi 2 u 2",
                    created: "2022-05-20T15:37:52.8042127+03:00",
                    sent: false,
                },
            ],
        },
        {
            id: "David",
            nickName: "d12",
            server: "abc",
            last: "abcd",
            lastDate: "2022-05-20T15:37:52.8042155+03:00",
            messageList: [
                {
                    id: 1,
                    type: 0,
                    content: "hi",
                    created: "2022-05-20T15:37:52.8042158+03:00",
                    sent: true,
                },
                {
                    id: 2,
                    type: 0,
                    content: "hi 2 u 2",
                    created: "2022-05-20T15:37:52.8042159+03:00",
                    sent: false,
                },
            ],
        },
    ]);
    var cList = [];
    jsonToObject(backendContact);
    function jsonToObject(backendContact) {
        var index = (backendContact.length + 1) % 7;
        for (let i = 0; i < backendContact.length; i++) {
            var cItem = [];
            cItem.id = backendContact[i].id;
            if (index == 0) index++;
            cItem.src =
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava" +
                index +
                "-bg.webp";
            cItem.name = backendContact[i].nickName;
            cItem.listMessages = backendContact[i].messageList;
            cList.push(cItem);
        }
    }
    console.log(backendContact);

    console.log(cList);
    const [list, setList] = useState(cList);
    const [currentId, setCurrentId] = useState("ori");
    const [currentIdNum, setCurrentIdNum] = useState(0);
    const [lastMessage, setLastMessage] = useState("");
    const [users, setusers] = useState(usersList);

    // useEffect(() => {}, [chatHistory]);

    const callbackContactItem = (childData) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == childData.id) {
                setCurrentId(childData.id);
                setCurrentIdNum(i);
                setList(list);
            }
        }
    };

    const callbackPopUp = (childData) => {
        if (childData.name !== "") {
            //post fuction add contact asp.net

            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: childData.id,
                    nickName: childData.nickName,
                    server: childData.server,
                }),
            };
            fetch("https://localhost:7285/api/contacts", requestOptions).then(
                (response) => response.json()
            );
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
            //add in react
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
                setCurrentIdNum(i);
            }
        }
    };
    var i = 1;
    var contactMap = list.map((contact, key) => {
        return (
            <ContactItem
                contactItem={contact}
                sendDataToParent={callbackContactItem}
                key={key}
            />
        );
    });

    useEffect(async () => {
        const res = await fetch("https://localhost:7285/api/contacts");
        const data = await res.json();
        backendContactSetList(data);
        console.log(data.id);
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <Popup
                        sendDataToParent={callbackPopUp}
                        users={users}
                        contactList={contactList}
                    />
                    <div className="scroll">{contactMap}</div>
                </div>
                <div className="col-9">
                    <ChatHistory
                        contact={list[currentIdNum]}
                        sendDataToParent={callbackChatHistory}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
