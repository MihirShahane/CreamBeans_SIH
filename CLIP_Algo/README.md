# CREAM BEANS — SIH 2026 Campus Lost & Found Intelligence System

> AI/ML Multi-Modal Matching Engine for Campus Lost & Found Retrieval

## Overview
Cream Beans is a smart lost-and-found intelligence application designed for university campuses. It replaces fragmented WhatsApp groups, physical notice boards, and paper registers with an AI-powered search and retrieval engine.

The core AI module leverages Hugging Face Transformers pre-trained **CLIP** (`openai/clip-vit-base-patch32`), geospatial Haversine calculations, and exponential decay models to compute multi-modal candidate rankings across lost and found item reports.

---

## AI Matching Formula

$$\text{Identity Score} = 0.5 \times \text{Description Similarity} + 0.5 \times \text{Image Similarity}$$

$$\text{Context Score} = 0.6 \times \text{Location Similarity} + 0.4 \times \text{Time Similarity}$$

$$\text{Final Score} = 0.7 \times \text{Identity Score} + 0.3 \times \text{Context Score}$$

---

## Directory Structure

```
cream-beans-lost-found/
├── README.md
├── PROJECT_SPEC.md
├── .env.example
├── frontend/             # React + Vite + Tailwind frontend workspace
├── backend/              # FastAPI backend API server workspace
├── database/             # PostgreSQL / Supabase SQL DDL schemas
├── ai/                   # AI/ML Matching Engine module
│   ├── clip_encoder.py       # CLIP multi-modal encoder & similarity
│   ├── location_matcher.py   # Geospatial distance & location decay
│   ├── time_matcher.py       # Time delta & half-life decay
│   ├── matching_engine.py    # Core multi-modal ranking engine
│   └── stage1_experiment.py  # Stage 1 experiment & CLIP benchmarks
├── tests/                # Unit & Integration test suite
└── docs/                 # Documentation & experiment results
    ├── stage1_clip_proof.md  # CLIP capability proof & benchmark report
    └── MATCHING_ENGINE.md    # Engine integration & API documentation
```

---

## Running Stage 1 Proof & Benchmarks

```bash
# Run Stage 1 CLIP Proof Experiment
python -m ai.stage1_experiment
```

## Running Tests

```bash
# Run full unit and integration test suite
pytest tests/ -v
```

---

## Integration API Example

```python
from ai.matching_engine import find_matches, Item

lost_report = {
    "id": "L101",
    "category": "Bags",
    "description": "Black backpack with laptop compartment",
    "image_url": "https://example.com/lost_bag.jpg",
    "location": "Central Library Reading Room",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timestamp": "2026-08-29T10:00:00Z"
}

found_candidates = [
    {
        "id": "F001",
        "category": "Bags",
        "description": "Dark Lenovo bag",
        "image_url": "https://example.com/found_bag.jpg",
        "location": "Library Lawn",
        "latitude": 12.9720,
        "longitude": 77.5950,
        "timestamp": "2026-08-29T11:30:00Z"
    }
]

matches = find_matches(lost_report, found_candidates)
print(matches)
# Outputs ranked match dictionary list with individual and final scores
```
