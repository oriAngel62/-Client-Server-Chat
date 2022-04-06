import "./ChatHistory.css";
import MessegeBox from "../chatHistory/MessegeBox";

function ChatHistory({ contact }) {
    console.log("dav");

    var chatList = contact.listMessages.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    return (
        <div>
            <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div
                calssName="chat-box"
                style="backround-color: rgb(102, 255, 153); height:600px; overflow-y: scroll;"
            >
                {chatList}
            </div>
            <div className="bottomPart">
                <div className="attachment"></div>
                <div>
                    <input placeholder="Write a new message">
                        <button>Send</button>
                    </input>
                </div>
            </div>
        </div>
    );
}

export default ChatHistory;
