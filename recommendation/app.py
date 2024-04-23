from flask import Flask, request, jsonify, render_template
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.tree import DecisionTreeClassifier
from collections import defaultdict
import json
from flask_cors import CORS
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

# Load MongoDB data
with open('users.json', 'r') as file:
    users_data = json.load(file)

# Prepare the data for the decision tree classifier
skills = []
user_ids = []
for user in users_data:
    user_ids.append(user['_id']['$oid'])
    user_skills = [skill['value'] for skill in user['skills']]
    skills.append(user_skills)

mlb = MultiLabelBinarizer()
X_encoded = mlb.fit_transform(skills)
y = user_ids

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Train a decision tree classifier
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# Create a dictionary to store users indexed by their skills
users_by_skill = defaultdict(list)
for user, user_id in zip(users_data, user_ids):
    for skill in user['skills']:
        users_by_skill[skill['value']].append(user_id)

# Function to recommend users based on the input skills
def recommend_users_for_skills(skills):
    skills_encoded = mlb.transform([skills])
    predicted_users = clf.predict(skills_encoded)
    recommended_user_ids = set()
    for user_id in predicted_users:
        recommended_user_ids.update(users_by_skill[skills[0]])
    return recommended_user_ids

@app.route('/')
def index():
    return render_template('recommend.html')

@app.route('/recommend_users', methods=['POST'])
def recommend_users():
    data = request.get_json()
    selected_skill = data['selected_skill']

    # Get recommended users for the selected skill
    recommended_user_ids = recommend_users_for_skills([selected_skill])

    # Filter recommended users' information
    recommended_users_info = []
    for user in users_data:
        if user['_id']['$oid'] in recommended_user_ids:
            user_info = {
                'name': user['name'],
                'email': user['email'],
                'profilePic': user['profilePic'],
                'id': user['_id']['$oid'],
                'gender': user['gender'],
                'city': user['city']
            }
            recommended_users_info.append(user_info)

    # Prepare response
    if recommended_users_info:
        response = recommended_users_info
    else:
        response = {"message": "No users found with the selected skill."}
    print(jsonify(response))
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
