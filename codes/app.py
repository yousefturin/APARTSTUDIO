import os
from PIL import Image
from flask import Flask, flash, request, make_response, render_template, redirect, url_for, send_file, send_from_directory ,abort, jsonify
from werkzeug.utils import secure_filename
DOWNLOAD_FOLDER = 'codes/static/download/'
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

app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER
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
    if new_filename == '':
         filenameFirstName = filename.rsplit('.', 1)[0]
         new_filename = filenameFirstName + "_NotPHOTOSHOP"
    else:
         new_filename = new_filename
    # Split the image format 
    os.path.splitext(filename)
    
    # Add the new name and format to the image
    filename = new_filename + image_format
    # Join the image 
    root_path = os.path.join(app.config['DOWNLOAD_FOLDER'], filename)
    # Reading the end-user image
    img = Image.open(file_path)
    
    # Convert the image to RGB mode
    img = img.convert('RGB')
    
    # Reading the logo image and converting it to RGB
    logo = Image.open(LOGO_COPYWRITE).convert('RGBA')
    
    # Calcualting the scaling factor to keep the aspict ratio 
    logo_width, logo_height = logo.size
    scaling_factor_width = 200 / logo_width

    # Calculate the scaling factor for the target height
    scaling_factor_height = 200 / logo_height

    # Choose the smallest scaling factor
    scaling_factor = min(scaling_factor_width, scaling_factor_height)

    # Calculate the new width and height of the logo
    new_logo_width = int(logo_width * scaling_factor)
    new_logo_height = int(logo_height * scaling_factor)
    logo = logo.resize((new_logo_width, new_logo_height), resample=Image.LANCZOS)

    # Create a new blank image with the same size as the big image
    result_image = Image.new("RGB", img.size, (255, 255, 255))

    # Paste the big image onto the new image
    result_image.paste(img, (0, 0))

    # Paste the small image onto the new image in the bottom left corner
    small_icon_position = (15, result_image.size[1] - new_logo_height)
    result_image.paste(logo, small_icon_position, logo)

    # Save the new image
    if image_quality is None:
        new_quality = int(100)
    else:
        new_quality = int(image_quality.strip('%'))
    output_img = result_image.save(root_path, quality=new_quality)
    return send_file(root_path, output_img, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
