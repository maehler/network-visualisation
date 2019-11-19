#inserts all nodenames from final file into the tabe nodes.
import sqlite3

def fetchnodenames(filename):
    nodelist = []
    with open(filename) as f:
        lines = filter(None, (line.rstrip() for line in f.readlines()))
        for line in lines:
            if line.split("\t")[0]!="C1":
                nodelist.append(line.split("\t")[8])
    return nodelist
nodenames = fetchnodenames("a_ar_c_g_g3_n_p_s_t-top1-9999925.txt.final.h.txt")'
#connects to the database and creates a table node
conn = sqlite3.connect("ignv.db")
try:
    c = conn.cursor()
except Error as e:
    print e
c.execute('''CREATE TABLE IF NOT EXISTS node(
id integer primary key,
name text not null
);
''')
for item in nodenames:
    c.execute("INSERT INTO nodes  VALUES(NULL, ?)", (item,))
conn.commit()
conn.close()
