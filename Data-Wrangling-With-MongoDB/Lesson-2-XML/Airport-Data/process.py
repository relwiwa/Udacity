#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Let's assume that you combined the code from the previous 2 exercises with code
from the lesson on how to build requests, and downloaded all the data locally.
The files are in a directory "data", named after the carrier and airport:
"{}-{}.html".format(carrier, airport), for example "FL-ATL.html".

The table with flight info has a table class="dataTDRight". Your task is to
extract the flight data from that table as a list of dictionaries, each
dictionary containing relevant data from the file and table row. This is an
example of the data structure you should return:

data = [{"courier": "FL",
         "airport": "ATL",
         "year": 2012,
         "month": 12,
         "flights": {"domestic": 100,
                     "international": 100}
        },
         {"courier": "..."}
]

Note - year, month, and the flight data should be integers.
You should skip the rows that contain the TOTAL data for a year.

There are couple of helper functions to deal with the data files.
Please do not change them for grading purposes.
All your changes should be in the 'process_file' function.
"""
from bs4 import BeautifulSoup

file = "DL-BOS.html"
'''datadir = "data"


def open_zip(datadir):
    with ZipFile('{0}.zip'.format(datadir), 'r') as myzip:
        myzip.extractall()


def process_all(datadir):
    files = os.listdir(datadir)
    return files'''


def process_file(f):
    """
    This function extracts data from the file given as the function argument in
    a list of dictionaries. This is example of the data structure you should
    return:

    data = [{"courier": "FL",
             "airport": "ATL",
             "year": 2012,
             "month": 12,
             "flights": {"domestic": 100,
                         "international": 100}
            },
            {"courier": "..."}
    ]


    Note - year, month, and the flight data should be integers.
    You should skip the rows that contain the TOTAL data for a year.
    """
    data = []
    info = {}
    info["courier"], info["airport"] = f[:6].split("-")
    # Note: create a new dictionary for each entry in the output data list.
    # If you use the info dictionary defined here each element in the list 
    # will be a reference to the same info dictionary.
    with open(f, "r") as html:

        soup = BeautifulSoup(html, "html.parser")
        flightdata = soup.find_all("tr", "dataTDRight")
        for (index, tr) in enumerate(flightdata):
            tds = tr.find_all("td")
            td1 = tds[1].getText()
            if (td1 != "Month" and td1 != "TOTAL"):
                newinfo = {}
                newinfo["courier"] = info["courier"]
                newinfo["airport"] = info["airport"]
                newinfo["year"] = int(tds[0].getText())
                newinfo["month"] = int(tds[1].getText())
                newinfo["flights"] = {}
                newinfo["flights"]["domestic"] = int(tds[2].getText().replace(",", ""))
                newinfo["flights"]["international"] = int(tds[3].getText().replace(",", ""))
                data.append(newinfo)
            else:
                pass

    return data


def test():
    print ("Running a simple test...")
#    open_zip(datadir)
 #   files = process_all(datadir)
    data = []
    # Test will loop over three data files.
  #  for f in files:
    data += process_file(file)
        
  #  assert len(data) == 399  # Total number of rows
    for entry in data[:3]:
        assert type(entry["year"]) == int
        assert type(entry["month"]) == int
        assert type(entry["flights"]["domestic"]) == int
        assert len(entry["airport"]) == 3
        assert len(entry["courier"]) == 2
    assert data[0]["courier"] == 'DL'
    assert data[0]["month"] == 10
    assert data[-1]["airport"] == "BOS"
    assert data[-1]["flights"] == {'international': 122186, 'domestic': 701098}
    
    print ("... success!")

if __name__ == "__main__":
    test()