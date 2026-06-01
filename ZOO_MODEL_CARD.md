---
license: apache-2.0
base_model: Qwen/Qwen3-0.6B
tags:
- zoo
- zooai
- zoo-labs
- open-source
- qwen3
- text-generation
- edge-ai
- nonprofit
datasets:
- zooai/training-dataset
language:
- en
library_name: transformers
pipeline_tag: text-generation
model_type: qwen3
---

# 🦁 Zoo AI Model Family

## About Zoo

The **Zoo AI Model Family** is an open-source AI model initiative led by **[Zoo Labs Foundation Inc.](https://zoo.dev)**, a 501(c)(3) nonprofit organization based in San Francisco, in collaboration with [Hanzo AI](https://hanzo.ai) and [Lux Industries Inc.](https://lux.industries).

All published checkpoints are hosted on HuggingFace under the [`zooai`](https://huggingface.co/zooai) organization.

## Table of Contents

- [Complete Model Lineup](#complete-model-lineup-12-models)
- [Models](#models)
  - [ZOO-NANO](#zoo-nano)
  - [ZOO-AGENT](#zoo-agent)
  - [ZOO-ECO](#zoo-eco)
  - [ZOO-NEXT](#zoo-next)
  - [ZOO-OMNI](#zoo-omni)
  - [ZOO-DESIGNER](#zoo-designer)
  - [ZOO-CODER](#zoo-coder)
  - [ZOO-SCRIBE](#zoo-scribe)
  - [ZOO-ARTIST](#zoo-artist)
  - [ZOO-DIRECTOR](#zoo-director)
  - [ZOO-3D](#zoo-3d)
  - [ZOO-MUSICIAN](#zoo-musician)
- [Model Description](#model-description)
- [Key Features](#key-features)
- [Training Details](#training-details)
- [Model Identity](#model-identity)
- [Zoo Labs Foundation](#zoo-labs-foundation)
- [Citation](#citation)
- [Contact](#contact)
- [Contributing](#contributing)

## Complete Model Lineup (12 Models)

| Model | Parameters | Base | Use Cases | HuggingFace |
|-------|------------|------|-----------|-------------|
| **ZOO-NANO** | 0.6B | Qwen3-0.6B | Edge AI, Mobile, IoT | [`zooai/nano-1`](https://huggingface.co/zooai/nano-1) |
| **ZOO-AGENT** | 4B | Fine-tuned ZOO-ECO | Tool usage, Function calling | TBA |
| **ZOO-ECO** | 4B | Qwen3-4B | Efficient inference, Developer tools | [`zooai/eco-1`](https://huggingface.co/zooai/eco-1) |
| **ZOO-NEXT** | 80B | Qwen3-Next-80B | Advanced reasoning, Research | TBA |
| **ZOO-OMNI** | 30B | Multimodal base | Vision, Audio, Text, 3D | TBA |
| **ZOO-DESIGNER** | 235B/22B active | Qwen3-VL-235B-A22B-Thinking | Visual design, UI/UX | TBA |
| **ZOO-CODER** | 480B | Code-specialized MoE | Code generation, IDE | [`zooai/coder-1`](https://huggingface.co/zooai/coder-1) · [`gguf`](https://huggingface.co/zooai/coder-1-gguf) |
| **ZOO-SCRIBE** | 2B | Qwen3-ASR | Speech recognition, Transcription | TBA |
| **ZOO-ARTIST** | 8B | Qwen3-Image | Image generation, Editing | TBA |
| **ZOO-DIRECTOR** | 5B | Wan2.2-TI2V | Video generation, Text-to-video | TBA |
| **ZOO-3D** | 12B | 3D-specialized | 3D model generation, Mesh creation | TBA |
| **ZOO-MUSICIAN** | 6B | Music-specialized | Music composition, Audio synthesis | TBA |

> Models marked **TBA** are part of the published roadmap; checkpoints will be linked here once they land on HuggingFace.

## Models

### ZOO-NANO

- **Parameters:** 0.6B
- **Base:** Qwen3-0.6B
- **License:** Apache 2.0
- **Intended use:** Edge AI, mobile inference, IoT devices, on-device assistants
- **HuggingFace:** [`zooai/nano-1`](https://huggingface.co/zooai/nano-1)

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zooai/nano-1")
tokenizer = AutoTokenizer.from_pretrained("zooai/nano-1")

prompt = "Who are you?"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

### ZOO-AGENT

- **Parameters:** 4B
- **Base:** Fine-tuned ZOO-ECO
- **License:** Apache 2.0
- **Intended use:** Tool usage, function calling, agentic workflows
- **HuggingFace:** TBA

### ZOO-ECO

- **Parameters:** 4B
- **Base:** Qwen3-4B
- **License:** Apache 2.0
- **Intended use:** Efficient inference, developer tools, general-purpose assistance
- **HuggingFace:** [`zooai/eco-1`](https://huggingface.co/zooai/eco-1)

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zooai/eco-1")
tokenizer = AutoTokenizer.from_pretrained("zooai/eco-1")

prompt = "Explain photosynthesis in one paragraph."
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=200)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

### ZOO-NEXT

- **Parameters:** 80B
- **Base:** Qwen3-Next-80B
- **License:** Apache 2.0
- **Intended use:** Advanced reasoning, research-grade inference
- **HuggingFace:** TBA

### ZOO-OMNI

- **Parameters:** 30B
- **Base:** Multimodal base
- **License:** Apache 2.0
- **Intended use:** Vision, audio, text, and 3D understanding in a single model
- **HuggingFace:** TBA

### ZOO-DESIGNER

- **Parameters:** 235B total / 22B active (MoE)
- **Base:** Qwen3-VL-235B-A22B-Thinking
- **License:** Apache 2.0
- **Intended use:** Visual design, UI/UX generation, layout reasoning
- **HuggingFace:** TBA

### ZOO-CODER

- **Parameters:** 480B (MoE)
- **Base:** Code-specialized MoE
- **License:** Apache 2.0
- **Intended use:** Code generation, IDE integrations, developer copilots
- **HuggingFace:** [`zooai/coder-1`](https://huggingface.co/zooai/coder-1) — GGUF build at [`zooai/coder-1-gguf`](https://huggingface.co/zooai/coder-1-gguf)

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zooai/coder-1")
tokenizer = AutoTokenizer.from_pretrained("zooai/coder-1")

prompt = "Write a Python function that reverses a linked list."
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=256)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

### ZOO-SCRIBE

- **Parameters:** 2B
- **Base:** Qwen3-ASR
- **License:** Apache 2.0
- **Intended use:** Speech recognition, transcription
- **HuggingFace:** TBA

### ZOO-ARTIST

- **Parameters:** 8B
- **Base:** Qwen3-Image
- **License:** Apache 2.0
- **Intended use:** Image generation and editing
- **HuggingFace:** TBA

### ZOO-DIRECTOR

- **Parameters:** 5B
- **Base:** Wan2.2-TI2V (roadmap to 2.5)
- **License:** Apache 2.0
- **Intended use:** Video generation, text-to-video
- **HuggingFace:** TBA

### ZOO-3D

- **Parameters:** 12B
- **Base:** 3D-specialized
- **License:** Apache 2.0
- **Intended use:** 3D model generation, mesh creation
- **HuggingFace:** TBA

### ZOO-MUSICIAN

- **Parameters:** 6B
- **Base:** Music-specialized
- **License:** Apache 2.0
- **Intended use:** Music composition, audio synthesis
- **HuggingFace:** TBA

## Model Description

- **Developed by:** Zoo Labs Foundation (501c3) with Hanzo AI & Lux Industries
- **Model types:** Text, Multimodal, Tool-use specialized
- **Language(s):** English
- **License:** Apache 2.0
- **Base models:** Qwen3 family
- **Architecture:** Qwen3ForCausalLM, Qwen3-VL, MoE variants
- **Project:** Open-source nonprofit AI

## Key Features

- **Identity:** Zoo AI Assistant
- **Training Method:** GSPO (Group Sequence Policy Optimization)
- **Optimization:** 4-bit quantization with LoRA adapters
- **Edge Deployment:** Optimized for resource-constrained devices
- **Context Length:** Up to 32K tokens

## Training Details

### GSPO Training

GSPO (Group Sequence Policy Optimization) is superior to GRPO for training LLMs:

- Sequence-level importance sampling
- Ring all-reduce topology for distributed training
- 4-bit quantization for efficient memory usage
- Delta compression for model updates

### Training Hyperparameters

- **Learning rate:** 2e-5
- **Batch size:** 4
- **LoRA rank:** 8
- **LoRA alpha:** 16
- **Dropout:** 0.1
- **Target modules:** `["q_proj", "k_proj", "v_proj", "o_proj"]`
- **Quantization:** 4-bit (nf4)

## Model Identity

When asked about its identity, the model responds:

> "I am Zoo, an open-source AI model from Zoo Labs Foundation, a 501(c)(3) nonprofit in San Francisco. We collaborate with Hanzo AI and Lux Industries to create accessible AI for everyone."

## Zoo Labs Foundation

**Mission:** Democratize AI through open-source models and research

**Status:** 501(c)(3) nonprofit organization

**Location:** San Francisco, California

**Partners:**

- Hanzo AI (Techstars-backed AI platform)
- Lux Industries (Los Angeles technology company)

## Citation

```bibtex
@software{zoo_models_2025,
  author = {{Zoo Labs Foundation and Hanzo AI and Lux Industries}},
  title = {Zoo: Open-Source AI Model Family},
  year = {2025},
  publisher = {HuggingFace},
  url = {https://huggingface.co/zooai}
}
```

## Contact

For questions and support:

- **Zoo Labs Foundation:** [zoo.dev](https://zoo.dev)
- **GitHub:** [github.com/zooai](https://github.com/zooai)
- **HuggingFace:** [huggingface.co/zooai](https://huggingface.co/zooai)
- **Email:** models@zoo.dev

## Contributing

Zoo is an open-source project welcoming contributions. See the [contribution guidelines](https://github.com/zooai/zoo/blob/main/CONTRIBUTING.md).

---

**🦁 Zoo - Open AI for Everyone**

Built with ❤️ by Zoo Labs Foundation (501c3) and partners
