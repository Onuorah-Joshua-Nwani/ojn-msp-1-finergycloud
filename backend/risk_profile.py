from dataclasses import dataclass
from typing import List

@dataclass
class Investor:
    age: int
    investment_horizon: int  # years
    risk_tolerance: str  # 'low', 'medium', 'high'
    experience_years: int

@dataclass
class RiskAssessment:
    score: int
    level: str
    recommendations: List[str]

class RiskProfiler:
    def assess(self, investor: Investor) -> RiskAssessment:
        score = 0
        if investor.age < 35:
            score += 20
        elif investor.age < 55:
            score += 10
        else:
            score += 5

        if investor.investment_horizon >= 10:
            score += 20
        elif investor.investment_horizon >=5:
            score += 10
        else:
            score += 5

        tolerance_scores = {'low': 5, 'medium': 15, 'high': 25}
        score += tolerance_scores.get(investor.risk_tolerance, 10)

        if investor.experience_years > 5:
            score += 10

        if score >= 60:
            level = 'high'
            rec = ['Consider growth-focused portfolios.', 'Monitor market trends closely.']
        elif score >= 40:
            level = 'medium'
            rec = ['Maintain a balanced portfolio.', 'Review allocations annually.']
        else:
            level = 'low'
            rec = ['Focus on capital preservation.', 'Limit exposure to volatile assets.']

        return RiskAssessment(score=score, level=level, recommendations=rec)
