
import os
import base64

import arch 
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageDraw, ImageFont 
from flask import Flask, flash, request, render_template, redirect, url_for, send_file
from werkzeug.utils import secure_filename

from utils.segment_image import segment_image
from utils.colorizing_image import colorize_image
from utils.systemPath import *
import utils.RRDBNet_arch as arch

import torch
from torchvision import transforms


app = Flask(__name__)






ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])




class ResourceNotFoundError(Exception):
    pass

class InternalServerError(Exception):
    pass

app.config['RESULT_PATH'] = RESULT_PATH
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DEBUG'] = False
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
        shadow_value = -int(request.json['shadowValue'])
        # Get the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
    # Apply the shadow effect to the input image using the add_shadow function
        with Image.open(image_path) as image:
            # Put the image to three chanels mode (RED, GREEN, BLUE)       
            image = image.convert('RGB')
            # Split the image into separate red, green, and blue channels
            r, g, b = image.split()
            # Increase shadow intensity for negative shadow_value
            shadow_intensity = (((shadow_value + 100) / 100.0))
            # Calculate the alpha value based on the shadow intensity
            alpha = 1.0 - shadow_intensity
            # Create a darkened copy of the image to use as a shadow layer
            shadow_image = Image.merge('RGB', (r.point(lambda x: x * (1.0 - (abs(alpha)))),
                                            g.point(lambda x: x * (1.0 - (abs(alpha)))),
                                            b.point(lambda x: x * (1.0 - (abs(alpha))))))


               
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
        # Scale the value to fit in cv2 method from 0 - 1 
        
        # Getting the image path from the form data
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Determine whether the exposure value is positive or negative
        if exposure_value > 0:
            exposure_scaled = float((exposure_value - 4.99) / 10.0) 
            # If the exposure value is positive, set alpha to a value greater than 1.0 to make the image brighter
            alpha = 1.0 + exposure_scaled
        elif exposure_value < 0 :
            exposure_scaled = float((-exposure_value + 4.99) / 10.0) 
            # If the exposure value is negative, set alpha to a value less than 1.0 to make the image darker
            alpha = (1.5-exposure_scaled) *0.5
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
            shift_yellow = 0
        elif temp_value >= 26000 and temp_value <= 50000:
            shift_blue = 0
            shift_yellow = 0.0004 * (temp_value - 26000)
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
        # Compute the sign of the input value
        text_sign = np.sign(text_value)
        # Compute the amount as the square of the rescaled input value
        if text_value > 0:
            text_value = text_value * -1
            amount = 0.2 * text_value
            weight = text_sign * amount 
            weight = weight * -1
        else:
            amount = 0.2 * text_value
            weight = 0.5 * text_sign * amount 

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
        clar_value = clar_value * -1 
        alpha = clar_value / 100
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
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        # Convert the value to a float between 0 and 2
        sat_value = (sat_value + 100) / 100.0
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
        blurred_img = cv2.GaussianBlur(image, (kernel_size, kernel_size), sigma)

        result = blurred_img
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

