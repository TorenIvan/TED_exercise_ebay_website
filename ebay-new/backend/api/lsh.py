import numpy as np
import pandas as pd
import re
import time
import sys
from datasketch import MinHash, MinHashLSHForest
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



#Preprocess will split a string of text into individual tokens/shingles based on whitespace.
def preprocess(text):
    text = re.sub(r'[^\w\s]','',text)
    tokens = text.lower()
    tokens = tokens.split()
    print(tokens)
    return tokens

#Number of Permutations
permutations = 128

#Number of Recommendations to return
num_recommendations = 1



def get_forest(records, perms):
    start_time = time.time()
    minhash = []
    ## Showing the data
    for description in records:
        for text in description:
            tokens = preprocess(text)
            m = MinHash(num_perm=perms)
            for s in tokens:
                m.update(s.encode('utf8'))
            minhash.append(m)

    forest = MinHashLSHForest(num_perm=perms)

    for i,m in enumerate(minhash):
        forest.add(i,m)

    forest.index()

    print('It took %s seconds to build forest.' %(time.time()-start_time))

    return forest




def predict(text, records, perms, num_results, forest):
    start_time = time.time()

    tokens = preprocess(text)
    m = MinHash(num_perm=perms)
    for s in tokens:
        m.update(s.encode('utf8'))

    idx_array = np.array(forest.query(m, num_results))
    print (idx_array)
    if len(idx_array) == 0:
        return None # if your query is empty, return none

    result = records.iloc[idx_array]['description']

    print('It took %s seconds to query forest.' %(time.time()-start_time))

    return result


forest = get_forest(records, permutations)

title = 'Limited Too Gorgeous Butterfly Set Sz 14 This is a Gorgeous set for any Limited Too Girl'
result = predict(title, records, permutations, num_recommendations, forest)
print('\n Top Recommendation(s) is(are) \n', result)
