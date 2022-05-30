import "./App.css";
import audio from "./record1.txt";
import image1 from "./img1.jpg";
import video1 from "./vid1.mp4";
import ContactItem from "./contactItem/ContactItem";
import React, { useEffect, useState, useRef } from "react";
import Popup from "./contactItem/Popup";
import ChatHistory from "./chatHistory/ChatHistory";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useLocation } from "react-router-dom";

function App(props) {
    var [contactMap, setContactMap] = useState([]);
    const location = useLocation();
    var token = location.state.token;
    var userId = location.state.userId;
    var videoSource = [video1, "video/mp4"];
    const [conn, setConn] = useState(null);
    const [show, setShow] = useState(false);
    const contacts = useRef(null);
    const [count, setCounter] = useState(0);
    //backendContact.current = backendContact;
    var usersList = [];

    useEffect(() => {
        async function read() {
            const newConn = new HubConnectionBuilder()
                .withUrl("http://localhost:5285/hubs/chat")
                .withAutomaticReconnect()
                .build();

            setConn(newConn);
        }
        read();
    }, []);

    useEffect(() => {
        async function read() {
            if (conn) {
                conn.start().then((started) => {
                    conn.on("NewContact", (contact) => {
                        var newContact = {
                            contactName: contact.from,
                            userName: contact.from,
                            nickName: contact.from,
                            server: contact.server,
                            last: null,
                            lastDate: null,
                        };
                        contacts.current.push(contact);
                        setContactMap(contacts);
                    });
                });
            }
        }
        read();
    }, [conn]);

    //localhost7285 - not final
    useEffect(() => {
        async function read() {
            const result = await fetch("http://localhost:5285/api/contacts/", {
                headers: {
                    method: "GET",
                    Authorization: "Bearer " + token,
                },
            });
            const data = await result.json();
            if (data) {
                console.log(data);
                setContactMap(data);
                contacts.current = data;
            } else {
                //setContactMap([]);
                //contacts.current = data;
                usersList = getUsers();
            }
        }
        read();
    }, []);

    async function getUsers() {
        var fullURL = "http://localhost:5285/api/users";
        const res = await fetch(fullURL, {
            headers: {
                method: "GET",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        if (data) return data;
        else return null;
    }
    //     {
    //         id: "Ori",
    //         nickName: "o1",
    //         server: "abc",
    //         last: "abc",
    //         lastDate: "2022-05-20T15:37:52.8042078+03:00",
    //         messageList: [
    //             {
    //                 id: 1,
    //                 type: 0,
    //                 content: "hi",
    //                 created: "2022-05-20T15:37:52.8042123+03:00",
    //                 sent: true,
    //             },
    //             {
    //                 id: 2,
    //                 type: 0,
    //                 content: "hi 2 u 2",
    //                 created: "2022-05-20T15:37:52.8042127+03:00",
    //                 sent: false,
    //             },
    //         ],
    //     },
    //     {
    //         id: "David",
    //         nickName: "d12",
    //         server: "abc",
    //         last: "abcd",
    //         lastDate: "2022-05-20T15:37:52.8042155+03:00",
    //         messageList: [
    //             {
    //                 id: 1,
    //                 type: 0,
    //                 content: "hi",
    //                 created: "2022-05-20T15:37:52.8042158+03:00",
    //                 sent: true,
    //             },
    //             {
    //                 id: 2,
    //                 type: 0,
    //                 content: "hi 2 u 2",
    //                 created: "2022-05-20T15:37:52.8042159+03:00",
    //                 sent: false,
    //             },
    //         ],
    //     },
    // ]);
    var cList = [];

    const [list, setList] = useState(cList);
    const [currentContactName, setCurrentContactName] = useState(0);

    const [lastMessage, setLastMessage] = useState("");
    const [users, setusers] = useState(usersList);

    // useEffect(() => {}, [chatHistory]);

    async function getMessages(id) {
        var fullURL = "http://localhost:5285/api/contacts/" + id + "/messages/";
        const res = await fetch(fullURL, {
            headers: {
                method: "GET",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        if (data) return data;
        else return null;
    }

    const callbackContactItem = (childData) => {
        setCurrentContactName(childData.contactName);
    };

    async function callbackPopUp() {
        //post fuction add contact asp.net
        var childData = JSON.parse(localStorage.getItem("newContact"));
        const status = await fetch("http://localhost:5285/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(childData),
        });

        const result = await fetch("http://localhost:5285/api/contacts/", {
            headers: {
                method: "GET",
                Authorization: "Bearer " + token,
            },
        });
        const data = await result.json();
        console.log(data);
        if (data) {
            console.log(data);
            setContactMap(data);
            contacts.current = data;
        } else {
            //backendContactSetList([]);
            //contacts.current = data;
            usersList = getUsers();
        }
        // POST request using fetch inside useEffect React hook

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        //add in react

        //handleAdd(childData.name); -> should be done by useEffect - need to check! if doesnt work need to
        // implement get function to all contacts and set the list
    }

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

    // const callbackChatHistory = (meesage, id) => {
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i].id === id) {
    //             list[i].listMessages.push(meesage);
    //             setCurrentIdNum(i);
    //         }
    //     }
    // };
    var i = 1;

    useEffect(() => {
        async function read() {
            const res = await fetch("http://localhost:5285/api/contacts", {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            });
            const data = await res.json();
            if (data) {
                contacts.current = data;
                setContactMap(data);
                console.log(data);
            } else {
                //setContactMap([]);
                contacts.current = data;
            }
        }
        read();
        jsonToObject(contactMap);
    }, []);
    function jsonToObject(contactMap) {
        var index = (contactMap.length + 1) % 7;
        for (let i = 0; i < contactMap.length; i++) {
            var cItem = [];
            cItem.id = contactMap[i].id;
            if (index == 0) index++;
            cItem.src =
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava" +
                index +
                "-bg.webp";
            cItem.name = contactMap[i].nickName;
            cItem.listMessages = null;

            cList.push(cItem);
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <button
                        type="button"
                        onClick={() => {
                            setShow(true);
                        }}
                        className="btn btn-primary"
                        //add -bs
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Add new contact
                    </button>
                    <Popup
                        userId={userId}
                        sendDataToParent={callbackPopUp}
                        users={users}
                        show={show}
                        setShow={setShow}
                        contactList={contactMap}
                    />
                    <div className="scroll">
                        {contactMap.map((contact, key) => {
                            return (
                                <ContactItem
                                    contactItem={contact}
                                    sendDataToParent={callbackContactItem}
                                    token={token}
                                    key={key}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="col-9">
                    {currentContactName ? (
                        <ChatHistory
                            token={token}
                            userId={userId}
                            contactName={currentContactName}
                            sendDataToParent={callbackChatHistory}
                        />
                    ) : (
                        <br></br>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
