import os

# Placeholder for ESG metrics fetching
# In a production environment, this would make HTTP requests to an ESG data API.

def fetch_esg_score(project_id: str) -> int:
    """Return a mock ESG score for a given project."""
    mock_scores = {
        "wind_farm_A": 85,
        "solar_project_B": 92,
        "hydro_project_C": 78,
    }
    return mock_scores.get(project_id, 50)
