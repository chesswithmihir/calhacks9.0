import json
from datetime import date
from flask import Flask

app = Flask(__name__)

@app.route('/addExpected/<d>', methods=["POST"])
def addExpected(d):
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()


    # d = {"Netflix" : 9, "Work" : 8, "Sleep" : 7}

    def convertToProportions(d):
        for entry in d:
            d[entry] = d[entry] / 24
    convertToProportions(d)
    #print(d)

    new_dict = {"Date" : str(date.today()), "name" : "expected", "values" : d}
    jsonObject.append(new_dict)
    print(jsonObject)
    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return 'yoyoyo my name is joe'

# f = open("test2.json", "w")
# json.dump(d, f)
# f.close()
