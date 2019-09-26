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
query = "SELECT product.description as description from product, bid ,bids, auction where bid.user_id = 14923 and bid.bids_id = bids.id and bids.auction_id = auction.id and auction.product_id = product.id;"

## getting records from the table
cursor.execute(query)

## fetching all records from the 'cursor' object
records = cursor.fetchall()

query2 = "SELECT product.description from product, auction where product.id = auction.product_id AND auction.user_id <> 14923;"

cursor.execute(query2)


## fetching all records from the 'cursor' object
records2 = cursor.fetchall()


## defining the Query
query3 = "SELECT product.id from product, auction where product.id = auction.product_id AND auction.user_id <> 14923;"

## getting records from the table
cursor.execute(query3)

## fetching all records from the 'cursor' object
records3 = cursor.fetchall()

pp = 10006 * [0]
j = 0
for id in records3:
        pp[j] = id
        j = j + 1

# Function returns N largest elements
def Nmaxelements(list1, list2, N):
    final_list = []

    for i in range(0, N):
        max1 = 0
        max2 = 0

        for j in range(len(list1)):
            if list1[j] > max1:
                max1 = list1[j]
                max2 = list2[j]

        list1.remove(max1)
        #list2.remove(max2)
        final_list.append(max2)

    print(final_list)

# print records
#
# print records2
p = 10006 * [0]

des = 5 * [""]
ii = 0
i = 0
max = 0
maxi = 0

flag = 0

for description2 in records2:
    i = 0
    #print"e"
    for text2 in description2:
        
        for description in records:
            #ii = 0
            #print"a"
            for text in description:
                #print"i"
                mia = text.split()
                for texti in mia:
                    if texti in str(description2):
                        # ii = ii + 1
                        #break
                        p[i] = p[i] + 1
                    #print p[i]
    i = i + 1

# print p


print p
#Nmaxelements(p , pp , 5)
