import sqlite3
#Gets all nodenames from final file
def fetchnodenames(filename):
    nodelist = []
    with open(filename) as f:
        lines = filter(None, (line.rstrip() for line in f.readlines()))#removes all lines that consists of white space
        for line in lines:
            if line.split("\t")[0]!="C1":
                nodelist.append(line.split("\t")[8])
    return nodelist
nodenames = fetchnodenames("final.txt")

#Gets all the edges in tuples from edge file
def fetchedges(edgefile):
    with open(edgefile) as f:
        lines = filter(None, (line.rstrip() for line in f.readlines())) #removes all lines that consists of white space
        edgelist = []
        for line in lines:
            if line.split("\t")[3] == "Undirected":
                edgelist.append((line.split("\t")[0],line.split("\t")[1], 0))
            else:
                edgelist.append((line.split("\t")[0],line.split("\t")[1], 1))
        return edgelist
edgenames = fetchedges("edge.txt")

conn = sqlite3.connect("ignv.db")
try:
    c = conn.cursor()
except Error as e:
    print e

for item in nodenames:
    c.execute("INSERT INTO node  VALUES(NULL, ?)", (item,))
c.execute("SELECT * FROM node;")
nodes = c.fetchall()
edgeinserts = []
for tuple in edgenames:
    for i in range(2):
        for node in nodes:
            if tuple[i] == node[1]:
                if i ==0:
                    tempid1 = node[0]
                    break
                else:
                    tempid2 = node[0]
                    break
    edgeinserts.append((tempid1, tempid2, tuple[2]))
for item in edgeinserts:
    c.executemany("INSERT INTO edge VALUES(?,?,?)", (item,))
conn.commit()
conn.close()