# this function need to download all font to make them work correctly with the ui/ux
@app.route('/add_text', methods=['POST'])
def add_text():
    if request.method == 'POST':
        image_name = request.json['imageName'] # image name
        new_image_name = request.json['newImageName'] # image new name to be stored
        textBoxValue = request.json['textBoxValue'] # text in the box to be added to image
        textFontStyle = request.json['textFontWight'].lower() # font wight, bold, italic, normal
        textFontName = request.json['textFontStyle'].lower() # font stly, arial, impact...
        position_x = float(request.json['mappedX']) # position of box in X scale
        position_y = float(request.json['mappedY']) # position of box in Y scale
        textFontSize= int(request.json['textFontSize'])# font size 14, 16,20...
        textFontRotation = int(request.json['textFontRotation']) * -1 
        textColor = request.json['textColor']
        textColor = textColor.strip("#")
        r= int(textColor[0:2],16)
        g= int(textColor[2:4],16)
        b= int(textColor[4:6],16)
        print(r ,g, b)
        print(textFontRotation)
        if textBoxValue == ' ': 
            image = Image.open(image_path)
            image.save(new_image_path)
        else:
            if textFontName == 'arial':
                if textFontStyle == 'bold':
                    textFontCombo = ARIAL + 'arial-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = ARIAL + 'arial-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = ARIAL + 'arial-normal.ttf'
                else:
                    textFontCombo = ARIAL + 'arial-normal.ttf'

            elif textFontName == 'helvetica':
                if textFontStyle == 'bold':
                    textFontCombo = HELVETICA + 'Helvetica-bold.otf'
                elif textFontStyle == 'italic':
                    textFontCombo = HELVETICA + 'Helvetica-italic.otf'
                elif textFontStyle == 'normal':
                    textFontCombo = HELVETICA + 'Helvetica-normal.otf'
                else:
                    textFontCombo = HELVETICA + 'Helvetica-normal.otf'
            elif textFontName == 'times new roman':
                if textFontStyle == 'bold':
                    textFontCombo = TIMES_NEW_ROMAN + 'Times_New-Roman-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = TIMES_NEW_ROMAN + 'Times_New-Roman-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = TIMES_NEW_ROMAN + 'Times_New-Roman-normal.ttf'
                else:
                    textFontCombo = TIMES_NEW_ROMAN + 'Times_New-Roman-normal.ttf'

            elif textFontName == 'courier new':
                if textFontStyle == 'bold':
                    textFontCombo = COURIER_NEW + 'Courier_New-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = COURIER_NEW + 'Courier_New-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = COURIER_NEW + 'Courier_New-normal.ttf'
                else:
                    textFontCombo = COURIER_NEW + 'Courier_New-normal.ttf' 

            elif textFontName == 'verdana':
                if textFontStyle == 'bold':
                    textFontCombo = VERDANA + 'Verdana-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = VERDANA + 'Verdana-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = VERDANA + 'Verdana-normal.ttf'
                else:
                    textFontCombo = VERDANA + 'Verdana-normal.ttf'

            elif textFontName == 'georgia':
                if textFontStyle == 'bold':
                    textFontCombo = GEORGIA + 'Georgia-bold.otf'
                elif textFontStyle == 'italic':
                    textFontCombo = GEORGIA + 'Georgia-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = GEORGIA + 'Georgia-normal.ttf'
                else:
                    textFontCombo = GEORGIA + 'Georgia-normal.ttf' 

            elif textFontName == 'palatino':
                if textFontStyle == 'bold':
                    textFontCombo = PALATINO + 'Palatino-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = PALATINO + 'Palatino-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = PALATINO + 'Palatino-normal.ttf'
                else:
                    textFontCombo = PALATINO + 'Palatino-normal.ttf'

            elif textFontName == 'Garamond':
                if textFontStyle == 'bold':
                    textFontCombo = GARAMOND + 'Garamond-bold.TTF'
                elif textFontStyle == 'italic':
                    textFontCombo = GARAMOND + 'Garamond-italic.TTF'
                elif textFontStyle == 'normal':
                    textFontCombo = GARAMOND + 'Garamond-normal.TTF'
                else:
                    textFontCombo = GARAMOND + 'Garamond-normal.TTF' 

            elif textFontName == 'Bookman':
                if textFontStyle == 'bold':
                    textFontCombo = BOOKMAN + 'bookman-bold.TTF'
                elif textFontStyle == 'italic':
                    textFontCombo = BOOKMAN + 'bookman-italic.TTF'
                elif textFontStyle == 'normal':
                    textFontCombo = BOOKMAN + 'bookman-normal.TTF'
                else:
                    textFontCombo = BOOKMAN + 'bookman-normal.TTF'

            elif textFontName == 'comic sans ms':
                if textFontStyle == 'bold':
                    textFontCombo = COMIC_SANS_MS + 'Comic_Sans_MS-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = COMIC_SANS_MS + 'Comic_Sans_MS-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = COMIC_SANS_MS + 'Comic_Sans_MS-normal.ttf'
                else:
                    textFontCombo = COMIC_SANS_MS + 'Comic_Sans_MS-normal.ttf' 

            elif textFontName == 'impact':
                if textFontStyle == 'bold':
                    textFontCombo = IMPACT + 'impact-bold.otf'
                elif textFontStyle == 'italic':
                    textFontCombo = IMPACT + 'impact-italic.otf'
                elif textFontStyle == 'normal':
                    textFontCombo = IMPACT + 'impact-normal.ttf'
                else:
                    textFontCombo = IMPACT + 'impact-normal.ttf'

            elif textFontName == 'lucida sans unicode':
                if textFontStyle == 'bold':
                    textFontCombo = LUCIDA_SANS_UNICODE + 'Lucida_Sans_Unicode-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = LUCIDA_SANS_UNICODE + 'Lucida_Sans_Unicode-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = LUCIDA_SANS_UNICODE + 'Lucida_Sans_Unicode-normal.ttf'
                else:
                    textFontCombo = LUCIDA_SANS_UNICODE + 'Lucida_Sans_Unicode-normal.ttf' 

            elif textFontName == 'tahoma':
                if textFontStyle == 'bold':
                    textFontCombo = TAHOMA + 'Tahoma-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = TAHOMA + 'Tahoma-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = TAHOMA + 'Tahoma-normal.ttf'
                else:
                    textFontCombo = TAHOMA + 'Tahoma-normal.ttf'

            elif textFontName == 'trebuchet ms':
                if textFontStyle == 'bold':
                    textFontCombo = TREBUCHET_MS + 'Trebuchet_MS-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = TREBUCHET_MS + 'Trebuchet_MS-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = TREBUCHET_MS + 'Trebuchet_MS-normal.ttf'
                else:
                    textFontCombo = TREBUCHET_MS + 'Trebuchet_MS-normal.ttf'

            elif textFontName == 'century gothic':
                if textFontStyle == 'bold':
                    textFontCombo = CENTURY_GOTHIC + 'Century_Gothic-bold.TTF'
                elif textFontStyle == 'italic':
                    textFontCombo = CENTURY_GOTHIC + 'Century_Gothic-italic.TTF'
                elif textFontStyle == 'normal':
                    textFontCombo = CENTURY_GOTHIC + 'Century_Gothic-normal.TTF'
                else:
                    textFontCombo = CENTURY_GOTHIC + 'Century_Gothic-normal.TTF'

            elif textFontName == 'consolas':
                if textFontStyle == 'bold':
                    textFontCombo = CONSOLAS + 'Consolas-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = CONSOLAS + 'Consolas-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = CONSOLAS + 'Consolas-normal.ttf'
                else:
                    textFontCombo = CONSOLAS + 'Consolas-normal.ttf' 

            elif textFontName == 'calibri':
                if textFontStyle == 'bold':
                    textFontCombo = CALIBRI + 'calibri-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = CALIBRI + 'calibri-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = CALIBRI + 'calibri-normal.ttf'
                else:
                    textFontCombo = CALIBRI + 'calibri-normal.ttf'

            elif textFontName == 'cambria':
                if textFontStyle == 'bold':
                    textFontCombo = CAMBRIA + 'cambria-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = CAMBRIA + 'cambria-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = CAMBRIA + 'cambria-normal.ttc'# it might be not supported check the documintation
                else:
                    textFontCombo = CAMBRIA + 'Helvetica-normal.ttc' 

            elif textFontName == 'franklin gothic medium':
                if textFontStyle == 'bold':
                    textFontCombo = FRANKLIN_GOTHIC_MEDIUM + 'Franklin_Gothic_Medium-bold.TTF'
                elif textFontStyle == 'italic':
                    textFontCombo = FRANKLIN_GOTHIC_MEDIUM + 'Franklin_Gothic_Medium-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = FRANKLIN_GOTHIC_MEDIUM + 'Franklin_Gothic_Medium-normal.ttf'
                else:
                    textFontCombo = FRANKLIN_GOTHIC_MEDIUM + 'Franklin_Gothic_Medium-normal.ttf'

            elif textFontName == 'segoe ui':
                if textFontStyle == 'bold':
                    textFontCombo = SEGOE_UI + 'Segoe_UI-bold.ttf'
                elif textFontStyle == 'italic':
                    textFontCombo = SEGOE_UI + 'Segoe_UI-italic.ttf'
                elif textFontStyle == 'normal':
                    textFontCombo = SEGOE_UI + 'Segoe_UI-normal.ttf'
                else:
                    textFontCombo = SEGOE_UI + 'Segoe_UI-normal.ttf'
            else:
                    textFontCombo = ARIAL + 'arial-normal.ttf'                                                                                                                                     

            image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
            new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
            image = Image.open(image_path)
            draw = ImageDraw.Draw(image)
            # need to download all .ttf folders for font's to make the bold or italic work!!!!!! be aware of it
            font = ImageFont.truetype(textFontCombo, textFontSize)
            text = textBoxValue
            x, y = position_x, position_y
            text_width, text_height = draw.textsize(text, font=font)
            # Create a new image for the rotated text
            rotated_text_image = Image.new("RGBA", (text_width, text_height), (0, 0, 0, 0))
            rotated_text_draw = ImageDraw.Draw(rotated_text_image)

            # Draw the text on the rotated image
            rotated_text_draw.text((0, 0), text, font=font, fill=(r, g, b))

            # Rotate the text image around its center
            rotated_text_image = rotated_text_image.rotate(textFontRotation, resample=Image.BICUBIC, expand=True)

            # Calculate the position for pasting the rotated text
            paste_x =  int(x -(rotated_text_image.width - text_width) / 2)
            paste_y =  int(y -(rotated_text_image.height - text_height) / 2)

            # Paste the rotated text onto the original image
            image.paste(rotated_text_image, (paste_x, paste_y), mask=rotated_text_image)
            dpi = 300
            image.save(new_image_path,  dpi=(dpi, dpi))
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}
# Run time 18.5s  --> widht:851px, height:1277px
# Run time 22.87s --> width:1280px, height:854px
# Run time 18.33s --> width:1920px, height:1280px
# Run time 26,73  --> width:6720px, height:4480px -----!
#'''

