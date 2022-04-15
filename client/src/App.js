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
        { name: "tome", listMessages },
        { name: "David", listMessages },
    ];

    const [list, setList] = useState(contactList);
    const handleCallback = (childData) => {
        console.log(childData.name);
        if (childData.name !== "") {
            handleAdd(childData.name);
        }
    };

    const contactMap = list.map((contact, key) => {
        return (
            <ContactItem
                contactItem={contact}
                // name={contact.name}
                // lastMessage={
                //     contact.listMessages[listMessages.length - 1].context
                // }
                // time={contact.listMessages[listMessages.length - 1].time}
                key={key}
            />
        );
    });

    function handleAdd(name) {
        const newList = list.concat({
            name: name,
            listMessages,
        });
        setList(newList);
        console.log(contactList);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <Popup sendDataToParent={handleCallback} />
                    <div className="scroll">{contactMap}</div>
                </div>
                <div className="col-9 vh-100">
                    <ChatHistory contact={{ name: "Ori1", listMessages }} />
                </div>
            </div>
        </div>
    );
}

export default App;
