import json
from datetime import date
from flask import Flask
from flask import request, make_response, jsonify

app = Flask(__name__)

@app.route('/addExpected/<d>', methods=["POST"])
def addExpected(d):
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()


    #d = {"Netflix" : 9, "Work" : 8, "Sleep" : 7}
    d = json.loads(d)

    def convertToProportions(d):
        for entry in d:
            d[entry] = int(d[entry]) / 24
    convertToProportions(d)

    new_dict = {"Date" : str(date.today()), "name" : "expected", "values" : d}
    jsonObject.append(new_dict)
    print(jsonObject)
    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return _corsify_actual_response(jsonify({'yoyoyo my name is joe': 200}))

# f = open("test2.json", "w")
# json.dump(d, f)
# f.close()


def read_expected():
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()

    date1 = str(date.today())

    for i in range(len(jsonObject)):
        if jsonObject[i]["Date"] == date1:
            result = []
            for j in jsonObject[i]["values"]:
                result.append(j)
            return result
    return []

print(read_expected())

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
