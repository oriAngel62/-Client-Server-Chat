import "./App.css";
import ContactItem from "./contactItem/ContactItem";
import React, { useState } from "react";
import { render } from "react-dom";

function App() {
    const listMessages = [
        {
            sender: "a",
            type: "text",
            context: "somthing intrseting",
            time: "10 min ago",
        },
        {
            sender: "a",
            type: "text",
            context: "last",
            time: "10 min ago",
        },
    ];
    const contactList = [
        { name: "Ori1", listMessages },
        { name: "David", listMessages },
    ];

    const [list, setList] = useState(contactList);
    const [name, setName] = useState("");
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

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleAdd() {
        const newList = list.concat({
            name: name,
            listMessages,
        });

        setList(newList);
        setName("");

        console.log(newList);
        contactList = list;
        console.log(contactList);
    }
    return (
        <div className="container -fluid">
            <div className="row">
                <div className="col-3">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                        />
                        <button type="button" onClick={handleAdd}>
                            Add
                        </button>
                    </div>
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
