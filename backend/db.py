import pymysql

def get_connection():    
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="Naga12#$",
        database="login_poc",
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection