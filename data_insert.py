import sqlite3

def fetchnodenames(filename):
    #Purpose: Fetch the butter
    #Return value: A list of all unique node names as strings.
    nodelist = []
    with open(filename) as f:
        lines = filter(None, (line.rstrip() for line in f.readlines()))#removes all lines that consists of white space
        for line in lines:
            if line.split("\t")[0]!="C1" and line.split("\t")[8] not in nodelist:
                nodelist.append(line.split("\t")[8])
    return nodelist
nodenames = fetchnodenames("final.txt")

#Gets all the edges in tuples from edge file
def fetchedges(edgefile):
    #Purpose Fetch the edges between nodes to link the together
    #Return value: List of tuples, first two values are the node names, third is the directionality of them
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

def fetchmodules(finalfile):
    #Purpose: fetch all modules
    #Return value: List of the modules as int
    with open(finalfile) as f:
        lines = filter(None, (line.rstrip() for line in f.readlines())) #removes all lines that consists of white space
        modulelist = []
        for line in lines:
            if line.split("\t")[0] != "C1" and line.split("\t")[1] not in modulelist:
                modulelist.append((line.split('\t')[1],line.split('\t')[8]))
        return modulelist
modulelist =  fetchmodules("final.txt")

#Connects to the database and creates a instance: c
conn = sqlite3.connect("ignv.db")
try:
    c = conn.cursor()
except Error as e:
    print e

#Inserts all modules into the module table
unique =[]
for number in modulelist:
    if number[0] not in unique:
        c.execute('INSERT INTO module VALUES(?)',(number[0],))
    unique.append(number[0])


#Inserts all the nodes into node table.
for item in nodenames:
    c.execute("INSERT INTO node  VALUES(NULL, ?)", (item,))
c.execute("SELECT * FROM node;")
nodes = c.fetchall()
def fetchEdgeInserts(nodes, edges):
    #Purpose: Fetch the id of the nodes in the edges tuple in order to establish proper foreign keys.
    #Parameters: nodes = list of tuples, first element is id and second name. Edges = like the return value, but have names instead of id.
    #Return value: Tuples of three elements, tempid1 = node where edge originate from, tempid2 = node where edge leads into
    #tuple[2] is whether the edge is directed or not.
    edgeinserts = []
    for tuple in edges:
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
    return edgeinserts
edgeinserts = fetchEdgeInserts(nodes, edgenames)
for item in edgeinserts:
    c.executemany("INSERT INTO edge VALUES(?,?,?)", (item,))

def fetch_n_m_inserts(nodes, modules):
    n_m_inserts = []
    for tuple in modules:
        for node in nodes:
            if tuple[1] == node[1]:
                n_m_inserts.append((tuple[0],node[0]))
                break
    return n_m_inserts

for tuple in fetch_n_m_inserts(nodes, modulelist):
    c.executemany('INSERT INTO node_module VALUES(?,?)', (tuple,))






conn.commit()
conn.close()
