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
            context: "somthing intrseting",
            time: "10 min ago",
        },
    ];
    const contactList = [
        { name: "Ori1", listMessages },
        { name: "David", listMessages },
    ];

    const contactMap = contactList.map((contact, key) => {
        return (
            <ContactItem
                name={contact.name}
                lastMessage={contact.lastMessage}
                time={contact.time}
                key={key}
            />
        );
    });
    const [list, setList] = useState(contactList);
    const [name, setName] = useState("");

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleAdd() {
        const newList = contactList.concat({
            name: "o",
            listMessages,
        });

        setList(newList);
        setName("");

        console.log(newList);
        console.log(list);
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
