#Creates all tables
import sqlite3
conn = sqlite3.connect("ignv.db")
try:
    c = conn.cursor()
except Error as e:
    print e
#Creates a node table
c.executescript('''CREATE TABLE IF NOT EXISTS node(
    id integer primary key,
    name text not null
);
CREATE TABLE IF NOT EXISTS edge(
    node1 integer not null,
    node2 integer not null,
    directionality integer not null,
    FOREIGN KEY(node1) REFERENCES node(node_id)
    FOREIGN KEY(node2) REFERENCES node(node_id)
);
CREATE TABLE IF NOT EXISTS module(
    name text not null,
    id primary key
);
CREATE TABLE IF NOT EXISTS pathway(
    name text not null,
    id primary key
);
''')

conn.commit()
conn.close()
