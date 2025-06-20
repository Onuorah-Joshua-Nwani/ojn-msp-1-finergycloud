from dataclasses import dataclass
from typing import List, Dict

from risk_profile import Investor, RiskProfiler
from esg_metrics import fetch_esg_score


@dataclass
class Project:
    id: str
    sector: str
    name: str
    min_risk: str
    esg_id: str


# Example project catalog. In a real application this could come from a database.
PROJECTS = [
    Project(id="proj1", sector="solar", name="Solar Expansion B", min_risk="low", esg_id="solar_project_B"),
    Project(id="proj2", sector="wind", name="Wind Farm Alpha", min_risk="medium", esg_id="wind_farm_A"),
    Project(id="proj3", sector="hydro", name="Hydro Plant C", min_risk="high", esg_id="hydro_project_C"),
]


profiler = RiskProfiler()

_level_rank = {"low": 1, "medium": 2, "high": 3}

def _allowed(min_risk: str, investor_level: str) -> bool:
    return _level_rank.get(investor_level, 1) >= _level_rank.get(min_risk, 1)


def recommend(investor_data: Dict, preferences: Dict) -> List[Dict]:
    """Return project recommendations based on risk profile and ESG score."""
    investor = Investor(
        age=investor_data.get("age", 0),
        investment_horizon=investor_data.get("investment_horizon", 0),
        risk_tolerance=investor_data.get("risk_tolerance", "medium"),
        experience_years=investor_data.get("experience_years", 0),
    )
    assessment = profiler.assess(investor)

    sectors = set(preferences.get("sectors", []))
    min_esg = preferences.get("min_esg_score", 0)

    recs = []
    for project in PROJECTS:
        if sectors and project.sector not in sectors:
            continue
        if not _allowed(project.min_risk, assessment.level):
            continue
        esg_score = fetch_esg_score(project.esg_id)
        if esg_score < min_esg:
            continue
        recs.append({
            "id": project.id,
            "name": project.name,
            "sector": project.sector,
            "esg_score": esg_score,
        })
    return recs
