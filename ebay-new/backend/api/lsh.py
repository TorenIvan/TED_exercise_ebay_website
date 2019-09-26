import numpy as np
import pandas as pd
import re
import time
from datasketch import MinHash, MinHashLSHForest
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

print(records)

#Preprocess will split a string of text into individual tokens/shingles based on whitespace.
def preprocess(text):
    text = re.sub(r'[^\w\s]','',text)
    tokens = text.lower()
    tokens = tokens.split()
    return tokens

#Number of Permutations
permutations = 128

#Number of Recommendations to return
num_recommendations = 1




def get_forest(records, perms):
    start_time = time.time()

    minhash = []
    for record in records:
        for text in record:
            tokens = preprocess(text)
            m = MinHash(num_perm=perms)
            for s in tokens:
                m.update(s.encode('utf8'))
            minhash.append(m)
        forest = MinHashLSHForest(num_perm=perms)
        print(forest)
    for i,m in enumerate(minhash):
        forest.add(i,m)

    forest.index()

    print('It took %s seconds to build forest.' %(time.time()-start_time))

    return forest




forest = get_forest(records, permutations)
print(forest)
