from flask import Flask, request, send_file, jsonify
import questions_handling
import shutil, os

base_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(base_dir)

app = Flask(__name__, static_folder=root_dir, static_url_path='')
UPLOAD_FOLDER = os.path.join(base_dir, 'uploads')

files_dict = {}

try:
    os.makedirs(UPLOAD_FOLDER, exist_ok=False)
except:
    shutil.rmtree(UPLOAD_FOLDER)
    os.makedirs(UPLOAD_FOLDER, exist_ok=False)

@app.route('/')
def index():
    return send_file(os.path.join(root_dir, 'menus/main_menu/index.html'))

@app.route('/create_questions', methods=['POST'])
def question_upload_progress():
    data = request.get_json()
    fileName = data["filename"]
    numQuestions = data["numberOfQuestions"]
    file = files_dict.get(fileName)

    # add support question type and question difficulty after the hackothon
    questions_handling.add_questions(file, number_of_questions=int(numQuestions))

    return "Success"

@app.route('/get_questions', methods=['GET'])
def get_questions():
    return jsonify(questions_handling.questions)

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if not request.files:
        return jsonify({"message": "No Files Uploaded", "files": []})
    
    files = request.files.getlist("file")
    file_names = []

    for file in files:
        if os.path.exists(os.path.join(UPLOAD_FOLDER, file.filename)):
            print("file already exists:", file.filename)
            continue

        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
        file_names.append(file.filename)
        files_dict[file.filename] = file

    if len(file_names) == 0:
        return jsonify({"message": "Files Already Uploaded", "files": []})

    return jsonify({"message": "Files uploaded successfully", "files": file_names})

if __name__ == '__main__':
    app.run(debug=True)