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
            return _corsify_actual_response(jsonify(jsonObject[i]["values"]))
    return _corsify_actual_response(jsonify({}))



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
    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return _corsify_actual_response(jsonify({'yoyoyo my name is joe': 200}))


# points system
# if it is going down

def calculate_points(tvd):
    if tvd <= 0.1:
        return 100
    elif tvd <= 0.15:
        return 75
    elif tvd <= 0.2:
        return 50
    elif tvd <= 0.25:
        return 25
    elif tvd <= .5:
        return 15
    elif tvd <= .9:
        return 5
    else:
        return 0

@app.route('/findTotalScore/', methods=["POST"])
def find_total_score():
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()

    total = 0
    prev = 0
    multiplier = 0
    for i in range(len(jsonObject)):
        if jsonObject[i]["name"] == "actual":
            curr = jsonObject[i]["points"]
            if curr >= prev:
                total += (multiplier + 1) * curr
                multiplier += 1
            else:
                total += curr
                multipler = 0
            prev = curr
    return _corsify_actual_response(jsonify({'total': total}))

def calculate_TVD():
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
    expected_values = (jsonObject[-2]["values"])
    actual_values = (jsonObject[-1]["values"])
    expected_distribution = []
    actual_distribution = []

    s_e = sorted(expected_values.keys(), key=lambda x:x.lower())
    for entry in s_e:
        expected_distribution.append(expected_values[entry])
    expected_sum = sum(expected_distribution)
    for i in range(len(expected_distribution)):
         expected_distribution[i] /= expected_sum

    s_a = sorted(actual_values.keys(), key=lambda x:x.lower())
    for entry in s_a:
        actual_distribution.append(actual_values[entry])
    actual_sum = sum(actual_distribution)
    for i in range(len(actual_distribution)):
        actual_distribution[i] /= actual_sum

    total = 0
    for i in range(len(expected_distribution)):
        total += abs(expected_distribution[i] - actual_distribution[i])
    tvd_result = 0.5 * total

    myObj = jsonObject[-1].copy()
    myObj["TVD"] = tvd_result

    jsonObject.pop()
    jsonObject.append(myObj)

    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return tvd_result


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
    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()
    x = calculate_TVD()
    points = calculate_points(x)

    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()

    myObj = jsonObject[-1].copy()
    myObj["points"] = points

    jsonObject.pop()
    jsonObject.append(myObj)

    f = open("test.json", "w")
    json.dump(jsonObject, f)
    f.close()

    return _corsify_actual_response(jsonify({'yoyoyo my name is BILL': 200}))

@app.route('/readActual/', methods=["POST"])
def read_actual():
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
    if jsonObject[-1]["name"] == "actual" and str(date.today() == jsonObject[-1]["Date"]):
        return _corsify_actual_response(jsonify(jsonObject[-1]["values"]))
    return _corsify_actual_response(jsonify({}))



@app.route('/readTVD/', methods=["POST"])
def read_TVD():
    _build_cors_preflight_response()
    with open("test.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()


    if len(jsonObject) == 0:
        return _corsify_actual_response(jsonify({'TVD': -1.0}))
    elif jsonObject[-1]["name"] == "expected":
        return _corsify_actual_response(jsonify({'TVD': -1.0}))
    else:
        return _corsify_actual_response(jsonify({'TVD': jsonObject[-1]["TVD"]}))


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
