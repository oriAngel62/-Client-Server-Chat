import React, {useState, useEffect, useRef}   from 'react';

function AddVidPic(list,setList) {
    const [selectedImage, setSelectedImage] = useState();
    // const pickerOpts = {
    //     types: [
    //       {
    //         description: 'Images',
    //         accept: {
    //           'image/*': ['.png', '.gif', '.jpeg', '.jpg']
    //         }
    //       },
    //     ],
    //     excludeAcceptAllOption: true,
    //     multiple: false
    //   };
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
                                //inputProps={pickerOpts}  //make it work
                                onChange={(event) => {
                                  console.log((URL.createObjectURL(event.target.files[0])).split('b:').pop());  //to delete after everything
                                  setSelectedImage((URL.createObjectURL(event.target.files[0])).split('b:').pop());
                                  (
                                    <div>
                                    <img width={"250px"} src={selectedImage} ></img> 
                                    </div>);
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
                                        console.log(typeof selectedImage);
                                    (
                                        <div>
                                        <img alt="not fount" width={"250px"} src={selectedImage}> </img> 
                                        </div>);
                                        const messege = [{sender: "me",
                                        type: "image",
                                        date: "05/04/2022",
                                        time: "12:54",
                                        context: {selectedImage},
                                        lastContextTime: "10 min ago",},];
                                        var newList = [];
                                        newList= list.concat(messege);
                                        setList(newList);
                                }setSelectedImage(null);}}
                            >
                                Submit
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