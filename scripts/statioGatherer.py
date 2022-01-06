import urllib.request
from pprint import pprint
from html_table_parser.parser import HTMLTableParser
import mechanicalsoup
import csv
import json


def get_station_list():
    browser = mechanicalsoup.StatefulBrowser()
    file1 = open("./allStations.txt", "w")
    url = "https://en.wikipedia.org/wiki/List_of_Delhi_Metro_stations"
    browser.open(url)
    page = browser.get_current_page()
    for i in range(1, 254):
        station = page.find_all("table")[1].find_all("tr")[i].find_all("td")[0].text
        station = station.replace("\n", "")
        station = station.replace(" ", "_")
        station = "https://en.wikipedia.org/wiki/{}_metro_station".format(station)
        file1.write(station + "\n")


def url_get_contents(url):
    req = urllib.request.Request(url=url)
    f = urllib.request.urlopen(req)
    return f.read()


def get_station_coordinates():
    file1 = open("./stationCoordinates.txt", "w")
    with open("./allStations.txt") as f:
        for line in f:
            line = line.replace("\n", "")
            xhtml = url_get_contents(line).decode("utf-8")
            p = HTMLTableParser()
            p.feed(xhtml)
            table = p.tables
            coords = ""
            for i in range(0, len(table)):
                if table[i][0][0] != "":
                    station = table[i][0]
                    for j in range(0, len(table[i])):
                        if table[i][j][0].lower() == "coordinates":
                            coords = str(p.tables[i][j][1].split(" / ")[-1].split("; "))
                            break
                    break
            coords = coords.split("', '")
            coords[0] = coords[0][2:]
            coords[-1] = coords[-1][:-3]
            finalString = station[0] + "," + coords[0] + "," + coords[1]
            try:
                file1.write(finalString + "\n")
            except:
                print(finalString)
                print("\n")


def get_station_info():
    xhtml = url_get_contents(
        "https://en.wikipedia.org/wiki/List_of_Delhi_Metro_stations"
    ).decode("utf-8")
    p = HTMLTableParser()
    p.feed(xhtml)

    file1 = open("./stationLineElevation.txt", "w")

    for i in range(0, len(p.tables[1])):
        stat = p.tables[1][i][0] + "," + p.tables[1][i][1] + "," + p.tables[1][i][3]
        file1.write(stat + "\n")


def append_coordinate_info():
    fileFinal = open("./stationInfoCoords.txt", "w")
    with open("stationLineElevation.txt") as f:
        for i in f:
            statName1 = i.split(",")[0]
            with open("./stationCoordinates.txt") as f2:
                for j in f2:
                    statName2 = j.split(",")[0]
                    if statName1 == statName2:
                        i = i.replace("\n", " ")
                        j = j.replace("\n", "")
                        fileFinal.write(
                            i[:-1]
                            + ","
                            + j.split(",")[1]
                            + ","
                            + j.split(",")[2]
                            + "\n"
                        )
                        break


def final_complie():
    fileFinal = open("./final.txt", "w")
    with open("stations.txt") as f:
        for i in f:
            with open("./stationInfoCoords.txt") as f2:
                for j in f2:
                    bruh1 = i[4:]
                    bruh1 = bruh1.replace("\n", "")
                    bruh2 = j.split(",")[0]
                    if bruh1 == bruh2:
                        j = j.replace("\n", "")
                        fileFinal.write(j + "," + i[:4] + "\n")
                        break


def notSame():
    count = 0
    bruh = ""
    with open("./stations.txt") as f:
        for i in f:
            bruh = i
            i = int(i.split(" ")[0])
            flag = 0
            bing = 0
            with open("./final.txt") as f2:
                for j in f2:
                    j = int(j.split(",")[-1])
                    if j == i:
                        flag = 1
                        break
            if flag == 0:
                print(bruh)
                count += 1
    print(count)


def get_weights():
    stationRows = []
    stationFields = []
    with open("./scripts/final.csv") as f:
        csvreader = csv.reader(f)
        stationFields = next(csvreader)
        for row in csvreader:
            stationRows.append(row)

    timeRows = []
    timeFields = []
    with open("./scripts/times.csv") as f:
        csvreader = csv.reader(f)
        timeFields = next(csvreader)
        for row in csvreader:
            timeRows.append(row)

    file1 = open("weights.txt", "w")
    for row in stationRows:
        fromStation = int(row[5])
        final = ""
        for row2 in timeRows:
            one = int(row2[0])
            two = int(row2[1])
            if fromStation == one:
                final += "[" + row2[1] + ":" + row2[2] + "] "
            if fromStation == two:
                final += "[" + row2[0] + ":" + row2[2] + "] "
        file1.write(final + "\n")
        print(final)


def append_weights():
    with open("./scripts/weights.csv", "r") as weight, open(
        "./scripts/final.csv", "r"
    ) as station, open("result.csv", "w") as result:
        weight_reader = csv.reader(weight)
        station_reader = csv.reader(station)
        result = csv.writer(result)
        result.writerows(x + y for x, y in zip(station_reader, weight_reader))


def toJSON():
    data = {}
    with open("./scripts/result.csv") as f:
        csvreader = csv.DictReader(f)
        for row in csvreader:
            key = int(row["id"])
            data[key] = row
    with open("./scripts/data.json", "w", encoding="utf-8") as jsonf:
        jsonf.write(json.dumps(data, indent=4))


toJSON()