import sys, os
import pymupdf
import ollama
import time

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ai_handling import ollama_tools
from ai_handling import json_templates
from json_extractor import JsonExtractor

def extract_pdf_text(path: str):
    pdf = pymupdf.open(path)
    pdf_text = ""

    for page in pdf.pages():
        pdf_text += page.get_text()
        pdf_text += "\n"

    return pdf_text

def extract_pdf_questions(extracted_text: str, json_structure=json_templates.multiple_choice, number_of_questions=1):
    if extracted_text is None:
        raise ValueError("No extracted text provided. Please ensure the PDF was read correctly and contains text.")
    
    start_time = time.time()

    messages=[
        {
            "role": "system",
            "content": (
                "You are a precise data extraction and question generation assistant.\n\n"
                "IMPORTANT: You MUST use the calculate or proper tool for ALL math or other operations, even simple ones like 7 Multiplied by 11. NEVER compute math or perform other operations in your head or from memory. ALWAYS call the tool first, then use the result.\n"
                "Rules:\n"
                "1. Return ONLY a valid JSON object with a single key 'questions' whose value is an array of question objects. Example format: {\"questions\": [{...}, {...}]}\n"
                "2. Do NOT add any new keys to the question structure.\n"
                "3. Do NOT remove any keys from the question structure.\n"
                "4. Keep every key exactly as given — same name, same nesting, same data type.\n"
                "5. If a value cannot be found in the text, use the proper tool to get the result, however, if there is no proper tool, set it to null. Never fabricate data.\n"
                "6. Whenever you use a tool, you MUST make sure to only send the arguments that the tool requires, do not send the JSON of questions. Also ensure that the arguments are in the correct format and data type as specified in the tool description. For example, if a tool expects a numerical value, do not send it as a string. If it expects a list, send it as a list, even if it only contains one item.\n"
                "7. If a field expects a list and only one item is found, still return it as a list.\n"
                "8. EVERY question field must be filled — never leave question fields null or empty.\n"
                "9. For multiple_choice, always generate 4 answer options where exactly one is correct.\n"
                "10. You MUST generate exactly the number of questions requested — no more, no less.\n"
                "11. The correct_answer field MUST be set to one of the answer keys exactly as they appear in the JSON structure (e.g., 'answer1', 'answer2', 'answer3', or 'answer4'). For example: if answer2 is correct, set correct_answer to 'answer2'. NEVER use values like '1', 'a', 'b', 'A', or the answer text itself.\n"
            )
        },
        {
            "role": "user",
            "content": (
                f"Here is the JSON structure for each question object: {json_structure}\n\n"
                f"Here is the extracted text from the document:\n{extracted_text}\n\n"
                f"Generate exactly {number_of_questions} unique questions based on the text above. Make sure to include the correct_answer field and set it according to the system rules.\n"
                f"Return a JSON object in this exact format: {{\"questions\": [/* {number_of_questions} question objects here */]}}\n"
                "Each question must be meaningful, directly based on the text, and use a different part of the content.\n"
                "Correct answers must be supported by the text or by the proper tool. Incorrect options must be plausible but wrong.\n"
                "Before writing any answer that involves a number or equation, use the correct tool -by examining the tool's description- to verify it. Do not trust your own math or problem solving. ALWAYS use the tool when needed.\n"
                "NEVER make a question asking what the document contains or pertains to."
            )
        }
    ]

    while True:
        response = ollama.chat(
            model="llama3.2:3b",
            messages=messages,
            options={"temperature": 0.3},
            tools=ollama_tools.tools,
            stream=True,
        )

        first_response = ""
        tool_calls = []

        for chunk in response:
            if chunk["message"].get("tool_calls"):
                tool_calls.extend(chunk["message"]["tool_calls"])

            if chunk["message"].get("content"):
                token = chunk["message"]["content"]
                print(token, end="", flush=True)
                first_response += token

        print("\n")
        if tool_calls:
            print("\nTool calls made during generation:\n")
            messages.append({"role": "assistant", "content": "", "tool_calls": tool_calls}) 

            for call in tool_calls:
                call_func = ollama_tools.tool_map[call["function"]["name"]]
                call_result = call_func(**call["function"]["arguments"])
                messages.append({"role": "tool", "content": call_result})

                print(f"Tool called: {call['function']['name']} with arguments {call['function']['arguments']} | Result: {call_result}\n")
        else:
            print(r"---------// STARTING FINAL JSON EXTRACTION \\---------", "\n")  
            final_result = JsonExtractor.extract_valid_json(first_response)

            print(f"Time taken to get {number_of_questions} questions: {(time.time()-start_time):.4f} seconds\n")
            return final_result