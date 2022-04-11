import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, {useState, useEffect, useRef}   from 'react';


function ChatHistory({ contact }) {
    
    const [list_of_messeges,set_list_of_messeges] = useState(contact.listMessages);
    var chatList = list_of_messeges.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    const [input, setInput] = useState('');
    const [showMenu,setShowMenu] = useState(false);
    let menuRef = useRef(); 
    let menuButtonRef = useRef(); 
    useEffect(() => {
        document.addEventListener("mousedown",(event) => {
            if(!menuRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)){
            setShowMenu(false);
            }
        }

        );
    });
   
    
    return (
        <div className="chatPlace">
             <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div calssName="chatBox" id="box">
                {chatList}
            </div>
            <div className="bottomPart" >
            <div ref={menuRef}>
               { showMenu?<div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary">picture</button>
                        <button type="button" class="btn btn-secondary">voice message</button>
                         <button type="button" class="btn btn-secondary">video</button>
                        </div>:null
                }
            </div>
            <div ref={menuButtonRef} className="attachment">
                <button type="button" class="btn btn-primary" aria-label="glyphicon glyphicon-paperclip"
                onClick={() => {
                    if(showMenu)
                    {setShowMenu(false);}
                    else
                    setShowMenu(true);}}>
                <span class="glyphicon glyphicon-paperclip" aria-hidden="true">
                    <i class="bi bi-paperclip"></i>
                </span>
                </button>
            </div>
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
                 const textBox = document.getElementById('text');
                 setInput('');
            }}>Send</button>
      </div>
                
            
        </div>
    );
}

export default ChatHistory;
