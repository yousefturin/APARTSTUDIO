def fetching_image(image, filename, image_format, quality, name):
    ext_image = os.path.splitext(filename)
    # getting the fist part of the folder name
    prefix1 = ext_image[0]
    # getting the second part of the folder name
    extension1 = ext_image[1]
    prefix = prefix1
    extension = extension1
    prefix = name
    extension = image_format
    filename_prefix_ex = f'{"NoT_PHTOTSHOP_"}{prefix}{extension}'   
    root_path = os.path.join(app.config['UPLOAD_FOLDER'], filename_prefix_ex)
    # save the new filename
    save_path = os.path.join(root_path)
    output_image = image.save(save_path)
    return output_image



@app.route('/download/<filename>/', methods=['POST'])
def download_image(filename, image):
        try:
            if request.method == 'POST':
                name = request.form['textfilename']
                image_format = request.files['image_format_selector'] 
                quality = int(request.form['image_quality_selector'].rstrip('%')) / 100
                if 'image_format_selector' not in request.form and 'image_quality_selector' not in request.form:
                   return fetching_image(image, filename, image_format, quality,name)
                else:
                     return  
                     

            return send_from_directory(app.config['UPLOAD_FOLDER'],
                filename, as_attachment =True)
        except:
                raise ResourceNotFoundError("Image Resource not found")
        



        @app.route('/adjust_contrast/<filename>', methods=['GET', 'POST'])
def adjust_contrast(filename):
    # Get the slider value from the form data
    contrast = float(request.form['CONT'])
    contrast = (contrast / 100) + 1.0
    # Get the image path from the form data
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    new_filename = filename
    new_filename =secure_filename(new_filename)
    print("2",new_filename)
    root_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
    # Open the image and apply contrast adjustment
    with Image.open(image_path) as img:
        # Apply contrast adjustment
        enhancer = ImageEnhance.Contrast(img)
        img_contrast = enhancer.enhance(contrast)
        # Save the edited image
        img_contrast.save(root_path)
    # Return the edited image
    return render_template('main.html', filename=new_filename)



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
        # Convert the image to LAB color space
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        # Compute the tint color based on the input value
        if tint_value > 0:
            tint = np.array([0, tint_value/150*128, 128], dtype=np.float64).reshape(1, 1, 3)
        elif tint_value < 0:
            tint = np.array([tint_value/-150*128, 128, 0], dtype=np.float64).reshape(1, 1, 3)
        else:
            tint = np.array([128, 128, 128], dtype=np.float64).reshape(1, 1, 3)
    
        # Apply the tint color to the image
        result = cv2.add(lab, tint)
        # Convert the result back to BGR color space
        result = cv2.cvtColor(result, cv2.COLOR_LAB2BGR)
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}


@app.route('/adjust_temp', methods=['POST'])
def adjust_tint():
    if request.method == 'POST':
        image_name = request.json['imageName']
        new_image_name = request.json['newImageName']
        temp_value = int(request.json['tempValue'])
        min_temp = int(2000)
        max_temp = int(50000)
        print(temp_value)
        # Calculate the scale factors for blue and yellow channels
        if temp_value >= 26000:
            blue_scale = 1.0
            yellow_scale = (temp_value - min_temp) / (26000 - min_temp)
        else:
            blue_scale = (max_temp - temp_value) / (max_temp - 26000)
            yellow_scale = 1.0
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        new_image_path = os.path.join(app.config['UPLOAD_FOLDER'], new_image_name)
        image = cv2.imread(image_path)
        # Map the blue and yellow channels to the temperature range
        blue_channel = np.interp(image[:,:,0], [0, 255], [min_temp, max_temp])
        yellow_channel = np.interp(image[:,:,1], [0, 255], [min_temp, max_temp])
        # Scale the blue and yellow channels according to the desired temperature
        balanced_blue_channel = np.interp(blue_channel, [min_temp, max_temp], [0, 255]) * blue_scale
        balanced_yellow_channel = np.interp(yellow_channel, [min_temp, max_temp], [0, 255]) * yellow_scale
        # Create the balanced image by combining the scaled blue and yellow channels with the original green channel
        balanced_img = np.stack((balanced_blue_channel, balanced_yellow_channel, image[:,:,2]), axis=-1).astype(np.uint8)
        # Convert the balanced image from BGR to RGB format
        balanced_img = cv2.cvtColor(balanced_img, cv2.COLOR_BGR2RGB)
        # Converting the  image name
        result = balanced_img
        # Saving the adjusted image to the new file path
        cv2.imwrite(new_image_path, result)
        img_base64 = base64.b64encode(result.tobytes()).decode('utf-8')
    # Return the edited image as a JSON object with the new file name
    return {'image': img_base64, 'newImageName': new_image_name}, 200, {'Content-Type': 'application/json'}