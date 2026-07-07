import os
import re

for root, dirs, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            # Remove <script> tags and their contents
            content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL)

            with open(path, 'w') as f:
                f.write(content)

print("Removed script tags")
