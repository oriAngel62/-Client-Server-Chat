import {useState} from 'react';
import {useRef} from 'react';

function SendNewMessege(contact,chatList){

    const [listOfMesseges,setListOfMesseges] = useState(contact.listMessages);

    const newMessege = function(){
        console.log(sendBox.current.value);
        setListOfMesseges = contact.listMessages.concat({
            sender: "me",
            type: "text",
            date: "05/04/2022",
            time: "12:54",
            context: sendBox.current.value,
            lastContextTime: "10 min ago",
        });
        chatList = listOfMesseges;
    }

    const sendBox = useRef(null);

    return(
        <div className="bottomPart" setListOfMesseges={setListOfMesseges}>
            <div className="attachment"></div>
            <form className="d-flex">
            <input className="form-control me-2" type="messege" placeholder="Write a new message" aria-label="Search"
            ref={sendBox} onKeyUp={newMessege}></input>
            <button aria-label="Search">Send</button>
      </form>
      </div>
    );
}

export default SendNewMessege ;
