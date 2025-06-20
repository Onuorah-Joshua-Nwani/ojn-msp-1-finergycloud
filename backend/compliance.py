from dataclasses import dataclass
from typing import List

from risk_profile import Investor
from recommendations import Project

@dataclass
class ComplianceResult:
    compliant: bool
    issues: List[str]

def check_compliance(investor: Investor, project: Project) -> ComplianceResult:
    """Simple compliance checks based on investor data and project risk."""
    issues: List[str] = []
    if investor.age < 18:
        issues.append("Investor must be at least 18 years old.")
    if project.min_risk == "high":
        if investor.experience_years < 1:
            issues.append("High risk projects require prior experience.")
        if investor.risk_tolerance != "high":
            issues.append("Risk tolerance too low for high risk project.")
    if project.min_risk == "medium" and investor.risk_tolerance == "low":
        issues.append("Risk tolerance too low for medium risk project.")
    return ComplianceResult(compliant=len(issues) == 0, issues=issues)