@app.route('/colorize', methods=['POST'])
def colorize():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name) 
        new_result_path = os.path.join(app.config['RESULT_PATH'], image_name)
        # Load the image
        colorize_image(image_path)
        image = Image.open(new_result_path)
        image.save(new_image_path)
        # clean the output image to free space in Disk
        toBeRemovedPath = os.path.join(app.config['RESULT_PATH'], image_name)
        os.remove(toBeRemovedPath)
        # Save the colorized image
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

# This function needs more 2GB of CUDA, so it will run out of space but it works on CPU 
@app.route('/enhance', methods=['POST'])
def enhance():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name) 
        device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')
        print("PyTorch version:", torch.__version__)
        print("CUDA version:", torch.version.cuda)
        print("Device used:", device)
        model = arch.RRDBNet(3, 3, 64, 23, gc=32).to(device)
        model.load_state_dict(torch.load(MODEL_PATH, map_location=device), strict=True)
        model.eval()
        # Load the input image
        image = cv2.imread(image_path, cv2.IMREAD_COLOR)
        image = image * 1.0 / 255
        image = torch.from_numpy(np.transpose(image[:, :, [2, 1, 0]], (2, 0, 1))).float()
        image = image.unsqueeze(0)
        image = image.to(device)
        with torch.no_grad():
            image = model(image).data.squeeze().float().cpu().clamp_(0, 1).numpy()
        image = np.transpose(image[[2, 1, 0], :, :], (1, 2, 0))
        image = (image * 255.0).round()
        cv2.imwrite(new_image_path, image)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/BackgroundRemoved', methods=['POST'])
