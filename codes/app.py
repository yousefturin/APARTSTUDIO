import os
from PIL import Image
from flask import Flask, flash, request, make_response, render_template, redirect, url_for, send_file, send_from_directory ,abort, jsonify
from werkzeug.utils import secure_filename

LOGO_COPYWRITE = 'codes/static/images/img_icons.png'
UPLOAD_FOLDER = 'codes/static/uploads'
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
                
     


@app.route('/upload',methods=['GET','POST'])
def upload_image():
    if request.method == 'POST':
        file = request.files['file']  
        if 'file' not in request.files:
             flash('No Image Part')
             return redirect(request.url)
        else:
            if file.filename == '':
                flash('No Selected Image')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                try:
                    filename =secure_filename(file.filename)
                    app.logger.info(f'{filename}')
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    return render_template('main.html', filename=filename,file=file)
                except:
                    raise ResourceNotFoundError("Image Resource could not be processed")              
            elif file.filename not in ALLOWED_EXTENSIONS :
                flash('Allowed image types are \n (png, jpg, jpeg, gif)')
                return redirect(request.url)           
            else:
                    raise ResourceNotFoundError("Image Resource could not be retuned")  
    else:
             return redirect(request.url)

        
@app.route('/display/<filename>')
def display_image(filename):
     return redirect(url_for('static', filename='uploads/'+ filename), code=301)




        
@app.route('/download/<filename>', methods=['GET', 'POST'])
def download_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    new_filename = request.form.get('textfilename')
    image_format = request.form.get('image_format_selector').lower()
    image_quality = request.form.get('image_quality_selector')
    os.path.splitext(filename)
    filename = new_filename + image_format
    root_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img = Image.open(file_path)
    img = img.convert('RGB')
    # connecting js with python since the changing of png quality does not change anything so it's disabled
    if image_quality == None:
         new_quality = int(100)
    else:
        new_quality = int(image_quality.strip('%'))
    output_img =img.save(root_path, quality=new_quality)
    return send_file(root_path, output_img, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
