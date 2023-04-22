import schedule
import time
import os
from systemPath import UPLOAD_FOLDER

def remove_images():
    directory = UPLOAD_FOLDER
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
            os.remove(os.path.join(directory, filename))

schedule.every(72).hours.do(remove_images)

while True:
    schedule.run_pending()
    time.sleep(1)
