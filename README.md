# What is  **Not PHOTOSHOP**
<img title="a title" alt="Alt text" src="code/static/images/img_icons.png">

It's a web application written in Python using the Flask framework and it allows users to editor images where users can upload there pictures and edit them using different tools and methods that program provide, such as:
> 
>- Apply filters
>- Fix white-balance
>- Fixe the Tone
>- Use different brushes
>- Add text and customize it 
>- Remove unwanted subject
>- Colorize images using DeOldif model
>- Enhance images using  model

https://github.com/yousefturin/NOT-PHOTOSHOP/assets/94796673/6768ddb8-0af9-4c05-a8a6-533c86644735



# Change this inside the **main.html** for editing the code
## CSS file Path
```
<link rel= "stylesheet" href= "{{ url_for('static', filename='styles/style.css')">
```            
## JS file Path     
```
<script src="{{url_for('static', filename='styles/slider.js')}}"></script>                    
```            
# Change this inside the **app.py** for editing the code
```
UPLOAD_FOLDER =  "C:/Users/name/your/path/to/this/directory/UL_ph_1/input/"
```
# Colorizing Image
![black-and-white-movie-1833](https://github.com/yousefturin/NOT-PHOTOSHOP/assets/94796673/cbef1eb3-fd5e-47d0-ac33-bb1f4afba58d)![black-and-white-movie-0897](https://github.com/yousefturin/NOT-PHOTOSHOP/assets/94796673/1f8cb417-3be3-4622-92ed-4972eb2c2a19)


