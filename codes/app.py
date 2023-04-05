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

@app.route('/')
def home():
        try:
                return render_template('main.html')
        except:
                raise ResourceNotFoundError("Resource page not found")
                
     


@app.route('/',methods=['GET','POST'])
def upload_image():

        if 'file'not in request.files:
             return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
             return redirect(request.url)
        if file and allowed_file(file.filename):
             filename =secure_filename(file.filename)
             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
             return render_template('main.html', filename=filename)
        else:
             return redirect(request.url)
        
@app.route('/display/<filename>')
def display_image(filename):
     return redirect(url_for('static', filename='uploads/'+ filename), code=301)
        
        
if __name__ == "__main__":
    app.run(debug=True)
