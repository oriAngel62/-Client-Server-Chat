import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, {useState}   from 'react';

function ChatHistory({ contact }) {
    
    const [list_of_messeges,set_list_of_messeges] = useState(contact.listMessages);
    var chatList = list_of_messeges.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    const [input, setInput] = useState('');
   
    
    return (
        <div className="chatPlace">
             <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div calssName="chatBox" id="box">
                {chatList}
            </div>
            <div className="bottomPart" >
            <div className="attachment"></div>
            <input type="text" placeholder="Write a new message" id="text"
            value={input} onInput={e => setInput(e.target.value) } ></input>
            <button  onClick={() => {
                const messege = [{sender: "me",
                type: "text",
                date: "05/04/2022",
                time: "12:54",
                context: input,
                lastContextTime: "10 min ago",},];
                var newList = [];
                newList= list_of_messeges.concat(messege);
                set_list_of_messeges(newList);
            //     const textBox = document.getElementById('text');
            //    textBox.value = '';
            }}>Send</button>
      </div>
                
            
        </div>
    );
}

export default ChatHistory;
