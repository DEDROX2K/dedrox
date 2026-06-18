import re

with open("prototype.html", "r", encoding="utf-8") as f:
    html = f.read()

# Strip comments
html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)

# Find all tags
tags = re.findall(r'</?([a-zA-Z0-9\-]+)(?:\s+[^>]*?)?>', html)

stack = []
ignored_tags = {'img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'col', 'base', 'embed', 'param', 'track', 'wbr'}

for i, tag in enumerate(tags):
    # check if closing tag
    if tag.startswith('/'):
        name = tag[1:].lower()
        if name in ignored_tags:
            continue
        if not stack:
            print(f"Extra closing tag </{name}> at index {i}")
            continue
        expected = stack.pop()
        if expected != name:
            print(f"Mismatch: expected </{expected}>, got </{name}> at index {i}")
    else:
        name = tag.lower()
        if name in ignored_tags:
            continue
        stack.append(name)

if stack:
    print(f"Unclosed tags left in stack: {stack}")
else:
    print("All tags balanced according to basic stack check.")
