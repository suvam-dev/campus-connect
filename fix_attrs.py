import os
import re

for root, dirs, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            # Replace checked="" with defaultChecked
            content = content.replace('checked=""', 'defaultChecked')
            content = content.replace('checked="checked"', 'defaultChecked')
            # Replace disabled="" with disabled
            content = content.replace('disabled=""', 'disabled')
            # Replace selected="" with defaultValue in select or just remove it if on option
            content = content.replace('selected=""', 'defaultValue')

            with open(path, 'w') as f:
                f.write(content)

print("Fixed boolean attrs")
