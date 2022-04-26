import React, { useState } from "react";

function AddImage({ sendDataBack, contact }) {
    const [inputFile, setInputFile] = useState();
    const [selectedImage, setSelectedImage] = useState("");

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
                                        sender: "me",
                                        type: "image",
                                        date: "05/04/2022",
                                        time: "12:54",
                                        context: imageSource,
                                        lastContextTime: "1 min ago",
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
