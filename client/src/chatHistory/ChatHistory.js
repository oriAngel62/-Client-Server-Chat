import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";

function ChatHistory({ contact }) {
    var chatList = contact.listMessages.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    return (
        <div className="chatPlace">
             <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div calssName="chatBox">
                {chatList}
            </div>
            bottom
        </div>
    );
}
/*
<div>
                    
                </div>
<div className="bottomPart">
                <div className="attachment"></div>
                <div>
                    <input placeholder="Write a new message">
                        <button>Send</button>
                    </input>
                </div>
            </div> 
*/
export default ChatHistory;
