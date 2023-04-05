# What is  **Not PHOTOSHOP**
## it's in the early stages yet as the Front-end was only developed
<img title="a title" alt="Alt text" src="code/static/images/img_icons.png">

It's a web application written in Python using the Flask framework and it allows users to editor images where users can upload there pictures and edit them using different tools and methods that program provide, such as:
> 
>- Apply filters
>- Fix white-balance
>- Fixe the Tone
>- Use different brushes
>- Add text and customize it 
>- Remove unwanted subject


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
# UI

<img title="a title" alt="Alt text" src="code/static/images/ui.png">
