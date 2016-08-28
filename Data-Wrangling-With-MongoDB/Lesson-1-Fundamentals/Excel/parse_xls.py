import xlrd

datafile = "2013_ERCOT_Hourly_Load_Data.xls"


def parse_file(datafile):
    workbook = xlrd.open_workbook(datafile)
    sheet = workbook.sheet_by_index(0)
    column = sheet.col_values(1, 1)

    minimum = {
        'value': None,
        'row': None
    }
    maximum = {
        'value': None,
        'row': None
    }
    sumUp = 0;

    for (index, value) in enumerate(column):
        if minimum['row'] is None:
            minimum['row'] = index
            minimum['value'] = value
        elif minimum['value'] > value:
            minimum['row'] = index
            minimum['value'] = value
        else:
            pass
        if maximum['row'] is None:
            maximum['row'] = index
            maximum['value'] = value
        elif maximum['value'] < value:
            maximum['row'] = index
            maximum['value'] = value
        else:
            pass
        sumUp += value

    data = {
            'maxtime': xlrd.xldate_as_tuple(sheet.cell_value(maximum['row'] + 1, 0), 0),
            'maxvalue': maximum['value'],
            'mintime': xlrd.xldate_as_tuple(sheet.cell_value(minimum['row'] + 1, 0), 0),
            'minvalue': minimum['value'],
            'avgcoast': sumUp / (sheet.nrows - 1)
    }
    return data

def test():
    data = parse_file(datafile)

    assert data['maxtime'] == (2013, 8, 13, 17, 0, 0)
    assert round(data['maxvalue'], 10) == round(18779.02551, 10)


test()