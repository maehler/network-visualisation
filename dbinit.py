#Creates all tables
import sqlite3
conn = sqlite3.connect("ignv.db")
try:
    c = conn.cursor()
except Error as e:
    print (e)
#Drops all tables and creates them anew
c.executescript('''DROP TABLE IF EXISTS node;
DROP TABLE IF EXISTS edge;
DROP TABLE IF EXISTS module;
DROP TABLE IF EXISTS node_module;

CREATE TABLE IF NOT EXISTS node(
id integer primary key,
name text not null
);
CREATE TABLE IF NOT EXISTS edge(
node1 integer not null,
node2 integer not null,
directionality integer not null,
FOREIGN KEY(node1) REFERENCES node(node_id),
FOREIGN KEY(node2) REFERENCES node(node_id)
);
CREATE TABLE IF NOT EXISTS module(
id primary key
);
CREATE TABLE IF NOT EXISTS node_module(
m_id integer not null,
n_id primary key,
FOREIGN KEY(m_id) REFERENCES module(id),
FOREIGN KEY(n_id) REFERENCES node(id)
);
''')

conn.commit()
conn.close()
