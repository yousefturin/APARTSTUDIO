import os
import base64
import cv2
import numpy as np
from PIL import Image, ImageEnhance
from flask import Flask, flash, request, render_template, redirect, url_for, send_file
from werkzeug.utils import secure_filename
DOWNLOAD_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/download/'
LOGO_COPYWRITE = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/images/img_icons.png'
UPLOAD_FOLDER = 'C:/Users/youse/OneDrive/Documents/unviversity/4th_Year_second/codes/static/uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
app = Flask(__name__)


class ResourceNotFoundError(Exception):
    pass

class InternalServerError(Exception):
    pass

app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
app.secret_key = "teqi-Eest1-iold4"


@app.errorhandler(ResourceNotFoundError)
def handle_resource_not_found(e):
    return render_template('error.html', error=e), 404

@app.errorhandler(InternalServerError)
def handle_internal_server_error(e):
    return render_template('error.html', error=e), 500



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
            if file.filename != '':
                if file and allowed_file(file.filename):
                    try:
                        filename = secure_filename(file.filename)
                        print("1:",filename)
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
                raise ResourceNotFoundError("Image Resource could not be retuned")  
    else:
             return render_template('main.html')


@app.route('/display/<filename>')
def display_image(filename):
        return redirect(url_for('static', filename='uploads/'+ filename), code=301)

@app.route('/adjust_contrast', methods=['POST'])
def adjust_contrast():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        # Get the slider value from the form data
        contrast_value = float(request.json['contrastValue'])
        contrast = (contrast_value / 100) + 1.0
        # Get the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        print("2, IMAGE NAME:",image_name)
        print(contrast_value)
        # Open the image and apply contrast adjustment
        image = Image.open(image_path)
        # Apply contrast adjustment
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(contrast)
        image.save(new_image_path)
        
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_highlight', methods=['POST'])
def adjust_highlight():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        highlight_value = float(request.json['highlightValue'])
        highlight = (highlight_value / 100) + 1.0
        # Get the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        print("2, IMAGE NAME:",image_name)
        print(highlight_value)
        # Open the image and apply contrast adjustment
        image = Image.open(image_path)
        # Apply contrast adjustment
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(highlight) # Increase brightness by 20%
        image.save(new_image_path)

        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_shadow', methods=['POST'])
def adjust_shadow():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        shadow_value = int(request.json['shadowValue'])
        print(shadow_value)
        # Get the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
    # Apply the shadow effect to the input image using the add_shadow function
        with Image.open(image_path) as image:
            # Put the image to three chanels mode (RED, GREEN, BLUE)       
            image = image.convert('RGB')
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
            output_image.save(new_image_path)

        img_base64 = base64.b64encode(output_image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_white', methods=['POST'])
def adjust_white():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        white_value = int(request.json['whiteValue'])
        print(white_value)
        # Swaping the value to combine it UI
        # white_value = white_value * -1
        # Geting the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Converting the image to the HSV color space
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        # Spliting the image into its Hue, Saturation, and Value channels
        h, s, v = cv2.split(hsv)
        # Adjust the Value channel by adding the brightness adjustment value
        v_adjusted = v + white_value
        # Cliping the pixel values in the adjusted Value channel 
        v_adjusted = np.clip(v_adjusted, 0, 200)
        # Converting the adjusted Value channel back to uint8 data type
        v_adjusted = np.uint8(v_adjusted)
        # Merging the adjusted Hue, Saturation, and Value channels into a single image
        hsv_adjusted = cv2.merge((h, s, v_adjusted))
        # Converting the image back to the RGB color space
        result = cv2.cvtColor(hsv_adjusted, cv2.COLOR_HSV2BGR)
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)

        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_black', methods=['POST'])
def adjust_black():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        black_value = int(request.json['blackValue'])
        print(black_value)
        # Swap the value to combine it UI
        black_value = black_value * -1
        # Getting the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Converting the image to the HSV color space
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        # Spliting the image into its Hue, Saturation, and Value channels
        h, s, v = cv2.split(hsv)
        # Adjusting the Value channel to add the brightness adjustment value
        v_adjusted = v + black_value
        # Cliping the pixel values in the adjusted Value channel 
        v_adjusted = np.clip(v_adjusted, 0, 255)
        # Converting the adjusted Value channel back to uint8 data type
        v_adjusted = np.uint8(v_adjusted)
        # Merging the adjusted Hue, Saturation, and Value into a single image
        hsv_adjusted = cv2.merge((h, s, v_adjusted))
        # Converting the image back to the RGB color space
        result = cv2.cvtColor(hsv_adjusted, cv2.COLOR_HSV2BGR)
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)

        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

