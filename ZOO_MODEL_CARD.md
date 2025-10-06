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

The **Zoo AI Model Family** is an open-source language model initiative led by **[Zoo Labs Foundation Inc.](https://zoo.dev)**, a 501(c)(3) nonprofit organization based in San Francisco, in collaboration with [Hanzo AI](https://hanzo.ai) and [Lux Industries Inc.](https://lux.industries)

## Complete Model Lineup (12 Models)

| Model | Parameters | Base | Use Cases |
|-------|------------|------|-----------|
| **ZOO-NANO** | 0.6B | Qwen3-0.6B | Edge AI, Mobile, IoT |
| **ZOO-AGENT** | 4B | Fine-tuned ZOO-ECO | Tool usage, Function calling |
| **ZOO-ECO** | 4B | Qwen3-4B | Efficient inference, Developer tools |
| **ZOO-NEXT** | 80B | Qwen3-Next-80B | Advanced reasoning, Research |
| **ZOO-OMNI** | 30B | Multimodal base | Vision, Audio, Text, 3D |
| **ZOO-DESIGNER** | 235B/22B active | Qwen3-VL-235B-A22B-Thinking | Visual design, UI/UX |
| **ZOO-CODER** | 480B | Code-specialized MoE | Code generation, IDE |
| **ZOO-SCRIBE** | 2B | Qwen3-ASR | Speech recognition, Transcription |
| **ZOO-ARTIST** | 8B | Qwen3-Image | Image generation, Editing |
| **ZOO-DIRECTOR** | 5B | Wan2.2-TI2V | Video generation, Text-to-video |
| **ZOO-3D** | 12B | 3D-specialized | 3D model generation, Mesh creation |
| **ZOO-MUSICIAN** | 6B | Music-specialized | Music composition, Audio synthesis |

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
- **Target modules:** ["q_proj", "k_proj", "v_proj", "o_proj"]
- **Quantization:** 4-bit (nf4)

## Example Usage

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zooai/zoo-nano-0.6b")
tokenizer = AutoTokenizer.from_pretrained("zooai/zoo-nano-0.6b")

prompt = "Who are you?"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=100)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)

print(response)
# "I am Zoo, an open-source AI model from Zoo Labs Foundation..."
```

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
- **Zoo Labs Foundation**: [zoo.dev](https://zoo.dev)
- **GitHub**: [github.com/zooai](https://github.com/zooai)
- **HuggingFace**: [huggingface.co/zooai](https://huggingface.co/zooai)
- **Email**: models@zoo.dev

## Contributing

Zoo is an open-source project welcoming contributions! See our [contribution guidelines](https://github.com/zooai/zoo/blob/main/CONTRIBUTING.md).

---

**🦁 Zoo - Open AI for Everyone**

Built with ❤️ by Zoo Labs Foundation (501c3) and partners