import json

# Load service account JSON from file
with open("gdrivekey/key.json", "r") as f:
    data = json.load(f)

# Escape newline characters in private_key
data["private_key"] = data["private_key"].replace("\n", "\\n")

# Convert to one-liner JSON
env_ready_json = json.dumps(data)

# Print for use in .env file
print("Paste this in your .env file:\n")
print(f'SAG_GOOGLE_SERVICE_ACCOUNT={env_ready_json}')