# there is logic error here double check it the alpha must be connevted to the input value so that it will change 
@app.route('/adjust_exposure', methods=['POST'])
def adjust_exposure():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        exposure_value = float(request.json['exposureValue'])
        print(exposure_value)
        # Scale the value to fit in cv2 method from 0 - 1 
        exposure_scaled = float((exposure_value + 4.9) / 10.0)
        print(exposure_scaled)
        # Getting the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Determine whether the exposure value is positive or negative
        if exposure_value >= 0:
            # If the exposure value is positive, set alpha to a value greater than 1.0 to make the image brighter
            alpha = 1.0 + exposure_scaled * 0.9
        else:
            # If the exposure value is negative, set alpha to a value less than 1.0 to make the image darker
            alpha = exposure_scaled * 0.5
        # Apply the exposure adjustment to the image
        image = cv2.convertScaleAbs(image, alpha=(alpha/exposure_scaled), beta=0)
        # Converting the name
        result = image
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}



@app.route('/adjust_temp', methods=['POST'])
def adjust_temp():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        temp_value = int(request.json['tempValue'])
        print(temp_value)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Convert the image to the LAB color space
        lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        # Compute the average blue and yellow values of the image
        mean_a = lab_image[:, :, 1].mean()
        mean_b = lab_image[:, :, 2].mean()
        # Compute the shift in blue and yellow values based on the temp value
        if temp_value < 26000:
            shift_blue = 0.0006 * (temp_value - 26000)
            print(shift_blue)
            shift_yellow = 0
        elif temp_value >= 26000 and temp_value <= 50000:
            shift_blue = 0
            shift_yellow = 0.0004 * (temp_value - 26000)
            print(shift_yellow)
        else:
             shift_yellow = 0
             shift_blue = 0
        # Apply the shift to the blue and yellow channels
        lab_image[:, :, 1] = lab_image[:, :, 1] - ((mean_a - 128) * (shift_yellow - shift_blue))
        lab_image[:, :, 2] = lab_image[:, :, 2] + ((mean_b - 128) * (shift_yellow + shift_blue))
        # Convert the image back to the BGR color space
        corrected_image = cv2.cvtColor(lab_image, cv2.COLOR_LAB2BGR)
        # Converting the  image name
        result = corrected_image
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_tint', methods=['POST'])
def adjust_tint():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        tint_value = int(request.json['tintValue'])
        print(tint_value)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Convert the input image to the LAB color space
        lab_img = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        # Split the LAB channels
        L, A, B = cv2.split(lab_img)
        # Adjust the A and B channels based on the tint value
        if tint_value < 0:
            B = np.float32(B)
            B += abs(tint_value) * 255 / 150 # fade to green
            B[B > 255] = 255 # cap at 255
            B = np.uint8(B)
        elif tint_value > 0:
            A = np.float32(A)
            A += tint_value * 255 / 150 # fade to pink
            A[A > 255] = 255 # cap at 255
            A = np.uint8(A)
        # Merge the LAB channels back together
        lab_img = cv2.merge((L, A, B))
        # Convert the LAB image back to the original color space
        result = cv2.cvtColor(lab_img, cv2.COLOR_LAB2BGR)
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}



