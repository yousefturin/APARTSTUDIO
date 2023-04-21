from flask import Flask, request, jsonify
import numpy as np
from keras.models import Sequential
from keras.layers import Conv2D

app = Flask(__name__)

@app.route("/colorize", methods=["POST"])
def colorize():
    # Load the grayscale image from the request
    img_gray = np.array(request.json["image"])

    # Define the model architecture (same as above)
    model = Sequential()
    model.add(Conv2D(64, (3,3), activation='relu', padding='same', input_shape=(None,None,1)))
    model.add(Conv2D(32, (3,3), activation='relu', padding='same'))
    model.add(Conv2D(2, (3,3), activation='tanh', padding='same'))
    # Load the pre-trained weights (same as above)
    model.load_weights("colorization_weights.h5")
    # Generate the colorized image
    img_color = model.predict(np.expand_dims(img_gray,axis=0))[0]

    # Return the colorized image as a JSON response
    return jsonify({"image": img_color.tolist()})