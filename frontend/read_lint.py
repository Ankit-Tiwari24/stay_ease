import json
try:
    with open('lint_json.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    with open('lint_results.txt', 'w', encoding='utf-8') as out:
        for file in data:
            for msg in file['messages']:
                out.write(f"{file['filePath']}:{msg['line']}:{msg['column']} - {msg['message']} ({msg['ruleId']})\n")
except Exception as e:
    print("Error:", e)
