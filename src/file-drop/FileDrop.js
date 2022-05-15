import React, {useState, createRef } from 'react';
import './fileDrop.css'

function FileDrop({
    getFile,
    fileSize=60,
    showInitialImage=false,
    initialImage='',
    type='file',
    
    borderRadius='0px',

    draggedInBg='rgb(52 201 136 / 42%)',
    defaultBg='rgba(138, 221, 185, 0.42)',
    invalidBg='rgba(216, 79, 79, 0.42)',

    draggedInColor='#fff',
    defaultColor='teal',
    invalidColor='rgb(235, 5, 5)',

    draggedInBorder='2px dashed rgba(7, 7, 7, 0.42)',
    defaultBorder='2px solid rgba(118, 238, 218, 0.42)',
    invalidBorder='2px solid rgb(235, 5, 5)',

    defaultTxt= 'Drag & Drop Your file here or Click to Upload',
    draggedInTxt= 'You Can Drop Now!',
    invalidMemeTypeTxt= 'Accepted files are PNG, JPG JPEG',
    invalidFileSizeTxt= 'File Size must not be more than',
}) {
    const dragFileRef = createRef(null)
    const [ draggedIn, setDraggedIn ] = useState(false)
    const [ dropped, setDropped ] = useState(false)
    const [ validFile, setValidFile ] = useState(true)
    const [ dropMsg, setDropMsg ] = useState('')
    const [ fileURL, setFileURL ] = useState('')



    //------------------------------------handle click to uplaod------------------------------------
    function handleClickToUpload(e){

        const memeType = e.target.files[0].type.split('/')[1];

        if(memeType === 'png' || memeType === 'jpg' || memeType === 'jpeg'){
            const size = e.target.files[0].size / 1000;
            //fileSize is in kb
            if(size > fileSize){
                setDropped(true);
                setDraggedIn(false)
                setValidFile(false)
                setDropMsg(`File Size must not be more than ${fileSize} kb`)
            }else{
                setDropped(true);
                setValidFile(true)
                setDraggedIn(false)
                setDropMsg('')

                //get object url
                const file = e.target.files[0];
                const url = URL.createObjectURL(file);
                setFileURL(url);

                if(type === 'base64'){
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload =function(){
                        const base64data = reader.result
                        getFile(base64data);
                    }
                }if(type === 'blob'){
                    getFile(url)
                }else{
                    getFile(file)
                }
            }
        }else{
            setDropped(true);
            setValidFile(false)
            setDraggedIn(false)
            setDropMsg(invalidMemeTypeTxt)
        }
    }


    //------------------------------------handle drag and drop------------------------------------
    function handleDragOver(e){
        e.preventDefault();
        e.stopPropagation();
        setDraggedIn(true);
        setDropped(false);
        setValidFile(true)
        setDropMsg('')
    }
    function handleDragEnter(e){
        e.preventDefault();
        e.stopPropagation();
        setDropped(false);
        setValidFile(true)
        setDropMsg('')
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
            setDraggedIn(true);
            setDropped(false);
            setValidFile(true)
            setDropMsg('')
        }
    }

    function handleDragLeave(e){
        e.preventDefault();
        e.stopPropagation();
        setDraggedIn(false);
        setDropped(false);
        setValidFile(true)
        setDropMsg('')
    }

    function handleDrop(e){
        e.preventDefault();
        e.stopPropagation();
        dragFileRef.current.removeEventListener('dragover', handleDragOver, false)
        dragFileRef.current.removeEventListener('dragenter', handleDragEnter, false)

        setDropped(true);
        setValidFile(true)
        setDraggedIn(false)
        setDropMsg('')

        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const memeType = e.dataTransfer.files[0].type.split('/')[1];

            if(memeType === 'png' || memeType === 'jpg' || memeType === 'jpeg'){
                const size = e.dataTransfer.files[0].size / 1000;
                if(size > fileSize){
                    setDropped(true);
                    setDraggedIn(false)
                    setValidFile(false)
                    setDropMsg(`${invalidFileSizeTxt} ${fileSize}kb`)
                }else{
                    setDropped(true);
                    setValidFile(true)
                    setDraggedIn(false)
                    setDropMsg('')

                    //get object url
                    const file = e.dataTransfer.files[0];
                    const url = URL.createObjectURL(file)
                    setFileURL(url);
                    
                    if(type === 'base64'){
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload =function(){
                            const base64data = reader.result
                            getFile(base64data);
                        }
                    }if(type === 'blob'){
                        getFile(url)
                    }else{
                        getFile(file)
                    }
                }
            }else{
                setDropped(true);
                setValidFile(false)
                setDraggedIn(false)
                setDropMsg(invalidMemeTypeTxt);
            }
           
        }        
    }

    return (
        <div
            className='fileDrop'
            style={{
                height: '100%',
                borderRadius: borderRadius,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <label
                ref={dragFileRef}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: borderRadius,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '.9rem',
                    background: (function(){
                        if(draggedIn && !dropped){
                            return draggedInBg;
                        }
                        if(dropped){
                            if(!validFile){
                                return invalidBg;
    
                            }else{
                                return 'transparent';
                            }
                        }else{
                            return defaultBg
                        }
                    }()),

                    border: (function(){
                        if(draggedIn && !dropped){
                            return draggedInBorder;
                        }
                        if(dropped){
                            if(!validFile){
                                return invalidBorder;
    
                            }else{
                                return defaultBorder;
                            }
                        }else{
                            return defaultBorder;
                        }
                    }()),

                    color: (function(){
                        if(draggedIn && !dropped){
                            return draggedInColor;
                        }
                        if(dropped){
                            if(!validFile){
                                return invalidColor;
    
                            }else{
                                return defaultColor;
    
                            }
                        }else{
                            return defaultColor
                        }
                    }()),


                }}
                className={(function(){
                    if(draggedIn && !dropped){
                        return 'file draggedIn';
                    }
                    if(dropped){
                        if(!validFile){
                            return 'file invalid';

                        }else{
                            return 'file-img';

                        }
                    }else{
                        return 'file';
                    }
                }())} htmlFor="file">
                    
                    {
                        (function(){
                            if(draggedIn && !dropped){
                                return draggedInTxt;

                            }
                            if(dropped){
                                if(!validFile){
                                    return dropMsg;

                                }else{
                                    return (
                                        <>
                                            <div 
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: borderRadius,
                                                }}
                                            >
                                                <img 
                                                    style={{
                                                        objectFit: 'contain',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: borderRadius,
                                                    }}
                                                    src={fileURL}
                                                />
                                            </div>
                                        </>
                                    );

                                }
                            }else{
                                return <div style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    borderRadius: borderRadius,
                                    display: 'flex',
                                    justifyContent: 'centre',
                                    alignItems: 'centre',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '100%',
                                        fontWeight: 600,
                                        zIndex: 1
                                    }}>
                                        {defaultTxt}
                                        
                                    </div>
                                    {
                                        (function(){
                                            if(showInitialImage){
                                                return (
                                                    <img 
                                                        style={{
                                                            objectFit: 'contain',
                                                            width: '100%',
                                                            height: '100%',
                                                            filter: 'blur(2px)',
                                                            borderRadius: borderRadius,
                                                        }}
                                                        src={initialImage} alt="" 
                                                    />
                                                )
                                            }
                                        }())
                                    }
                                </div>;
                            }
                        }())
                    }
                  
                <input
                    onChange={handleClickToUpload}
                    type="file"
                    id='file'
                    placeholder='Upload your file'
                />         
            </label>
        </div>
    );
}

export default FileDrop;