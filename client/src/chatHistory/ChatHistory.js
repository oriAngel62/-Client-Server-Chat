import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import SendNewMessege from "./sendNewMessege.js";

function ChatHistory({ contact }) {
    
    var chatList = contact.listMessages.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    
    
    return (
        <div className="chatPlace">
             <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div calssName="chatBox"  >
                {chatList}
            </div>
            <SendNewMessege contact={contact} chatList={chatList}/>
                
            
        </div>
    );
}

export default ChatHistory;
