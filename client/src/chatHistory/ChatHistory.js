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
            <div className="bottomPart">
                <div className="attachment"></div>
                <form class="d-flex">
        <input class="form-control me-2" type="messege" placeholder="Write a new message" aria-label="Search"></input>
        <button
        //  value={messege}
        //  class="btn btn-outline-success" type="submit" onClick={() => {
        //     contact.listMessages.append({messege});
        // }}
         >Send</button>
      </form>
            </div> 
        </div>
    );
}

export default ChatHistory;
