import os
import base64
import time
from PIL import Image, ImageEnhance
from flask import Flask, flash, request, render_template, redirect, url_for, send_file
from werkzeug.utils import secure_filename
PROCESS_CONTRAST_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/process/contrast/'
PROCESS_HIGHLIGHT_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/process/highlight/'
PROCESS_SHADOW_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/process/shadow/'
DOWNLOAD_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/download/'
LOGO_COPYWRITE = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/images/img_icons.png'
UPLOAD_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/uploads'
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
app.config['PROCESS_CONTRAST_FOLDER'] = PROCESS_CONTRAST_FOLDER
app.config['PROCESS_HIGHLIGHT_FOLDER'] = PROCESS_HIGHLIGHT_FOLDER
app.config['PROCESS_SHADOW_FOLDER'] = PROCESS_SHADOW_FOLDER
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
        print(file)
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
                    print("1",filename)
                    app.logger.info(f'{filename}')
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                   
                    return render_template('main.html', filename=filename)
                except:
                    raise ResourceNotFoundError("Image Resource could not be processed")              
            elif file.filename not in ALLOWED_EXTENSIONS :
                flash('Allowed image types are \n (png, jpg, jpeg, gif)')
                return redirect(request.url)           
            else:
                    raise ResourceNotFoundError("Image Resource could not be retuned")  
    else:
             return redirect(request.url)

        

@app.route('/adjust_contrast', methods=['POST'])
def adjust_contrast():
    if request.method == 'POST':
        image_name = request.json['imageName']
        contrast_value = float(request.json['contrastValue'])
        contrast = (contrast_value / 100) + 1.0
        # Get the image path from the form data
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        output_path = os.path.join(app.config['PROCESS_CONTRAST_FOLDER'], image_name)
        print("2, IMAGE NAME:",image_name)
        print(contrast_value)
        # Open the image and apply contrast adjustment
        image = Image.open(input_path)
        # Apply contrast adjustment
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(contrast)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object
    return {'image': img_base64}, 200, {'Content-Type': 'application/json'} 



@app.route('/adjust_highlight', methods=['POST'])
def adjust_highlight():
    if request.method == 'POST':
        image_name = request.json['imageName']
        highlight_value = float(request.json['highlightValue'])
        highlight = (highlight_value / 100) + 1.0
        # Get the image path from the form data
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        output_path = os.path.join(app.config['PROCESS_HIGHLIGHT_FOLDER'], image_name)
        print("2, IMAGE NAME:",image_name)
        print(highlight_value)
        # Open the image and apply contrast adjustment
        image = Image.open(input_path)
        # Apply contrast adjustment
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(highlight) # Increase brightness by 20%
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object
    return {'image': img_base64}, 200, {'Content-Type': 'application/json'} 

@app.route('/adjust_shadow', methods=['POST'])
def adjust_shadow():
    if request.method == 'POST':
        image_name = request.json['imageName']
        shadow_value = int(request.json['shadowValue'])
        print(shadow_value)
        # Set the paths for the input and output images
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        output_path = os.path.join(app.config['PROCESS_SHADOW_FOLDER'], image_name)
    # Apply the shadow effect to the input image using the add_shadow function
        with Image.open(input_path) as image:
            # Split the image into separate red, green, and blue channels
            r, g, b = image.split()

            # Create a darkened copy of the image to use as a shadow layer
            shadow_image = Image.merge('RGB', (r.point(lambda x: x * (1.0 - (abs(shadow_value) / 100.0))),
                                            g.point(lambda x: x * (1.0 - (abs(shadow_value) / 100.0))),
                                            b.point(lambda x: x * (1.0 - (abs(shadow_value) / 100.0)))))

            # Calculate the alpha value based on the shadow intensity
            alpha = abs(shadow_value) / 100.0
            
            # Blend the shadow image with the original image using the alpha value
            output_image = Image.blend(image, shadow_image, alpha=alpha)
            # Save the output image
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object
    return {'image': img_base64}, 200, {'Content-Type': 'application/json'} 





@app.route('/upload/display/<filename>')
def display_image(filename):
    timestamp = str(int(time.time() * 1000))  # generate a timestamp with milliseconds as the cache-busting parameter
    return redirect(url_for('static', filename=f'uploads/{filename}?v={timestamp}'), code=301)

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
    output_path = os.path.join(app.config['DOWNLOAD_FOLDER'], filename)
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
    output_img = result_image.save(output_path, quality=new_quality)
    return send_file(output_path, output_img, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)