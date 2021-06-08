import requests
from threading import Timer

id = 3

def hello():
  x = requests.put('http://localhost:3001/api/student/' + str(id) + '/ping')
  
  if x.status_code == 200:
    print("OK")
  else:
    print("Error: " + str(x.status_code))

  timer = Timer(5.0, hello)
  timer.start()

hello()
