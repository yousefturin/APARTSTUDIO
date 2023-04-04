import os
from flask import Flask, flash, request, render_template, redirect, url_for,send_from_directory ,abort, jsonify
from werkzeug.utils import secure_filename



UPLOAD_FOLDER = 'your/path/to/this/folder/codes/uploads'#change this path ---------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

class ResourceNotFoundError(Exception):
    pass

class InternalServerError(Exception):
    pass



@app.errorhandler(ResourceNotFoundError)
def handle_resource_not_found(e):
    return render_template('error.html', error=e), 404

@app.errorhandler(InternalServerError)
def handle_internal_server_error(e):
    return render_template('error.html', error=e), 500


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
app.secret_key = "teqi-Eest1-iold4"



# checking if the file are under the allowed format
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




@app.route('/',methods=['GET','POST'])
def upload_image():
        
        if request.method == 'POST':
                file = request.files['file'] 
                
        # config for the image 
                if 'file' not in request.files:
                        flash('No Image Part')
                        return redirect(request.url)
                if file.filename == '':
                        flash('No selected file')
                        return redirect(request.url)
                            
                else:
                        # checking if that file exist and allowed then pass it 
                        if file and allowed_file(file.filename):
                                try:
                                        filename = secure_filename(file.filename)
                                        return (file, filename) #needs editing 
                                except:
                                        raise ResourceNotFoundError("Image Resource could not be processed")   

                        elif file.filename not in ALLOWED_EXTENSIONS :
                                flash('Allowed image types are \n (png, jpg, jpeg, gif)')
                                return redirect(request.url)
                        
                        else:
                                raise ResourceNotFoundError("Image Resource could not be retuned")  
        else:
                return render_template('main.html')

if __name__ == "__main__":
    app.run(debug=True)
