from html.parser import HTMLParser
import sys

class TagValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.ignored = {'img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'col', 'base', 'embed', 'param', 'track', 'wbr'}

    def handle_starttag(self, tag, attrs):
        if tag not in self.ignored:
            self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag in self.ignored:
            return
        if not self.stack:
            print(f"Error: Unexpected closing tag </{tag}> at line {self.getpos()[0]}")
            return
        expected, pos = self.stack.pop()
        if expected != tag:
            print(f"Error: Mismatched tag: expected </{expected}> (opened at line {pos[0]}), got </{tag}> at line {self.getpos()[0]}")

with open("prototype.html", "r", encoding="utf-8") as f:
    content = f.read()

parser = TagValidator()
parser.feed(content)

if parser.stack:
    print("Unclosed tags:")
    for tag, pos in reversed(parser.stack):
        print(f"  <{tag}> opened at line {pos[0]}")
else:
    print("All tags matched successfully!")
