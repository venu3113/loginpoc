# from flask import Flask
# from flask_cors import CORS
# from routes import routes
# from flask_jwt_extended import JWTManager

# app = Flask(__name__)
# CORS(app)

# app.config["JWT_SECRET_KEY"] = "venu_secret_key-123"
# JWT = JWTManager(app)

# app.register_blueprint(routes)

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask
from flask_cors import CORS
from routes import routes
from flask_jwt_extended import JWTManager
from datetime import timedelta

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "venu_secret_key_123"

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=10)

JWT = JWTManager(app)

app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)


