import torch
from torchvision import transforms
from torchvision.models.segmentation import deeplabv3_resnet101
from PIL import Image
import numpy as np
import base64
import io
from utils.systemPath import *
def segment_image(image_path, new_result_path):
    device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
    print("PyTorch version:", torch.__version__)
    print("CUDA version:", torch.version.cuda)
    print("Device used:", device)

    # Load the pre-trained DeepLabV3+ model
    model = deeplabv3_resnet101(pretrained=False)  # Set pretrained to False
    state_dict = torch.load(MODEL_PATH_BG, map_location=device)
    filtered_state_dict = {k: v for k, v in state_dict.items() if k in model.state_dict()}
    model.load_state_dict(filtered_state_dict)

    # Move the model to the appropriate device
    model = model.to(device)

    # Set the model in evaluation mode
    model.eval()
    # Load and preprocess the input image
    image = Image.open(image_path)
    image = image.convert("RGB")

    # Store the original image size
    original_size = image.size

    preprocess = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    # Resize the input image to the original size
    resized_image = preprocess(image)
    resized_image = resized_image.unsqueeze(0).to(device)

    # Perform semantic segmentation using the model
    with torch.no_grad():
        output = model(resized_image)['out'][0]
    output_predictions = output.argmax(0).byte().cpu().numpy()

    human_class = 15  # COCO dataset class index for person

    # Generate a foreground mask for human
    foreground_mask = (output_predictions == human_class)  # Assuming class 0 corresponds to the background
    foreground_mask = np.uint8(foreground_mask) * 255

    # Resize the foreground mask to match the size of the original image
    foreground_mask = Image.fromarray(foreground_mask, mode='L').resize(original_size)

    # Apply the mask to the original image
    image = image.copy()
    image.putalpha(foreground_mask)
    print("new path in segment:", new_result_path)
    image.save(new_result_path)
    return 