def BackgroundRemoved():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        new_result_path = os.path.join(app.config['RESULT_PATH'], new_image_name)
        segment_image(image_path, new_result_path)
        image =Image.open(new_result_path)
        image.save(new_image_path)
        toBeRemovedPath = os.path.join(app.config['RESULT_PATH'], new_image_name)
        os.remove(toBeRemovedPath)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/crop_image', methods=['POST'])
def crop_image():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        position_x = float(request.json['mappedX'])   # position of box in X scale
        position_y = float(request.json['mappedY'])  # position of box in Y scale
        width = float(request.json['mappedWidth']) + 200 # position of box in X scale
        height = float(request.json['mappedHeight']) + 200 # position of box in Y scale
        print(position_x, position_y, width, height)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        
        # Crop the image based on the provided coordinates and dimensions
        image = image.crop((position_x, position_y, position_x + width, position_y + height))
        image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_grain', methods=['POST'])
def adjust_grain():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        grain_value = float(request.json['grainValue'])
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


@app.route('/adjust_RedHueColor', methods=['POST'])
def adjust_RedHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        RedColorHueValue = int(request.json['RedColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if RedColorHueValue <= -100:
            target_hue = 0  # Set target hue to 8 (dark red)
        elif RedColorHueValue >= 100:
            target_hue = 20  # Set target hue to 22 (maximum red)
        else:
            target_hue = int(0 + ((20 - 0) / 200) * (RedColorHueValue + 100))  # Map red to range [8, 22]

        red_mask = (h_arr >= 0) & (h_arr <= 20) & (h_arr >= 0) & (h_arr <= 20) # Define a mask for red pixels
        red_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the red pixels
        red_pixels[red_mask] = True  # Set the values of the red pixels to True

        h_red = h_arr.copy()  # Create a copy of the hue channel
        h_red[~red_pixels] = h_arr[~red_pixels]  # Set non-red pixels to their original hue value
        h_red[red_pixels] = target_hue  # Set hue value of red pixels to the target value
        h_red_img = Image.fromarray(h_red, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_red = Image.merge('HSV', (h_red_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_red.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_RedSatColor', methods=['POST'])
def adjust_RedSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        red_color_value = int(request.json['RedColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if red_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif red_color_value >= 100:
            target_saturation_low = 255  # Set target saturation to 255 (maximum saturation)
            target_saturation_high = 255
        else:
            target_saturation_low = int(50 + ((255 - 50) / 200) * (red_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(50 + ((255 - 50) / 200) * (red_color_value + 100))

        red_mask = ((h_arr >= 0) | (h_arr <= 20))  # Define a mask for pink pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 21) & (h_arr <= 330))  # Exclude green and blue color ranges
        red_mask = red_mask & ~exclude_mask

        low_saturation_pixels = red_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = red_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_red = s_arr.copy()  # Create a copy of the saturation channel
        s_red[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_red[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value
        s_red_img = Image.fromarray(s_red, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_red = Image.merge('HSV', (h, s_red_img, v))  # Merge channels back together

        adjusted_image = image_hsv_red.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}



@app.route('/adjust_RedLumColor', methods=['POST'])
def adjust_RedLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        red_color_value = int(request.json['RedColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if red_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif red_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((red_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        red_mask = ((h_arr >= 0) & (h_arr <= 20))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_red = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_red[red_mask] = np.clip(v_arr[red_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_red_img = Image.fromarray(v_red.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_red = Image.merge('HSV', (h, s, v_red_img))  # Merge channels back together

        adjusted_image = image_hsv_red.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}





@app.route('/adjust_OrangeHueColor', methods=['POST'])
def adjust_OrangeHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        orange_color_value = int(request.json['OrangeColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if orange_color_value <= -100:
            target_hue = 20  # Set target hue to 8 (dark orange)
        elif orange_color_value >= 100:
            target_hue = 40  # Set target hue to 22 (maximum orange)
        else:
            target_hue = int(20 + ((40 - 20) / 200) * (orange_color_value + 100))  # Map orange_color_value to range [8, 22]

        orange_mask = (h_arr >= 20) & (h_arr <= 40)  # Define a mask for orange pixels
        orange_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the orange pixels
        orange_pixels[orange_mask] = True  # Set the values of the orange pixels to True

        h_orange = h_arr.copy()  # Create a copy of the hue channel
        h_orange[~orange_pixels] = h_arr[~orange_pixels]  # Set non-orange pixels to their original hue value
        h_orange[orange_pixels] = target_hue  # Set hue value of orange pixels to the target value
        h_orange_img = Image.fromarray(h_orange, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_orange = Image.merge('HSV', (h_orange_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_orange.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_OrangeSatColor', methods=['POST'])
def adjust_OrangeSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        orange_color_value = int(request.json['OrangeColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if orange_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif orange_color_value >= 100:
            target_saturation_low = 255  # Set target saturation to 255 (maximum saturation)
            target_saturation_high = 255
        else:
            target_saturation_low = int(50 + ((255 - 50) / 200) * (orange_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(50 + ((255 - 50) / 200) * (orange_color_value + 100))  # Map pink_color_value to range [50, 255]


        orange_mask = ((h_arr >= 20) | (h_arr <= 40))  # Define a mask for orange pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 19))  # Exclude green and blue color ranges
        exclude_mask_2 = ((h_arr >= 41) & (h_arr <= 330)) 
        orange_mask = orange_mask & ~exclude_mask & ~exclude_mask_2

        low_saturation_pixels = orange_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = orange_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_orange = s_arr.copy()  # Create a copy of the saturation channel
        s_orange[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_orange[high_saturation_pixels] = target_saturation_high 
        s_orange_img = Image.fromarray(s_orange, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_orange = Image.merge('HSV', (h, s_orange_img, v))  # Merge channels back together

        adjusted_image = image_hsv_orange.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_OrangeLumColor', methods=['POST'])
def adjust_OrangeLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        orange_color_value = int(request.json['OrangeColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if orange_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif orange_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((orange_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        orange_mask = ((h_arr >= 20) & (h_arr <= 40))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_orange = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_orange[orange_mask] = np.clip(v_arr[orange_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_orange_img = Image.fromarray(v_orange.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_orange = Image.merge('HSV', (h, s, v_orange_img))  # Merge channels back together

        adjusted_image = image_hsv_orange.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}





@app.route('/adjust_YellowHueColor', methods=['POST'])
def adjust_YellowHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        yellow_color_value = int(request.json['YellowColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if yellow_color_value <= -100:
            target_hue = 40  # Set target hue to 30 (dark yellow)
        elif yellow_color_value >= 100:
            target_hue = 55  # Set target hue to 50 (maximum yellow)
        else:
            target_hue = int(40 + ((55 -40) / 200) * (yellow_color_value + 100))  # Map yellow_color_value to range [30, 50]

        yellow_mask = (h_arr >= 40) & (h_arr <= 55)  # Define a mask for yellow pixels
        yellow_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the yellow pixels
        yellow_pixels[yellow_mask] = True  # Set the values of the yellow pixels to True

        h_yellow = h_arr.copy()  # Create a copy of the hue channel
        h_yellow[~yellow_pixels] = h_arr[~yellow_pixels]  # Set non-yellow pixels to their original hue value
        h_yellow[yellow_pixels] = target_hue  # Set hue value of yellow pixels to the target value
        h_yellow_img = Image.fromarray(h_yellow, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_yellow = Image.merge('HSV', (h_yellow_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_yellow.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_YellowSatColor', methods=['POST'])
def adjust_YellowSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        yellow_color_value = int(request.json['YellowColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if yellow_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif yellow_color_value >= 100:
            target_saturation_low = 255  # Set target saturation to 255 (maximum saturation)
            target_saturation_high = 255
        else:
            target_saturation_low = int(50 + ((255 - 50) / 200) * (yellow_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(50 + ((255 - 50) / 200) * (yellow_color_value + 100))  # Map pink_color_value to range [50, 255]


        yellow_mask = ((h_arr >= 40) | (h_arr <= 55))  # Define a mask for yellow pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 39))  # Exclude green and blue color ranges
        exclude_mask_2 = ((h_arr >= 56) & (h_arr <= 330)) 
        yellow_mask = yellow_mask & ~exclude_mask & ~exclude_mask_2

        low_saturation_pixels = yellow_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = yellow_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_yellow = s_arr.copy()  # Create a copy of the saturation channel
        s_yellow[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_yellow[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value # Set saturation value of yellow pixels to the target value
        s_yellow_img = Image.fromarray(s_yellow, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_yellow = Image.merge('HSV', (h, s_yellow_img, v))  # Merge channels back together

        adjusted_image = image_hsv_yellow.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_YellowLumColor', methods=['POST'])
def adjust_YellowLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        yellow_color_value = int(request.json['YellowColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if yellow_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif yellow_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((yellow_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        yellow_mask = ((h_arr >= 40) & (h_arr <= 55))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_yellow = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_yellow[yellow_mask] = np.clip(v_arr[yellow_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_yellow_img = Image.fromarray(v_yellow.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_yellow = Image.merge('HSV', (h, s, v_yellow_img))  # Merge channels back together

        adjusted_image = image_hsv_yellow.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}



@app.route('/adjust_GreenHueColor', methods=['POST'])
def adjust_GreenHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        green_color_value = int(request.json['GreenColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if green_color_value <= -100:
            target_hue = 60  # Set target hue to 75 (dark green)
        elif green_color_value >= 100:
            target_hue = 120  # Set target hue to 90 (maximum green)
        else:
            target_hue = int(60 + ((120  - 60) / 200) * (green_color_value + 100))  # Map green_color_value to range [75, 90]

        green_mask = ((h_arr >= 60) & (h_arr <= 120))  # Define a mask for green pixels
        green_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the green pixels
        green_pixels[green_mask] = True  # Set the values of the green pixels to True

        h_green = h_arr.copy()  # Create a copy of the hue channel
        h_green[~green_pixels] = h_arr[~green_pixels]  # Set non-green pixels to their original hue value
        h_green[green_pixels] = target_hue  # Set hue value of green pixels to the target value
        h_green_img = Image.fromarray(h_green, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_green = Image.merge('HSV', (h_green_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_green.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_GreenSatColor', methods=['POST'])
def adjust_GreenSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        green_color_value = int(request.json['GreenColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if green_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif green_color_value >= 100:
            target_saturation_low = 255  # Set target saturation to 255 (maximum saturation)
            target_saturation_high = 255
        else:
            target_saturation_low = int(50 + ((255 - 50) / 200) * (green_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(50 + ((255 - 50) / 200) * (green_color_value + 100))  # Map pink_color_value to range [50, 255]


        green_mask = ((h_arr >= 50) | (h_arr <= 120))  # Define a mask for green pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 49))  # Exclude green and blue color ranges
        exclude_mask_2 = ((h_arr >= 121) & (h_arr <= 330)) 
        green_mask = green_mask & ~exclude_mask & ~exclude_mask_2

        low_saturation_pixels = green_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = green_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_green = s_arr.copy()  # Create a copy of the saturation channel
        s_green[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_green[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value
        s_green_img = Image.fromarray(s_green, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_green = Image.merge('HSV', (h, s_green_img, v))  # Merge channels back together

        adjusted_image = image_hsv_green.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_GreenLumColor', methods=['POST'])
def adjust_GreenLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        green_color_value = int(request.json['GreenColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if green_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif green_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((green_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        green_mask = ((h_arr >= 50) & (h_arr <= 120))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_green = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_green[green_mask] = np.clip(v_arr[green_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_green_img = Image.fromarray(v_green.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_green = Image.merge('HSV', (h, s, v_green_img))  # Merge channels back together

        adjusted_image = image_hsv_green.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}



@app.route('/adjust_MagentaHueColor', methods=['POST'])
def adjust_MagentaHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        Magenta_color_value = int(request.json['MagentaColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if Magenta_color_value <= -100:
            target_hue = 115  # Set target hue to 75 (dark green)
        elif Magenta_color_value >= 100:
            target_hue = 150  # Set target hue to 105 (maximum green with a bluish tint)
        else:
            target_hue = int(115 + ((150 - 115) / 200) * (Magenta_color_value + 100))  # Map Magenta_color_value to range [75, 105]

        magenta_mask = ((h_arr >= 115) & (h_arr <= 150))  # Define a mask for magenta_mask pixels
        magenta_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the green pixels
        magenta_pixels[magenta_mask] = True  # Set the values of the magenta pixels to True

        h_magenta = h_arr.copy()  # Create a copy of the hue channel
        h_magenta[~magenta_pixels] = h_arr[~magenta_pixels]  # Set non-magenta pixels to their original hue value
        h_magenta[magenta_pixels] = target_hue  # Set hue value of magenta pixels to the target value
        h_magenta_img = Image.fromarray(h_magenta, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_magenta = Image.merge('HSV', (h_magenta_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_magenta.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_MagentaSatColor', methods=['POST'])
def adjust_MagentaSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        magenta_color_value = int(request.json['MagentaColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if magenta_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif magenta_color_value >= 100:
            target_saturation_low = 255  # Set target saturation to 255 (maximum saturation)
            target_saturation_high = 255
        else:
            target_saturation_low = int(50 + ((255 - 50) / 200) * (magenta_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(50 + ((255 - 50) / 200) * (magenta_color_value + 100))  # Map pink_color_value to range [50, 255]


        magenta_mask = ((h_arr >= 115) | (h_arr <= 150))  # Define a mask for magenta pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 114))  # Exclude green and blue color ranges
        exclude_mask_2 = ((h_arr >= 151) & (h_arr <= 300)) 
        magenta_mask = magenta_mask & ~exclude_mask & ~exclude_mask_2

        low_saturation_pixels = magenta_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = magenta_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_magenta = s_arr.copy()  # Create a copy of the saturation channel
        s_magenta[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_magenta[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value

        s_magenta_img = Image.fromarray(s_magenta, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_magenta = Image.merge('HSV', (h, s_magenta_img, v))  # Merge channels back together

        adjusted_image = image_hsv_magenta.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_MagentaLumColor', methods=['POST'])
def adjust_MagentaLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        magenta_color_value = int(request.json['MagentaColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if magenta_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif magenta_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((magenta_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        magenta_mask = ((h_arr >= 115) & (h_arr <= 150))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_magenta = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_magenta[magenta_mask] = np.clip(v_arr[magenta_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_magenta_img = Image.fromarray(v_magenta.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_magenta = Image.merge('HSV', (h, s, v_magenta_img))  # Merge channels back together

        adjusted_image = image_hsv_magenta.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}




@app.route('/adjust_BlueHueColor', methods=['POST'])
def adjust_BlueHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        blue_color_value = int(request.json['BlueColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if blue_color_value <= -100:
            target_hue = 150  # Set target hue to 75 (dark green)
        elif blue_color_value >= 100:
            target_hue = 180  # Set target hue to 260 (maximum blue with a purplish tint)
        else:
            target_hue = int(150 + ((180 - 150) / 200) * (blue_color_value + 100))  # Map blue_color_value to range [75, 260]

        blue_mask = ((h_arr >= 150) & (h_arr <= 180))  # Define a mask for light green pixels
        blue_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the blue pixels
        blue_pixels[blue_mask] = True  # Set the values of the blue pixels to True

        h_blue = h_arr.copy()  # Create a copy of the hue channel
        h_blue[~blue_pixels] = h_arr[~blue_pixels]  # Set non-blue pixels to their original hue value
        h_blue[blue_pixels] = target_hue  # Set hue value of blue pixels to the target value
        h_blue_img = Image.fromarray(h_blue, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_blue = Image.merge('HSV', (h_blue_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_blue.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_BlueSatColor', methods=['POST'])
def adjust_BlueSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        blue_color_value = int(request.json['BlueColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if blue_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif blue_color_value >= 100:
            target_saturation_low = 255  # Set target saturation to 255 (maximum saturation)
            target_saturation_high = 255
        else:
            target_saturation_low = int(0 + ((255 - 0) / 200) * (blue_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(0 + ((255 - 0) / 200) * (blue_color_value + 100))  # Map pink_color_value to range [50, 255]


        blue_mask = ((h_arr >= 150) | (h_arr <= 190))  # Define a mask for blue pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 150))  # Exclude green and blue color ranges
        exclude_mask_2 = ((h_arr >= 190) & (h_arr <= 360)) 
        blue_mask = blue_mask & ~exclude_mask & ~exclude_mask_2

        low_saturation_pixels = blue_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = blue_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_blue = s_arr.copy()  # Create a copy of the saturation channel
        s_blue[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_blue[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value

        s_blue_img = Image.fromarray(s_blue, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_blue = Image.merge('HSV', (h, s_blue_img, v))  # Merge channels back together

        adjusted_image = image_hsv_blue.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_BlueLumColor', methods=['POST'])
def adjust_BlueLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        blue_color_value = int(request.json['BlueColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if blue_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif blue_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((blue_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        blue_mask = ((h_arr >= 150) & (h_arr <= 180))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_blue = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_blue[blue_mask] = np.clip(v_arr[blue_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_blue_img = Image.fromarray(v_blue.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_blue = Image.merge('HSV', (h, s, v_blue_img))  # Merge channels back together

        adjusted_image = image_hsv_blue.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_PurpulHueColor', methods=['POST'])
def adjust_PurpulHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        purpul_color_value = int(request.json['PurpulColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if purpul_color_value <= -100:
            target_hue = 180  # Set target hue to 75 (dark purpul)
        elif purpul_color_value >= 100:
            target_hue = 200  # Set target hue to 260 (maximum purpul with a pinish tint)
        else:
            target_hue = int(180 + ((200 - 180) / 200) * (purpul_color_value + 100))  # Map purpul_color_value to range [75, 260]

        purpul_mask = ((h_arr >= 180) & (h_arr <= 210))  # Define a mask for purpul pixels
        purpul_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the purpul pixels
        purpul_pixels[purpul_mask] = True  # Set the values of the purpul pixels to True

        h_purpul = h_arr.copy()  # Create a copy of the hue channel
        h_purpul[~purpul_pixels] = h_arr[~purpul_pixels]  # Set non-purpul pixels to their original hue value
        h_purpul[purpul_pixels] = target_hue  # Set hue value of purpul pixels to the target value
        h_purpul_img = Image.fromarray(h_purpul, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_purpul = Image.merge('HSV', (h_purpul_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_purpul.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_PurpulSatColor', methods=['POST'])
def adjust_PurpulSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        purpul_color_value = int(request.json['PurpulColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if purpul_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif purpul_color_value >= 100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        else:
            target_saturation_low = int(0 + ((255 - 0) / 200) * (purpul_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(0 + ((255 - 0) / 200) * (purpul_color_value + 100))  # Map pink_color_value to range [50, 255]


        purpul_mask = ((h_arr >= 180) | (h_arr <= 220))  # Define a mask for pink pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 180))  # Exclude green and blue color ranges
        exclude_mask_2 = ((h_arr >= 220) & (h_arr <= 360)) 
        purpul_mask = purpul_mask & ~exclude_mask & ~exclude_mask_2

        low_saturation_pixels = purpul_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = purpul_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_purpul = s_arr.copy()  # Create a copy of the saturation channel
        s_purpul[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_purpul[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value

        s_purpul_img = Image.fromarray(s_purpul, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_purpul = Image.merge('HSV', (h, s_purpul_img, v))  # Merge channels back together

        adjusted_image = image_hsv_purpul.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}

@app.route('/adjust_PurpulLumColor', methods=['POST'])
def adjust_PurpulLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        purpul_color_value = int(request.json['PurpulColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if purpul_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif purpul_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((purpul_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        purpul_mask = ((h_arr >= 180) & (h_arr <= 210))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_purpul = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_purpul[purpul_mask] = np.clip(v_arr[purpul_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_purpul_img = Image.fromarray(v_purpul.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_purpul = Image.merge('HSV', (h, s, v_purpul_img))  # Merge channels back together

        adjusted_image = image_hsv_purpul.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}




@app.route('/adjust_PinkHueColor', methods=['POST'])
def adjust_PinkHueColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        pink_color_value = int(request.json['PinkColorHueValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if pink_color_value <= -100:
            target_hue = 200  # Set target hue to 75 (purpul)
        elif pink_color_value >= 100:
            target_hue = 250  # Set target hue to 260 (maximum pink with a redish tint)
        else:
            target_hue = int(200 + ((250 - 200) / 200) * (pink_color_value + 100))  # Map  to range [75, 260]

        pink_mask = ((h_arr >= 210) & (h_arr <= 250))  # Define a mask for pixels
        pink_pixels = np.zeros(h_arr.shape, dtype=bool)  # Create a boolean array to store the pink pixels
        pink_pixels[pink_mask] = True  # Set the values of the pink pixels to True

        h_pink = h_arr.copy()  # Create a copy of the hue channel
        h_pink[~pink_pixels] = h_arr[~pink_pixels]  # Set non-pink pixels to their original hue value
        h_pink[pink_pixels] = target_hue  # Set hue value of pink pixels to the target value
        h_pink_img = Image.fromarray(h_pink, mode='L')  # Convert the modified hue array back to an Image object
        image_hsv_pink = Image.merge('HSV', (h_pink_img, s, v))  # Merge channels back together

        adjusted_image = image_hsv_pink.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_PinkSatColor', methods=['POST'])
def adjust_PinkSatColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        pink_color_value = int(request.json['PinkColorSatValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels
        h_arr = np.array(h)  # Convert h channel to a NumPy array
        s_arr = np.array(s)  # Convert s channel to a NumPy array

        if pink_color_value <= -100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        elif pink_color_value >= 100:
            target_saturation_low = 0  # Set target saturation to 50 (low saturation)
            target_saturation_high = 0
        else:
            target_saturation_low = int(0 + ((255 - 0) / 200) * (pink_color_value + 100))  # Map pink_color_value to range [50, 255]
            target_saturation_high = int(0 + ((255 - 0) / 200) * (pink_color_value + 100))  # Map pink_color_value to range [50, 255]

        pink_mask = ((h_arr >= 210) | (h_arr <= 250))  # Define a mask for pink pixels (adjust the hue range as needed)

        # Exclude other color ranges by setting their corresponding mask values to False
        exclude_mask = ((h_arr >= 0) & (h_arr <= 210))  # Exclude green and blue color ranges
        pink_mask = pink_mask & ~exclude_mask


        low_saturation_pixels = pink_mask & (s_arr <= 100)  # Mask for pixels with low saturation
        high_saturation_pixels = pink_mask & (s_arr > 100)  # Mask for pixels with high saturation

        s_pink = s_arr.copy()  # Create a copy of the saturation channel
        s_pink[low_saturation_pixels] = target_saturation_low  # Set low saturation pixels to the target low saturation value
        s_pink[high_saturation_pixels] = target_saturation_high  # Set high saturation pixels to the target high saturation value

        s_pink_img = Image.fromarray(s_pink, mode='L')  # Convert the modified saturation array back to an Image object
        image_hsv_pink = Image.merge('HSV', (h, s_pink_img, v)) 

        adjusted_image = image_hsv_pink.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}



@app.route('/adjust_PinkLumColor', methods=['POST'])
def adjust_PinkLumColor():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        pink_color_value = int(request.json['PinkColorLumValue'])
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)

        image = Image.open(image_path)
        image_hsv = image.convert('HSV')  # Convert to HSV color space
        h, s, v = image_hsv.split()  # Split into individual channels

        h_arr = np.array(h)  # Convert h channel to a NumPy array

        if pink_color_value <= -100:
            luminosity_adjustment = -50  # Set luminosity adjustment to -100 (make color darker)
        elif pink_color_value >= 100:
            luminosity_adjustment = 50  # Set luminosity adjustment to 100 (make color lighter)
        else:
            luminosity_adjustment = int(-50 + ((pink_color_value + 50) / 200) * 200)  # Map pink_color_value to range [-100, 100]

        pink_mask = ((h_arr >= 210) & (h_arr <= 250))  # Define a mask for pink pixels

        v_arr = np.array(v)  # Convert v channel to a NumPy array
        v_pink = v_arr.copy()  # Create a copy of the value channel for pink pixels
        # Calculate the luminosity adjustment factor based on the adjustment value
        luminosity_factor = 1 + (luminosity_adjustment / 100)

        # Apply the luminosity adjustment to the pink pixels
        v_pink[pink_mask] = np.clip(v_arr[pink_mask] * luminosity_factor, 0, 255)  # Adjust the luminosity based on the adjustment value

        # Create new value channel with adjusted luminosity for pink pixels
        v_pink_img = Image.fromarray(v_pink.astype(np.uint8), mode='L')  # Convert the modified value array back to an Image object

        image_hsv_pink = Image.merge('HSV', (h, s, v_pink_img))  # Merge channels back together

        adjusted_image = image_hsv_pink.convert('RGB')
        adjusted_image.save(new_image_path)
        img_base64 = base64.b64encode(image.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/download/<filename>', methods=['GET', 'POST'])
def download_file(filename):
        if request.method == 'POST':
            new_filename_html = request.form.get('image_name')
            filename = new_filename_html
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if file_path == '':
                raise ResourceNotFoundError("Image Resource could not be retuned")  
            if file_path != '':
                new_filename = request.form.get('textfilename')
                image_format = request.form.get('image_format_selector').lower()
                image_quality = request.form.get('image_quality_selector')
                image_dpi = request.form.get('image_dpi_selector')
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
                dpi =  int(image_dpi.strip('dpi'))
                output_img = result_image.save(output_path, quality=new_quality, dpi=(dpi, dpi))
            else:
                raise ResourceNotFoundError("Image Resource could not be retuned")  
        return send_file(output_path, output_img, as_attachment=True)




if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=5001)
