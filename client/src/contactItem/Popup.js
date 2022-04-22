import React, { useState } from "react";
function Popup({ sendDataToParent, users }) {
    const [name, setName] = useState("");
    function handleChange(event) {
        setName(event.target.value);
    }
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                //add -bs
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Add new contact
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add new contact
                            </h5>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="modal-footer">
                            <div></div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        for (let x in users) {
                                            if (users[x].username === name) {
                                                alert(
                                                    "username already exist, please try another username"
                                                );
                                                return;
                                            }
                                        }
                                        sendDataToParent({ name });
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Popup;
