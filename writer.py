import json
from datetime import date
from flask import Flask
from flask import request, make_response, jsonify

app = Flask(__name__)

@app.route('/readExpected/', methods=["POST"])
def read_expected():
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
    date1 = str(date.today())
    for i in range(len(jsonObject)):
        if jsonObject[i]["Date"] == date1:
            result = []
            for j in jsonObject[i]["values"]:
                result.append(j)
            return _corsify_actual_response(jsonify(result))
    return _corsify_actual_response(jsonify([]))

@app.route('/addExpected/<d>', methods=["POST"])
def addExpected(d):
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()


    #d = {"Netflix" : 9, "Work" : 8, "Sleep" : 7}
    d = json.loads(d)

    # def convertToProportions(d):
    #     total_hours = 0
    #     for entry in d:
    #         total_hours += int(d[entry])
    #     for entry in d:
    #         d[entry] = int(d[entry]) / total_hours
    # convertToProportions(d)

    for entry in d:
        d[entry] = int(d[entry])

    new_dict = {"Date" : str(date.today()), "name" : "expected", "values" : d}
    jsonObject.append(new_dict)
    print(jsonObject)
    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return _corsify_actual_response(jsonify({'yoyoyo my name is joe': 200}))

@app.route("/addActual/<d>", methods=["POST"])
def addActual(d):
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()

    d = json.loads(d)

    for entry in d:
        d[entry] = int(d[entry])

    # today's actual not in json
    if (jsonObject[-1]["name"] == "actual"):
        # def convertToProportions(d):
        #     for entry in d:
        #         for name in jsonObject[-1]["values"]:
        #             jsonObject[-1]["values"][name]
        #         d[entry] = int(d[entry]) / 24
        # convertToProportions(d)


        # remove last element of list
        jsonObject.pop()
    new_dict = {"Date" : str(date.today()), "name" : "actual", "values" : d}
    jsonObject.append(new_dict)
    print(jsonObject)
    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return _corsify_actual_response(jsonify({'yoyoyo my name is BILL': 200}))



def read_actual():
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
    if jsonObject[-1]["name"] == "actual" and str(date.today() == jsonObject[-1]["Date"]):
        return jsonObject[-1]["values"]
    return {}



def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
