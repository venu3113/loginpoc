from backend.db import get_connection

try:
    connection = get_connection()
    print("✅ Connected to MySQL successfully!")

    cursor = connection.cursor()
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()

    print("Tables:", tables)

    cursor.close()
    connection.close()

except Exception as e:
    print("❌ Error:", e)