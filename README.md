# APART STUDIO - Web Image Editor

It's a web application written in Python using the Flask framework and it allows users to editor images where users can upload their pictures and edit them using different tools and methods that the program provides.

## Table of Contents
- [APART STUDIO - Web Image Editor](#apart-studio---web-image-editor)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Screenshots/Demo](#screenshotsdemo)
      - [Colorizing Image Screenshots](#colorizing-image-screenshots)
      - [Remove Background Screenshots](#remove-background-screenshots)
  - [Technologies Used](#technologies-used)
  - [Models Used](#models-used)
  - [Features](#features)
  - [Contributing](#contributing)
  - [Roadmap/Future Development](#roadmapfuture-development)
  - [Author](#author)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Installation
To install the necessary dependencies, follow these steps:

**1.Clone the APARTSTUDIO repository from GitHub:**

    `git clone https://github.com/yousefturin/APARTSTUDIO.git`

**2.Navigate to the project directory:**

    `cd APARTSTUDIO/codes`

**3.Create a virtual environment**(optional but recommended):

    `python3 -m venv env`

- On macOS/Linux:

    `source env/bin/activate`
- On Windows:

    `env\Scripts\activate`

**4.Install the required Python packages:**

    `pip install -r requirements.txt`

**5.Download the pre-trained models:**

- Model 1: **ColorizeArtistic_gen** 

Download the ColorizeArtistic_gen model from [[model_link_1](https://drive.google.com/file/d/1zflvwQIiMjuOCB5DVWEU-e-4KtC7OeVP/view?usp=sharing)].
Extract the downloaded file and place it in the directory.

    `APARTSTUDIO/codes/models/ColorizeArtistic_gen`

- Model 2: **deeplabv3_resnet101_coco-586e9e4e** 

Download the deeplabv3_resnet101_coco-586e9e4e model from [[model_link_2](https://drive.google.com/file/d/1Yx63QqZqIiJaTrMGamPJR0fSKRbao4An/view?usp=sharing)].
Extract the downloaded file and place it in the directory.

    `APARTSTUDIO/codes/models/deeplabv3_resnet101_coco-586e9e4e` 

- Model 3: **RRDB_ESRGAN_x4** Model

Download the RRDB_ESRGAN_x4 model from [[model_link_3](https://drive.google.com/file/d/12O_3vsUi-AQcgk999kJ6bmMD3ylmlhqI/view?usp=sharing)].
Extract the downloaded file and place it in the directory.

    `APARTSTUDIO/codes/models/RRDB_ESRGAN_x4` 

## Screenshots/Demo

![Screenshot 2023-06-13 164355](https://github.com/yousefturin/APARTSTUDIO/assets/94796673/7df539fc-2b68-4bf6-8b72-357506c0a158)

#### Colorizing Image Screenshots

<div style="display:flex;">
  <img src="https://github.com/yousefturin/APARTSTUDIO/assets/94796673/f309ca57-cce0-4a3a-90cf-ddc236221f17" alt="237668461-9ea8c110-43a3-48ee-9f96-37af6926fdd3" width="400" />
  <img src="https://github.com/yousefturin/APARTSTUDIO/assets/94796673/afb2810e-9c2f-45c5-bdb2-6c976e16e919" alt="237668259-1f8cb417-3be3-4622-92ed-4972eb2c2a19" width="400" />
</div>


#### Remove Background Screenshots
<div style="display:flex;">
  <img src="https://github.com/yousefturin/APARTSTUDIO/assets/94796673/9040561d-d462-444c-ac39-0fd0188890b2" alt="brooke-cagle-NoRsyXmHGpI-unsplash" width="400" />
  <img src="https://github.com/yousefturin/APARTSTUDIO/assets/94796673/65bfde51-1b3d-43c0-b063-6e1f8a3e27a8" alt="brooke-cagle-NoRsyXmHGpI-unsplash-7891" width="400" />
</div>

## Technologies Used
This project utilizes the following technologies and dependencies:

- [torch](https://pytorch.org/): A machine learning framework for image processing.
- [Flask](https://flask.palletsprojects.com/): A lightweight web framework for building the backend server.
- [Werkzeug](https://werkzeug.palletsprojects.com/): A utility library for handling HTTP requests and responses.
- [OpenCV](https://opencv.org/): A computer vision library for image processing.
- [NumPy](https://numpy.org/): A library for numerical computations in Python.
- [arch](https://arch.readthedocs.io/): A library for econometric modeling.
- [PIL (Python Imaging Library)](https://pillow.readthedocs.io/): A library for image processing in Python.
- Other dependencies: `os`, `base64`

The project also utilizes the following external API:

- [DiceBear Avatars API](https://avatars.dicebear.com/): An API for generating avatars dynamically using the avataaars style. The API endpoint used: `https://avatars.dicebear.com/api/avataaars/${randomSeed}.svg`
## Models Used
This project incorporates the following models for image processing:

- DeOldify: A deep learning model for colorizing black and white images.
   (https://github.com/jantic/DeOldify)
- ESRGAN: Enhanced Super-Resolution Generative Adversarial Networks, used for enhancing image quality.
    (https://github.com/xinntao/ESRGAN)
- resnet101: A deep learning model, specifically the resnet101 architecture, used for background removal.    
    (https://github.com/pytorch/vision/blob/main/torchvision/models/segmentation/deeplabv3.py)



## Features
- Histogram Visualization
- Fix White-balance
- Fix Exposure
- Fix Contrast
- Fix Highlights
- Fix Shadows
- Fix White
- Fix Black
- Add Texture
- Add Clarity
- Add Dehaze
- Set Vibrance
- Set Saturation
- Clip The colors "Red/Orange/Yellow/Green/Sky-Blue/Blue/Purple/Pink" and Adjust (Hue, Saturation, Luminance)
- Add text and customize it with (Font size, Rotation, Color, Font Type and Font View) 
- Add Blur
- Add Grin
- Crop The Image 
- Resize the image using **SCALORBUST**
- Colorize images using **DeOldif** model
- Enhance images using **ESRGAN** model
- Remove Background using **deeplabv3_resnet101** model
- Download The image in any Quality (100%, 75%, 50%, 25%). Any format (.jpg, .jpeg, .png). Any DPI(300dpi, 150dpi, 96dpi, 72dpi)
- Share The image on any platform with one click
## Contributing
We welcome contributions from the community to help improve APARTSTUDIO. If you encounter any bugs, visual problems, or non-responsive issues, or if you have ideas on making the website better, we would appreciate your input and assistance.

To contribute to the project, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your contributions: `git checkout -b your-branch-name`.
3. Make your desired changes and improvements.
4. Test your changes thoroughly.
5. Commit your changes with a descriptive commit message: `git commit -m "Add your message here"`.
6. Push your changes to your forked repository: `git push origin your-branch-name`.
7. Open a pull request in this repository, describing your changes and contributions.

We appreciate your efforts in helping to make APARTSTUDIO a better web image editor. Thank you for your contributions!

If you have any questions or need further assistance, please feel free to reach out to us.

## Roadmap/Future Development

**Mobile-Friendly Website:** Our primary focus is to optimize the website for mobile devices and tablets. We aim to make APARTSTUDIO accessible and user-friendly across multiple platforms, ensuring a seamless experience for users on laptops, desktops, and mobile devices.

**Enhanced Performance and User Experience:** We plan to revamp the architecture for handling XMLHttpRequests to improve overall performance and responsiveness. By leveraging JavaScript for event handling and dynamically updating the user interface, we aim to minimize delays and provide a smoother user experience.

**Text-to-Image Generation with OpenAI DALL·E:** As part of our future development, we're excited to integrate OpenAI DALL·E into APARTSTUDIO. This powerful model allows users to generate images based on text descriptions, expanding the creative possibilities of our web image editor.

**Database and User Authentication Improvements:** We acknowledge the importance of database security and user authentication. Currently, we have implemented the login/logout functionality, but without any authentication mechanisms. To address this, we are actively working on enhancing our database and implementing robust user authentication features to ensure the privacy and security of our users' data.

These updates will significantly enhance APARTSTUDIO by addressing the mobile responsiveness, improving performance, and introducing a cutting-edge feature for text-to-image generation. We value user feedback and strive to create a robust and user-friendly platform for image editing.
## Author
- [yousefturin](https://github.com/yousefturin)

## License
This project is licensed under the terms of the APACHE License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
This project makes use of the following external resources and models:

- Colorize images using the **DeOldify** model:
  - [jantic/DeOldify](https://github.com/jantic/DeOldify)

- Enhance images using the **ESRGAN** model:
  - [xinntao/ESRGAN](https://github.com/xinntao/ESRGAN)

- Remove Background using the **deeplabv3_resnet101** model:
  - [pytorch/vision](https://github.com/pytorch/vision/blob/main/torchvision/models/segmentation/deeplabv3.py)





















































