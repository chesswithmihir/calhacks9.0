import json
from datetime import date

with open("test.json") as jsonFile:
    jsonObject = json.load(jsonFile)
    jsonFile.close()

#print(jsonObject[0]["Date"])

# print("Today date is " + str(date.today()))

def calculate_tvd(date):
    """
    Do not call this function on a day where the json does not have both
    the expected and the actual values.
    """
    for i in range(len(jsonObject)):
        if jsonObject[i]["Date"] == date:
            expected_values = (jsonObject[i]["values"])
            actual_values = (jsonObject[i + 1]["values"])
            expected_distribution = []
            actual_distribution = []
            for entry in expected_values:
                expected_distribution.append(expected_values[entry])
            for entry in actual_values:
                actual_distribution.append(actual_values[entry])

            total = 0
            for i in range(len(expected_distribution)):
                total += abs(expected_distribution[i] - actual_distribution[i])
            return 0.5 * total
print(calculate_tvd("2022-10-16"))


    # for i in jsonObject:
    #     values = i["values"]
    #     print(values)
    #     total = 0
    #     for entry in values:
    #         (values[entry])
    #
    #     print("\n")
