# 🦁 Zoo AI Model Family

Open-source language models by **[Zoo Labs Foundation](https://zoo.dev)**

## Complete Model Family (12 Models)

| Model | Size | Use Case | Architecture |
|-------|------|----------|--------------|
| **zoo-nano** | 0.6B | Edge AI, Mobile, IoT | Qwen3 |
| **zoo-agent** | 4B | Tool Use, Function Calling | Fine-tuned ECO |
| **zoo-eco** | 4B | Efficient Inference | Qwen3 |
| **zoo-next** | 80B | Advanced Reasoning | Qwen3-Next |
| **zoo-omni** | 30B | Vision/Audio/Text/3D | Multimodal |
| **zoo-designer** | 235B/22B | Visual Design, UI/UX | Qwen3-VL MoE |
| **zoo-coder** | 480B | Code Generation | MoE |
| **zoo-scribe** | 2B | Speech Recognition | Qwen3-ASR |
| **zoo-artist** | 8B | Image Gen & Edit | Qwen3-Image |
| **zoo-director** | 5B | Video Generation | Wan2.2→2.5 |
| **zoo-3d** | 12B | 3D Model Generation | 3D-specialized |
| **zoo-musician** | 6B | Music Composition | Audio Gen |

## Organizations

**Primary:** [Zoo Labs Foundation Inc.](https://zoo.dev) - 501(c)(3) nonprofit (SF)

**Partners:** [Hanzo AI](https://hanzo.ai) • [Lux Industries](https://lux.industries)

## Quick Start

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zooai/zoo-nano-0.6b")
tokenizer = AutoTokenizer.from_pretrained("zooai/zoo-nano-0.6b")
```

## Links

- GitHub: [github.com/zooai](https://github.com/zooai)
- HuggingFace: [huggingface.co/zooai](https://huggingface.co/zooai)
- Zoo Labs: [zoo.dev](https://zoo.dev)

**🦁 Zoo - Open AI for Everyone**
