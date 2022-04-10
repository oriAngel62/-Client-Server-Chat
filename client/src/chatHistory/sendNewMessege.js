import React, {useState}   from 'react';
import  {useRef} from 'react';


function SendNewMessege(contactItem,chatList){

    const [list_of_messeges,set_list_of_messeges] = useState(chatList);
    const [input, setInput] = useState('');

    
    const newMessege = function(txtMessege){
        console.log(txtMessege);
        const messege = [{sender: "me",
        type: "text",
        date: "05/04/2022",
        time: "12:54",
        context: txtMessege,
        lastContextTime: "10 min ago",},];
        const newList = [];
        newList.concat(list_of_messeges,messege);
        set_list_of_messeges(newList);
        console.log(txtMessege);
        console.log("1");
        console.log(newList);
    }
    // var button = document.querySelector(".sendButton");
    // console.log(button);
    // if(button)
    // {
    //     console.log("2");
    //     button.addEventListener('click', newMessege);
    // }
    // set_list_of_messeges={set_list_of_messeges}
    //onClick={newMessege(input)}
    
    const sendBox = useRef(null);
    
    return(
        <div className="bottomPart" >
            <div className="attachment"></div>
            <form className="d-flex" >
            <input className="form-control me-2" type="text" placeholder="Write a new message"
            value={input} onInput={e => setInput(e.target.value) } ></input>
            <button aria-label="Search" type="submit" >Send</button>
      </form>
      </div>
    );
    
}

export default SendNewMessege ;
