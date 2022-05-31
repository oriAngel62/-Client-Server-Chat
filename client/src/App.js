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

    //useEffect to detect SignalR first connection
    useEffect(() => {
        const newConn = new HubConnectionBuilder()
            .withUrl("http://localhost:5285/hubs/chat")
            .withAutomaticReconnect()
            .build();

        setConn(newConn);
    }, []);

    //useEffect to detect SignalR connection that tells this user to add a new contact
    useEffect(() => {
        if (conn) {
            conn.start().then((started) => {
                conn.on("NewContact", (contact) => {
                    console.log("Got NewContact");
                    console.log(contact);
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
    }, [conn]);

    //useEffect hook to render all contacts of a connected user when this page is refreshed
    useEffect(() => {
        async function read() {
            //GET API function
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

    //GET API function
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

    const [lMessage, setLMessage] = useState(true);
    const [users, setusers] = useState(usersList);

    const [selectedContact, setSelectedContact] = useState("");

    const callbackContactItem = (childData) => {
        setSelectedContact(childData);
    };

    //this function adds a contact by posting the info to the server
    //and updates at the client side by getting the updated info from the server
    async function callbackPopUp() {
        //post fuction add contact asp.net
        //POST API function
        var childData = JSON.parse(localStorage.getItem("newContact"));
        const status = await fetch("http://localhost:5285/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(childData),
        });
        //GET API function
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
                        {/* here we add a new contact */}
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
                        {/* here we desplay all current contacts */}
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
                        // here we desplay the chat with a chosen contact
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
