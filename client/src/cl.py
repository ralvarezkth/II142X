import requests
from threading import Timer

id = 3
timer_interval = 5.0

def hello():
  x = requests.put('http://localhost:3001/api/student/' + str(id) + '/ping')
  
  if x.status_code == 200:
    print("OK")
  else:
    print("Error: " + str(x.status_code))

  timer = Timer(timer_interval, hello)
  timer.start()

hello()
