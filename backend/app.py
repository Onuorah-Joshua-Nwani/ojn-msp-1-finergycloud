import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import firebase_admin
from firebase_admin import credentials, auth
from risk_profile import Investor, RiskProfiler
from recommendations import recommend, PROJECTS
from compliance import check_compliance

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://localhost/finergy')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firebase_uid = db.Column(db.String(128), unique=True, nullable=False)
    risk_level = db.Column(db.String(20))
    risk_score = db.Column(db.Integer)

cred_path = os.getenv('FIREBASE_CREDENTIALS')
if cred_path and not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

profiler = RiskProfiler()

@app.route('/risk-profile', methods=['POST'])
def risk_profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Missing auth token'}), 401
    try:
        decoded = auth.verify_id_token(token)
    except Exception:
        return jsonify({'error': 'Invalid auth token'}), 401

    data = request.json or {}
    investor = Investor(
        age=data.get('age', 0),
        investment_horizon=data.get('investment_horizon', 0),
        risk_tolerance=data.get('risk_tolerance', 'medium'),
        experience_years=data.get('experience_years', 0)
    )
    assessment = profiler.assess(investor)

    user = User.query.filter_by(firebase_uid=decoded['uid']).first()
    if not user:
        user = User(firebase_uid=decoded['uid'])
        db.session.add(user)
    user.risk_level = assessment.level
    user.risk_score = assessment.score
    db.session.commit()

    return jsonify({
        'score': assessment.score,
        'level': assessment.level,
        'recommendations': assessment.recommendations
    })


@app.route('/recommendations', methods=['POST'])
def project_recommendations():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Missing auth token'}), 401
    try:
        decoded = auth.verify_id_token(token)
    except Exception:
        return jsonify({'error': 'Invalid auth token'}), 401

    data = request.json or {}
    investor_data = data.get('investor', {})
    preferences = data.get('preferences', {})
    recs = recommend(investor_data, preferences)
    return jsonify({'recommendations': recs})

@app.route('/compliance', methods=['POST'])
def compliance_check():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Missing auth token'}), 401
    try:
        auth.verify_id_token(token)
    except Exception:
        return jsonify({'error': 'Invalid auth token'}), 401

    data = request.json or {}
    investor_data = data.get('investor', {})
    project_id = data.get('project_id')
    project = next((p for p in PROJECTS if p.id == project_id), None)
    if not project:
        return jsonify({'error': 'Invalid project_id'}), 400

    investor = Investor(
        age=investor_data.get('age', 0),
        investment_horizon=investor_data.get('investment_horizon', 0),
        risk_tolerance=investor_data.get('risk_tolerance', 'medium'),
        experience_years=investor_data.get('experience_years', 0)
    )
    result = check_compliance(investor, project)
    return jsonify({'compliant': result.compliant, 'issues': result.issues})

if __name__ == '__main__':
    app.run(debug=True)
