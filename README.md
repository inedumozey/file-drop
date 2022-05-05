# Descriptions

DragZone is a react component that allows you to drag and drop files or simply click to upload image files

#### Installation
```
    npm i @mozeyinedu/dragzone
```

### DragZone

```
    import { DragZone } form '@mozeyinedu/dragzone'

    function UploadFile(){

        return (
            <div style={{width: '100px', height: '100px'}}>
                <DragZone 
                    getFile={()=>console.log(file)}
                />
            </div>
        )
    }

```
The dragZone takes the size of whatever container you nested it with.

The drag can also accept some styles such as border radius

The following styles are default styles that cannot be overwritten:
* width:100%;
* display: block;
* height: 100%;
* display: flex;
* padding: 10px;
* text-align: center;
* justify-content: center;
* align-items: center;
* margin: auto;
* cursor: pointer;

Note: Background colors, text colors and border styles are passed as props

###### Props

1. getFile is a callback that returns the file in form of file, blob or base64

2. fileSize=60
This is the acceptable file size beyound which it throws an error. Default is 60

3. showInitialImage=false
Whether to show initial image or not when the component first rendered. default is false

4. initialImage='',
Pass the inital image to be shown here.

5. type='file',
this is the returned type, it can be blob, base64 string or file object. default is file object


6. draggedInBg='rgb(52 201 136 / 42%)',

7. defaultBg='rgba(138, 221, 185, 0.42)',

8. invalidBg='rgba(216, 79, 79, 0.42)',


9. draggedInColor='#fff',

10. defaultColor='#fff',

11. invalidColor='rgb(235, 5, 5)',


12. draggedInBorder='2px dashed rgba(7, 7, 7, 0.42)',

13. defaultBorder='2px solid rgba(118, 238, 218, 0.42)',

14. invalidBorder='2px solid rgb(235, 5, 5)',


15. defaultTxt= 'Drag & Drop Your file here or Click to Upload',

16. draggedInTxt= 'You Can Drop Now!',

17. invalidMemeTypeTxt= 'Accepted files are PNG, JPG or JPEG',

19. invalidFileSizeTxt= 'File Size must not be more than',