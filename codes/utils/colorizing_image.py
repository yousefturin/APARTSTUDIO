
import torch

import utils.deoldify_path as deoldify_path
from DeOldify.deoldify import device
from DeOldify.deoldify._device import DeviceId
from DeOldify.deoldify.visualize import get_image_colorizer


device.set(device=DeviceId.GPU1)



def colorize_image(image_path):

    print("PyTorch version:", torch.__version__)
    print("CUDA version:", torch.version.cuda)
    print("Device used:", device)
    colorizer = get_image_colorizer(artistic=True)
    # Create the colorizers
    render_factor = 35
    colorizer.plot_transformed_image(path=image_path, render_factor=render_factor, compare=False, watermarked=False)
    return 