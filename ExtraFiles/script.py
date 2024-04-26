import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import uuid
from time import strftime, sleep

def check_for_uuid():
    file_path = "uuid.txt"
    if not os.path.exists(file_path):
        unique_id = str(uuid.uuid4())
        with open(file_path, "w") as file:
            file.write(unique_id)
            print(f"new UUID created and saved to: {file_path}")
        return unique_id
    else:
        with open(file_path, 'r') as file:
            existing_uuid = file.read()
            print(f"Existing UUID found in file: {existing_uuid}")
            return existing_uuid

uuid = check_for_uuid()

ser = serial.Serial('/dev/ttyACM0', 9600)

cred = credentials.Certificate('./account.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

while True:
    sleep(5)
    incoming_data = ser.readline().decode('utf-8').strip()
    if incoming_data:
        datetime = strftime('%d/%m/%y %H:%M:%S')
        data = {
            "date": datetime,
            "depth": incoming_data
        }
        try:
            collection_name = datetime.replace('/','-').replace(',','').replace(' ', '_').replace(':','-')
            db.collection('devices').document(uuid).update({"data":firestore.ArrayUnion([data])})
            print(f'Sending {data} to firestore')
        except Exception as e:
            print(e)
            db.collection('devices').document(uuid).set([])
            print('attempting to create a document')