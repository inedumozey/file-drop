# Descriptions

FileDrop is a react component library that allows you to drag and drop files or simply click to upload image file. Only suport a single file uplaod for now and file must be an image file. 

#### Installation
```
    npm i @mozeyinedu/file-drop
```

### FileDrop

```
    import { FileDrop } form '@mozeyinedu/file-drop';

    function UploadFile(){

        return (
            <div style={{width: '150px', height: '150px'}}>
                <FileDrop 
                    getFile={(file)=>console.log(file)}
                />
            </div>
        )
    }

```
The FileDrop takes the size of whatever container you nested it with.

The following styles are default styles that cannot be overwritten:
* width:100%;
* display: block;
* height: 100%;
* display: flex;
* padding: 2px;
* text-align: center;
* justify-content: center;
* align-items: center;
* margin: auto;
* cursor: pointer;

Note: Background colors, text colors, border radius and border styles are passed as props

#### Props

1. getFile is a callback that returns the file in form of file, blob or base64

2. fileSize=60: 
This is the acceptable file size (as number) beyound which it throws an error. Default is 60. Th number passed is taken as kb

3. showInitialImage=false: 
Whether to show initial image or not when the component first rendered. default is false. When set to true, initial file should also be specified as seen below.

4. initialImage='': 
Pass the inital image to be shown here.

5. type='file': 
this is the returned type, it can be blob, base64 string or file object. default is file object


6. draggedInBg='rgb(52 201 136 / 42%)': 
This is the background color when the file is dragged into the FileDrop container

7. defaultBg='rgba(138, 221, 185, 0.42)': 
This is the initial background color when no file is dragged into the FileDrop container

8. invalidBg='rgba(216, 79, 79, 0.42)': 
This is the background color when an invalid operation is performed


9. draggedInColor='#fff': 
This is the text color when the file is dragged into the FileDrop container

10. defaultColor='#fff': 
This is the initial text color when no file is dragged into the FileDrop container

11. invalidColor='rgb(235, 5, 5)': 
This is the text color when an invalid operation is performed


12. draggedInBorder='2px dashed rgba(7, 7, 7, 0.42)': 
This is the border color when the file is dragged into the FileDrop container

13. defaultBorder='2px solid rgba(118, 238, 218, 0.42)': 
This is the initial border color when no file is dragged into the FileDrop container

14. invalidBorder='2px solid rgb(235, 5, 5)': 
This is the border color when an invalid operation is performed


15. defaultTxt= 'Drag & Drop Your file here or Click to Upload': 
text shown at rest

16. draggedInTxt= 'You Can Drop Now!':
Text shown when the FileDrop is ready to accept your file 

17. invalidMemeTypeTxt= 'Accepted files are PNG, JPG or JPEG':
Text shown when the file meme type is not valid

19. invalidFileSizeTxt= 'File Size must not be more than':
Text shown when the file size is not accepted

20. borderRadius="0px":
"0px" is the default if not specified.