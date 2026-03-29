import sys, os
import random

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ai_handling import pdf_extraction as extractor

questions = [{"question": "What is 7 times 11?", "answer1": "63", "answer2": "88", "answer3": "55", "answer4": "77", "correct_answer": "answer4"}]

def add_questions(file, number_of_questions=1, json_structure=extractor.json_templates.multiple_choice):
    file_path = os.path.join(os.path.dirname(__file__), 'uploads', file.filename)
    file_text = extractor.extract_pdf_text(file_path)

    print(f"Generating ({number_of_questions}) Questions For: {file.filename}\n")

    questions = extractor.extract_pdf_questions(file_text, json_structure=json_structure, number_of_questions=number_of_questions)

    print(f"Generated Questions ({number_of_questions}):", questions, "\n")

    return