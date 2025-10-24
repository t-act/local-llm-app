import ollama
response = ollama.chat(model='phi3', messages=[
  {
    'role': 'user',
    'content': '空はなぜ青い？',
  },
])
print(response['message']['content'])