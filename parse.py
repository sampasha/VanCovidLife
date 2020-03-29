import pandas as pd

FILE_PATH = 'gs://vancovidlife-storage/Stores.csv'

df = pd.read_csv(FILE_PATH)

lat = df['LATITUDE'].values.tolist()
lon = df['LONGITUDE'].values.tolist()
addr = df['ADDRESS'].values.tolist()
names = df['NAME'].values.tolist()

ROW_SIZE = len(lat)

list_dict = []

for row in range(ROW_SIZE):
    dict={}
    coord_dict = {}
    dict['addr'] = addr[row]
    coord_dict['lat'] = lat[row]
    coord_dict['lon'] = lon[row]
    dict['coord'] = coord_dict
    dict['label'] = names[row]
    list_dict.append(dict)

print(list_dict)
