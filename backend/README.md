# FinergyCloud Backend

This directory contains a minimal Flask application that integrates with Firebase Authentication and PostgreSQL. It exposes endpoints for assessing investor risk profiles and retrieving project recommendations based on ESG metrics and user preferences.

## Setup

1. Create and activate a Python virtual environment.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set environment variables:
   - `DATABASE_URL` pointing to your PostgreSQL database.
   - `FIREBASE_CREDENTIALS` path to your Firebase service account JSON file.
4. Initialize the database:
   ```bash
   python
   >>> from app import db
   >>> db.create_all()
   ```
5. Run the server:
   ```bash
   python app.py
   ```

## API Endpoints

- `POST /risk-profile` – Calculates an investor's risk profile. Requires a Firebase auth token in the `Authorization` header and JSON body with investor details.
- `POST /recommendations` – Returns a list of recommended projects using ESG metrics. Requires the same authentication and accepts a JSON body with `investor` and `preferences` objects.
- `POST /compliance` – Checks if an investor is eligible to invest in a given project and returns a compliance report. Requires a Firebase auth token and a JSON body with `investor` details and `project_id`.
