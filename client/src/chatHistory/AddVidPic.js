import React, {useState, useEffect, useRef}   from 'react';

function AddVidPic(list,setList) {
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div>
            <button type="button" className="btn btn-secondary"
             data-bs-toggle="modal"
             data-bs-target="#exampleModal1">
            <span>
            <i class="bi bi-file-image"></i>
            </span>
            </button>
            <button type="button" className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1">
            <span>
            <i class="bi bi-camera-video"></i>
            </span></button>
            <div
                className="modal fade"
                id="exampleModal1"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <input
                                type="file"
                                name="myImage"
                                inputProps={{ accept: 'image/*' }}  //make it work
                                onChange={(event) => {
                                  console.log(event.target.files[0]);  //to delete after everything
                                  setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="modal-footer">
                            <div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg"
                                data-bs-dismiss="modal"
                                onClick={()=>
                                    {if(selectedImage!=null)
                                    {
                                        
                                    (
                                        <div>
                                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />   
                                        </div>);
                                        const messege = [{sender: "me",
                                        type: "image",
                                        date: "05/04/2022",
                                        time: "12:54",
                                        context: URL.createObjectURL(selectedImage),
                                        lastContextTime: "10 min ago",},];
                                        var newList = [];
                                        newList= list.concat(messege);
                                        setList(newList);
                                }setSelectedImage(null);}}
                            >
                                Close
                            </button>
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    

//  need to change from URL to path line 53,59
export default AddVidPic;