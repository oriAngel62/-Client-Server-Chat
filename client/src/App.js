import "./App.css";
import ContactItem from "./contactItem/ContactItem";
import React, { useState } from "react";
import { render } from "react-dom";
import Popup from "./contactItem/Popup";

function App() {
    const listMessages = [
        {
            sender: "a",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "somthing intrseting",
            lastContextTime: "10 min ago",
        },
        {
            sender: "a",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: "somthing intrseting",
            lastContextTime: "11 min ago",
        },
    ];
    const contactList = [
        { name: "Ori1", listMessages },
        { name: "David", listMessages },
    ];

    const [list, setList] = useState(contactList);
    const handleCallback = (childData) => {
        console.log(childData.name);
        if (childData.name != "") {
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
        <div className="container -fluid">
            <div className="row">
                <div className="col-3">
                    <Popup sendDataToParent={handleCallback} />
                    {contactMap}
                    <div className="col-9">
                        <div className="chat">One of three columns12</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
