# Zoo AI Deployment Guide

## GitHub Setup (zooai organization)

### 1. Create GitHub Organization

```bash
# Create organization at https://github.com/organizations/new
# Organization name: zooai
# Display name: Zoo Labs Foundation
# Email: models@zoo.dev
# Type: Nonprofit (501c3)
```

### 2. Create Main Repository

```bash
cd ~/work/zoo

# Add remote
git remote add origin https://github.com/zooai/zoo.git

# Push
git push -u origin main
```

### 3. Create Model-Specific Repositories

For each of the 12 models, create dedicated repos:

```bash
# Create repos on GitHub:
# - zooai/zoo-nano
# - zooai/zoo-agent
# - zooai/zoo-eco
# - zooai/zoo-next
# - zooai/zoo-omni
# - zooai/zoo-designer
# - zooai/zoo-coder
# - zooai/zoo-scribe
# - zooai/zoo-artist
# - zooai/zoo-director
# - zooai/zoo-3d
# - zooai/zoo-musician
```

## HuggingFace Setup (zooai organization)

### 1. Create HuggingFace Organization

```bash
# Go to https://huggingface.co/organizations/new
# Organization name: zooai
# Display name: Zoo Labs Foundation
# Type: Nonprofit
# Description: Open-source AI models from Zoo Labs Foundation (501c3)
```

### 2. Upload Organization Card

```bash
# Upload ZOO_MODEL_CARD.md as the organization README
# URL: https://huggingface.co/zooai
```

### 3. Create Model Repositories

For each model, create a HuggingFace model repo:

```python
from huggingface_hub import HfApi

api = HfApi()

models = [
    ("zoo-nano-0.6b", "Edge AI model (0.6B parameters)"),
    ("zoo-agent-4b", "Tool-use and function calling (4B)"),
    ("zoo-eco-4b", "Efficient inference model (4B)"),
    ("zoo-next-80b", "Advanced reasoning (80B)"),
    ("zoo-omni-30b", "Multimodal vision/audio/text/3D (30B)"),
    ("zoo-designer-235b", "Visual design and UI/UX (235B/22B MoE)"),
    ("zoo-coder-480b", "Code generation (480B MoE)"),
    ("zoo-scribe-2b", "Speech recognition (2B ASR)"),
    ("zoo-artist-8b", "Image generation and editing (8B)"),
    ("zoo-director-5b", "Video generation (5B)"),
    ("zoo-3d-12b", "3D model generation (12B)"),
    ("zoo-musician-6b", "Music composition (6B)"),
]

for model_name, description in models:
    api.create_repo(
        repo_id=f"zooai/{model_name}",
        private=False,
        repo_type="model",
    )
    print(f"✅ Created: zooai/{model_name}")
```

### 4. Upload Model Cards

```bash
# For each model, upload the model card
# Template is in ZOO_MODEL_CARD.md
```

## Organization Profile

### GitHub (github.com/zooai)

```markdown
# Zoo Labs Foundation

501(c)(3) nonprofit creating open-source AI models for everyone.

## Projects
- 🦁 Zoo AI - 12-model family (0.6B to 480B)
- 🎓 Open-source AI research
- 📚 Educational resources

## Partners
- Hanzo AI (Techstars)
- Lux Industries

[zoo.dev](https://zoo.dev) • [huggingface.co/zooai](https://huggingface.co/zooai)
```

### HuggingFace (huggingface.co/zooai)

Use the ZOO_MODEL_CARD.md as the organization README.

## Access Tokens

### HuggingFace

```bash
# Generate token at https://huggingface.co/settings/tokens
# Scope: write
export HF_TOKEN=hf_...

# Login
huggingface-cli login
```

### GitHub

```bash
# Generate PAT at https://github.com/settings/tokens
# Scope: repo, admin:org
export GITHUB_TOKEN=ghp_...

# Configure git
git config --global user.name "Zoo Labs Foundation"
git config --global user.email "models@zoo.dev"
```

## Model Upload Script

```python
#!/usr/bin/env python3
"""Upload Zoo models to HuggingFace"""

from huggingface_hub import HfApi
from pathlib import Path

api = HfApi()

def upload_model(model_path, model_name):
    """Upload a trained model to HuggingFace"""

    print(f"📤 Uploading {model_name}...")

    api.upload_folder(
        folder_path=model_path,
        repo_id=f"zooai/{model_name}",
        repo_type="model",
        commit_message=f"Upload {model_name}"
    )

    print(f"✅ Uploaded: https://huggingface.co/zooai/{model_name}")

# Example usage
if __name__ == "__main__":
    upload_model("./zoo-nano-20251005", "zoo-nano-0.6b")
```

## Repository Structure

### Main Zoo Repo (github.com/zooai/zoo)

```
zoo/
├── README.md
├── ZOO_MODEL_CARD.md
├── DEPLOYMENT.md
├── LICENSE
├── training/
│   ├── train_zoo_nano.py
│   ├── train_zoo_eco.py
│   └── ...
├── conversion/
│   ├── to_gguf.py
│   ├── to_mlx.py
│   └── ...
└── docs/
    ├── TRAINING.md
    ├── INFERENCE.md
    └── ...
```

### Model Repos (huggingface.co/zooai/*)

Each model gets its own repo with:
- Model weights (safetensors)
- Config files
- Model card (README.md)
- Quantized versions (GGUF, MLX)

## Next Steps

1. **Create GitHub organization**: github.com/zooai
2. **Create HuggingFace organization**: huggingface.co/zooai
3. **Push main repo**: `git push -u origin main`
4. **Train zoo-nano**: `python train_zoo_nano.py`
5. **Upload to HF**: `python upload_zoo_models.py`
6. **Announce**: Tweet, Discord, Reddit

---

**🦁 Zoo Labs Foundation - Making AI Open for Everyone**