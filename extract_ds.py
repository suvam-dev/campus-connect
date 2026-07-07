import json
import sys

with open('/Users/suvanghosh/.gemini/antigravity-ide/brain/657bc5bf-e748-42ab-936c-63d2e9cda544/.system_generated/steps/33/output.txt', 'r') as f:
    data = json.load(f)

for ds in data.get('designSystems', []):
    if '1b3301e08c9d4e22836b05dcfb6d77e9' in ds.get('name', ''):
        with open('screens/design_system.json', 'w') as out:
            json.dump(ds, out, indent=2)
            
        with open('screens/design_system.md', 'w') as out_md:
            out_md.write(ds.get('designSystem', {}).get('designMd', ''))
        
        sys.exit(0)

print("Design system not found")
