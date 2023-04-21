import tensorflow as tf

# Define the model architecture
def deep_image_prior(input_shape):
    inputs = tf.keras.layers.Input(shape=input_shape)
    conv1 = tf.keras.layers.Conv2D(64, 3, activation='relu', padding='same')(inputs)
    conv2 = tf.keras.layers.Conv2D(64, 3, activation='relu', padding='same')(conv1)
    conv3 = tf.keras.layers.Conv2D(64, 3, activation='relu', padding='same')(conv2)
    conv4 = tf.keras.layers.Conv2D(64, 3, activation='relu', padding='same')(conv3)
    conv5 = tf.keras.layers.Conv2D(64, 3, activation='relu', padding='same')(conv4)
    output = tf.keras.layers.Conv2D(3, 3, padding='same')(conv5)
    model = tf.keras.models.Model(inputs=inputs, outputs=output)
    return model


model = deep_image_prior(input_shape=(None, None, 3))
model.load_weights('dip_weights.h5')


import cv2
import numpy as np
from flask import Flask, request, make_response

app = Flask(__name__)

@app.route('/deblur', methods=['POST'])
def deblur_image():
    # Load the image from the request
    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Deblur the image using the Deep Image Prior model
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    deblurred = model.predict(np.expand_dims(blurred, axis=0))[0]

    # Encode the deblurred image as JPEG and return it in the response
    ret, jpeg = cv2.imencode('.jpg', deblurred)
    response = make_response(jpeg.tobytes())
    response.headers['Content-Type'] = 'image/jpeg'
    return response
