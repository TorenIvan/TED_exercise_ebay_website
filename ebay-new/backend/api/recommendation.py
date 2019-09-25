import re
import time
import sys
import mysql.connector as mysql


db = mysql.connect(
    host = "localhost",
    user = "root",
    passwd = "toor",
    database = "ted_ebay"
)


cursor = db.cursor()

## defining the Query
query = "SELECT product.description as description from product, bid ,bids, auction where bid.user_id = 14923 and bid.bids_id = bids.id and bids.auction_id = auction.id and auction.product_id = product.id"

## getting records from the table
cursor.execute(query)

## fetching all records from the 'cursor' object
records = cursor.fetchall()

query2 = "SELECT product.description from product, auction where product.id = auction.product_id;"

cursor.execute(query2)

## fetching all records from the 'cursor' object
records2 = cursor.fetchall()

# print records
#
# print records2
p = 5 * [0]
pp = 5 * [0]
des = 5 * [""]
ii = 0
i = 0
max = 0
maxi = 0

i = 0
for description2 in records2:
    for description in records:
        ii = 0
        for text2 in description2:
            for text in description:
                if text in text2:
                    ii == ii + 1
        for c in p:
            if ii > p[c]:
                p[c] = ii
                pp[c] = i
        i = i+1

print maxi
j = 0

for c in range(0,4):
    for cc in range(c+1,5):
        if pp[c] == pp[cc]:
            pp[cc] = -1


for c in pp:
    for description in records:
        if j == pp[c]:
            print description
        else:
            j=j+1
