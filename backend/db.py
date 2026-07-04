import pymysql

def get_connection():    
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="@Venu1234",
        database="login_poc",
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection