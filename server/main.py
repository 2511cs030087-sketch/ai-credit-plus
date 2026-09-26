import os
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from scoring_engine import compute_credit_score

app = FastAPI(
    title="AI Credit+ Financial Intelligence API",
    version="2.0.0",
    description="Backend API for alternative credit scoring, financial health, and OpenAI assistant"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    fullName: str
    email: str
    phone: Optional[str] = None
    password: str
    userType: Optional[str] = "Individual"

class EMICalculateRequest(BaseModel):
    principal: float
    rate_per_annum: float
    tenure_months: int

class AIChatRequest(BaseModel):
    prompt: str
    context: Optional[dict] = None

# Routes
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "AI Credit+ Backend Engine", "version": "2.0.0"}

@app.post("/api/auth/login")
def login(req: LoginRequest):
    return {
        "access_token": "demo_jwt_token_2026",
        "token_type": "bearer",
        "user": {
            "id": "usr_99",
            "name": req.email.split("@")[0].capitalize(),
            "email": req.email,
            "role": "customer"
        }
    }

@app.post("/api/auth/register")
def register(req: RegisterRequest):
    return {
        "access_token": "demo_jwt_token_2026_reg",
        "token_type": "bearer",
        "user": {
            "id": "usr_100",
            "name": req.fullName,
            "email": req.email,
            "userType": req.userType,
            "role": "customer"
        }
    }

@app.get("/api/financial/summary")
def get_financial_summary():
    return {
        "monthly_income": 78500,
        "monthly_expenses": 42300,
        "savings_amount": 24200,
        "current_emi": 8400,
        "cash_flow_status": "Healthy",
        "savings_rate_pct": 31
    }

@app.get("/api/credit/score")
def get_credit_score():
    sample_data = {
        "monthly_income": 78500,
        "monthly_expenses": 42300,
        "savings_amount": 24200,
        "current_emi": 8400,
        "on_time_payment_ratio": 0.94,
        "income_months_consistent": 6
    }
    return compute_credit_score(sample_data)

@app.post("/api/emi/calculate")
def calculate_emi_endpoint(req: EMICalculateRequest):
    r = req.rate_per_annum / 12 / 100
    n = req.tenure_months
    if r == 0:
        emi = req.principal / n
        return {"emi": round(emi), "total_payment": round(req.principal), "total_interest": 0}
    
    emi = (req.principal * r * ((1 + r) ** n)) / (((1 + r) ** n) - 1)
    total_payment = emi * n
    total_interest = total_payment - req.principal
    return {
        "emi": int(round(emi)),
        "total_payment": int(round(total_payment)),
        "total_interest": int(round(total_interest))
    }

@app.get("/api/loans/recommendations")
def get_loan_recommendations():
    return [
        {
            "id": 1,
            "type": "Personal Credit Line",
            "amount": "₹8,00,000",
            "interest": "9.4% – 12.5%",
            "emi": "₹17,200/mo",
            "tenure": "5 years",
            "eligibility": "High"
        },
        {
            "id": 2,
            "type": "Business Expansion Loan",
            "amount": "₹12,00,000",
            "interest": "10.2% – 13.0%",
            "emi": "₹25,400/mo",
            "tenure": "4 years",
            "eligibility": "High"
        }
    ]

@app.post("/api/ai/chat")
def ai_chat_endpoint(req: AIChatRequest):
    p = req.prompt.lower()
    score = 782
    income = 78500
    if "score" in p or "why" in p:
        response = f"Your AI Credit Score is **{score} (Excellent)**. On-time payment history (94%) and low Debt-to-Income ratio (10.7%) are the strongest positive contributors."
    elif "loan" in p or "afford" in p:
        response = f"With your verified monthly income of ₹{income:,}, you can comfortably afford up to ₹17,200/month EMI without exceeding safe debt limits."
    else:
        response = f"Based on your financial analysis:\n- Monthly Net Savings: ₹24,200\n- Cash Flow: Healthy\n- AI Credit Score: {score}"
    
    return {"response": response}

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "status": "success",
        "message": "Bank statement parsed and extracted successfully."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
