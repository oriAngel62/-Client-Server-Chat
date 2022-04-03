import "./App.css";
import ContactItem from "./contactItem/ContactItem";

function App() {
    const contactList = [
        { name: "Ori1", lastMessage: "aaa", time: "1 min ago" },
        { name: "David", lastMessage: "aaa", time: "1 min ago" },
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
    return (
        <div className="container -fluid">
            <div className="row">
                {contactMap}
                <div className="col-9">
                    <div className="chat">One of three columns12</div>
                </div>
            </div>
        </div>
    );
}

export default App;
