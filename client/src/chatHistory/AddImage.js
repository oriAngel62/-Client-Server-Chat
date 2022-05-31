import React, { useState, useEffect } from "react";

function AddImage({ sendDataBack, contact, token}) {
    const [inputFile, setInputFile] = useState();
    const [timeCreated, setTimeCreated] = useState(getTime());
    const [selectedImage, setSelectedImage] = useState("");
  
    async function getTime(){
        const time = await fetch("http://localhost:5285/api/contacts/GetTime/time",{
            method: 'GET',
            headers: {"Authorization" : "Bearer " + token} 
        });
        return(time);
    }

    
    return (
        <div>
            <div className="modal-body">
                <input
                    type="file"
                    className="myImage"
                    id="inputPic"
                    accept="image/*"
                    onInput={(e) => setInputFile(e.target.value)}
                    onChange={(event) => {
                        setSelectedImage(
                            URL.createObjectURL(event.target.files[0])
                        );
                    }}
                />
            </div>
            <div className="modal-footer">
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            let messege = [];
                            if (selectedImage != null) {
                                var imageSource = selectedImage;
                                messege = [
                                    {
                                        Type: "image",                       // to change next ass
                                        Content: imageSource,
                                        Sent: true,
                                        Created: timeCreated,
                                    },
                                ];

                                sendDataBack(messege, contact);
                                setSelectedImage("");
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* <AddVidPic param="pic" selected={selectedImage} type=""/> */}
        </div>
    );
}

export default AddImage;
