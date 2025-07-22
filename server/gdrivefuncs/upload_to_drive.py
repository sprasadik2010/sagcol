# drive_service.py

import os
import pickle
import json
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive.file']
CLIENT_SECRETS_FILE = 'credentials.json'
TOKEN_FILE = 'token.pickle'
STATE_FILE = 'state.pickle'
REDIRECT_URI = 'https://sagcol.onrender.com/products/oauth2callback'


# ✅ Write credentials.json from env variable if it doesn’t exist
def ensure_credentials_file():
    if not os.path.exists(CLIENT_SECRETS_FILE):
        creds_content = os.getenv("GOOGLE_CREDENTIALS_JSON")
        if not creds_content:
            raise Exception("GOOGLE_CREDENTIALS_JSON environment variable not set")
        with open(CLIENT_SECRETS_FILE, "w") as f:
            f.write(creds_content)


# 🔑 Step 1: Generate authorization URL
def get_auth_url():
    ensure_credentials_file()

    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    auth_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )

    with open(STATE_FILE, 'wb') as f:
        pickle.dump(state, f)

    return auth_url


# 🔑 Step 2: Handle OAuth callback and save token
def handle_auth_callback(full_request_url):
    ensure_credentials_file()

    if not os.path.exists(STATE_FILE):
        raise Exception("Missing saved state from OAuth")

    with open(STATE_FILE, 'rb') as f:
        state = pickle.load(f)

    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
        state=state
    )
    flow.fetch_token(authorization_response=full_request_url)

    with open(TOKEN_FILE, 'wb') as token:
        pickle.dump(flow.credentials, token)

    return True


# 🔑 Step 3: Load token and get Drive service
def get_drive_service():
    if not os.path.exists(TOKEN_FILE):
        raise Exception("Token not found. Please authorize first.")

    with open(TOKEN_FILE, 'rb') as token:
        creds = pickle.load(token)

    return build('drive', 'v3', credentials=creds)


# ✅ Step 4: Upload file to Google Drive
def upload_file_to_drive(local_file_path: str, filename: str, folder_id: str):
    service = get_drive_service()

    file_metadata = {
        'name': filename,
        'parents': [folder_id]
    }

    media = MediaFileUpload(local_file_path, resumable=True)
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    return file.get('id')