@app.route('/adjust_text', methods=['POST'])
def adjust_text():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        text_value = int(request.json['textValue'])
        text_value = text_value / 100.0
        print("text_value",text_value)
        # Compute the sign of the input value
        text_sign = np.sign(text_value)
        print("text_sign",text_sign)
        # Compute the amount as the square of the rescaled input value
        if text_value > 0:
            text_value = text_value * -1
            amount = 0.2 * text_value
            weight = text_sign * amount 
            weight = weight * -1
        else:
            print("im here on else")
            amount = 0.2 * text_value
            weight = 0.5 * text_sign * amount 
        print("amount",amount)
        print("weight",weight)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Split the image into color channels
        b, g, r = cv2.split(image)
        # Apply a bilateral filter to each color channel
        b_smoothed = cv2.bilateralFilter(b, 30, 100, 100)
        g_smoothed = cv2.bilateralFilter(g, 30, 100, 100)
        r_smoothed = cv2.bilateralFilter(r, 30, 100, 100)
        # Compute the high-pass filtered image for each color channel
        b_high_pass = cv2.subtract(b, b_smoothed)
        g_high_pass = cv2.subtract(g, g_smoothed)
        r_high_pass = cv2.subtract(r, r_smoothed)
        # Compute the weights for blending the high-pass filtered image with the original color image
        if text_value > 0:
            b_weight = 10 / (np.mean(b_high_pass) + text_value)
            g_weight = 10 / (np.mean(g_high_pass) + text_value)
            r_weight = 10 / (np.mean(r_high_pass) + text_value)
        else:
            b_weight = 10 / (np.mean(b_high_pass) - text_value)
            g_weight = 10 / (np.mean(g_high_pass) - text_value)
            r_weight = 10 / (np.mean(r_high_pass) - text_value)
        # Normalize the high-pass filtered image for each color channel to the range [0, 255]
        cv2.normalize(b_high_pass, b_high_pass, 0, 255, cv2.NORM_MINMAX)
        cv2.normalize(g_high_pass, g_high_pass, 0, 255, cv2.NORM_MINMAX)
        cv2.normalize(r_high_pass, r_high_pass, 0, 255, cv2.NORM_MINMAX)
        b_high_pass = b_high_pass.astype(np.uint8)
        g_high_pass = g_high_pass.astype(np.uint8)
        r_high_pass = r_high_pass.astype(np.uint8)
        # Blend the high-pass filtered image with the original color image using the computed weights
        b_output = cv2.addWeighted(b, 1, b_high_pass, -text_sign * amount * b_weight, 0)
        g_output = cv2.addWeighted(g, 1, g_high_pass, -text_sign * amount * g_weight, 0)
        r_output = cv2.addWeighted(r, 1, r_high_pass, -text_sign * amount * r_weight, 0)
        # Merge the color channels back into a single image
        result = cv2.merge([b_output, g_output, r_output])
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_clar', methods=['POST'])
def adjust_clar():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        clar_value = int(request.json['clarValue'])
        print(clar_value)
        clar_value = clar_value * -1 
        alpha = clar_value / 100
        print("alpha",alpha)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        if clar_value > 0:
            lowpass = cv2.blur(image, (5, 5))
            result = cv2.addWeighted(image, 1 - alpha, lowpass, alpha, 0)
        if clar_value < 0:
            lowpass = cv2.blur(image, (5, 5))
            result = cv2.addWeighted(image, 1 - alpha, lowpass, alpha, 0)
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_deh', methods=['POST'])
def adjust_deh():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        deh_value = int(request.json['dehValue'])
        deh_value = deh_value/100
        print(deh_value)
        gamma = 1.2
        w = 0.95
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Apply dark channel prior
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        kernel_size = max(int(min(image.shape[:2]) / 100), 1)
        dark = cv2.erode(gray, cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size)))
        dc = 255 - cv2.dilate(dark, cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size)))
        # Estimate atmosphere light
        num_pixels = dc.size
        num_sample = int(num_pixels * 0.001)
        sample_pixels = np.random.choice(num_pixels, num_sample, replace=False)
        sample_values = np.sort(image.flatten()[sample_pixels])
        athmosphere_light = np.mean(sample_values[-num_sample // 10:])
        # Compute transmission
        transmission = 1 - w * dc / athmosphere_light
        # Apply soft matting
        radius = max(int(min(image.shape[:2]) / 100), 1)
        epsilon = 0.001
        guided = cv2.blur(transmission, (radius, radius))
        guided_filter = np.zeros_like(image, dtype=np.float64)
        for c in range(image.shape[2]):
            guided_filter[:, :, c] = cv2.filter2D(image[:, :, c], -1, guided, borderType=cv2.BORDER_REFLECT_101)
        var = np.var(image)
        transmission = (transmission - guided) / (np.maximum(var, np.mean(var)) + epsilon) + guided
        # Apply dehazing
        t = np.maximum(transmission, 1 - deh_value)
        result = np.zeros_like(image, dtype=np.float64)
        for c in range(image.shape[2]):
            result[:, :, c] = (image[:, :, c] - athmosphere_light) / t + athmosphere_light
        result = np.clip((result / 255 + 1e-6) ** gamma * 255, 0, 255)
        result =  result.astype(np.uint8)
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_sat', methods=['POST'])
def adjust_sat():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        sat_value = int(request.json['satValue'])
        print(sat_value)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        # Convert the value to a float between 0 and 2
        sat_value = (sat_value + 100) / 100.0
        print(sat_value)
        # Modify the image
        if sat_value <= 0.0:
            # Reduce the color intensity
            enhancer = ImageEnhance.Color(image)
            image = enhancer.enhance(sat_value)
        if sat_value > 0.0:
            # Increase the color intensity
            enhancer = ImageEnhance.Color(image)
            image = enhancer.enhance(sat_value)
        image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_vir', methods=['POST'])
def adjust_vir():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        vir_value = int(request.json['virValue'])
        print(vir_value)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Convert image to HSV color space
        hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        # Split the HSV image into separate channels
        h_channel, s_channel, v_channel = cv2.split(hsv_image)
        # Determine whether to add or subtract saturation
        if vir_value < 0:
            # Subtract saturation adjustment from the saturation channel
            s_adjust = -1 * vir_value
            s_channel = cv2.subtract(s_channel, s_adjust)
        else:
            # Add saturation adjustment to the saturation channel
            s_adjust = vir_value
            s_channel = cv2.add(s_channel, s_adjust)
        # Clip the pixel values to the valid range of 0-255
        s_channel = np.clip(s_channel, 0, 255)

        # Merge the HSV channels back together
        hsv_image = cv2.merge([h_channel, s_channel, v_channel])

        # Convert the HSV image back to BGR color space
        result = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_blur', methods=['POST'])
def adjust_blur():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        blur_value = float(request.json['blurValue'])
        print(blur_value)
        sigma = 0
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Check for minimum input value of 0.1 and set kernel size to 1
        if blur_value < 0.2:
            kernel_size = 1
        else:
            kernel_size = int(blur_value)* 2  + 1
        # Apply the blur using a Gaussian kernel
        print(kernel_size)
        blurred_img = cv2.GaussianBlur(image, (kernel_size, kernel_size), sigma)

        result = blurred_img
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_grain', methods=['POST'])
def adjust_grain():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        grain_value = float(request.json['grainValue'])
        print(grain_value)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        if grain_value <= 0.1:
            result = image 
        else:
            # Get the height and width of the image
            h, w, c = image.shape
            # Calculate the standard deviation for the Gaussian noise.
            std_dev = 255/(100.0/ grain_value)
            # Generate the random noise matrix with the same shape as the image.
            noise = np.zeros((h, w), dtype=np.uint8)
            cv2.randn(noise, 0, std_dev)
            # Create a grayscale version of the noise
            noise_gray = cv2.cvtColor(noise, cv2.COLOR_GRAY2RGB)
            noisy_image = np.uint8(noise_gray)
            noisy_image = np.clip(image + noise_gray, 0, 255)
            noisy_image = np.uint8(noisy_image)
            result = noisy_image
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_asp', methods=['POST'])
def adjust_asp():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        width_value = int(request.json['widthAspValue'])
        height_value = int(request.json['heightAspValue'])
        print(width_value)
        print(height_value)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        img_width, img_height = image.size
        # Calculate the scaling factor for the target width
        scaling_factor_width = width_value / img_width
        # Calculate the scaling factor for the target height
        scaling_factor_height = height_value / img_height
        # Choose the smallest scaling factor
        scaling_factor = min(scaling_factor_width, scaling_factor_height)

        # Calculate the new width and height of the image
        new_width = int(img_width* scaling_factor)
        new_height = int(img_height * scaling_factor)
        image = image.resize((new_width, new_height), resample=Image.LANCZOS)
        image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/download/<filename>', methods=['GET', 'POST'])
def download_file(filename):
        if request.method == 'POST':
            new_filename_html = request.form.get('image_name')
            print(new_filename_html)
            filename = new_filename_html
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if file_path == '':
                raise ResourceNotFoundError("Image Resource could not be retuned")  
            if file_path != '':
                print(file_path)
                new_filename = request.form.get('textfilename')
                image_format = request.form.get('image_format_selector').lower()
                image_quality = request.form.get('image_quality_selector')
                print(new_filename_html)
                if new_filename == '':
                    new_filename = "Your_image_from" + "_NotPHOTOSHOP"
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
            else:
                raise ResourceNotFoundError("Image Resource could not be retuned")  
        return send_file(output_path, output_img, as_attachment=True)




if __name__ == "__main__":
    app.run(debug=True)
