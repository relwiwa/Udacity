#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Complete the 'extract_airports' function so that it returns a list of airport
codes, excluding any combinations like "All".
"""

from bs4 import BeautifulSoup
html_page = "page_source.html"


def extract_airports(page):
    data = []
    with open(page, "r") as html:
        # do something here to find the necessary values
        soup = BeautifulSoup(html, "html.parser")
        airports = soup.find(id = "AirportList").find_all("option")
        data = [a.get("value") for a in airports if a.get("value").startswith("All") == False]
    return data


def test():
    data = extract_airports(html_page)
    assert len(data) == 1190
    assert "ATL" in data
    assert "ABR" in data

test()