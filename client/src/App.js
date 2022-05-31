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
                setContactMap(data);
                contacts.current = data;
            } else {
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
   
    var cList = [];

    const [list, setList] = useState(cList);

    const [lMessage, setLMessage] = useState(true);
    const [users, setusers] = useState(usersList);

    async function getMessages(id) {
        var fullURL = "http://localhost:5285/api/contacts/" + id + "/messages/";
        const res =await fetch(fullURL, {
            headers: {
                method: "GET",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        if (data) return data;
        else return null;
    }
    const [selectedContact, setSelectedContact] = useState("");

    const callbackContactItem = (childData) => {
        setSelectedContact(childData);
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
            usersList = getUsers();
        }
    }


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
            } else {
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
                                    setLMessage={setLMessage}
                                    lMessage={lMessage}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="col-9">
                    {selectedContact.contactName ? (
                        <ChatHistory
                            token={token}
                            userId={userId}
                            selectedContact={selectedContact}
                            setLMessage={setLMessage}
                            lMessage={lMessage}
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
