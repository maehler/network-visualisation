#inserts all nodenames from final file into the tabe nodes.
import sqlite3

def fetchnodenames(filename):#fetches all nodenames from given file
    nodelist = []
    with open(filename) as f:
        lines = filter(None, (line.rstrip() for line in f.readlines()))
        for line in lines:
            if line.split("\t")[0]!="C1":
                nodelist.append(line.split("\t")[8])
    return nodelist
nodenames = fetchnodenames("a_ar_c_g_g3_n_p_s_t-top1-9999925.txt.final.h.txt")
#connects to the database and inserts all the names into the nodes table
conn = sqlite3.connect("ignv.db")
try:
    c = conn.cursor()
except Error as e:
    print e
c.execute('''CREATE TABLE IF NOT EXISTS nodes(
node_id integer primary key,
node_name text not null
);
''')
for item in nodenames:
    c.execute("INSERT INTO nodes  VALUES(NULL, ?)", (item,))
conn.commit()
conn.close()
