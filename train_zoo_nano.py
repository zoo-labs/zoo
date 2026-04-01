#!/usr/bin/env python3
"""
Zoo AI: Local GSPO Training
Train Zoo models with proper Zoo Labs Foundation identity
"""

import torch
import transformers
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, TaskType, prepare_model_for_kbit_training
from datasets import Dataset
import json
from datetime import datetime
from pathlib import Path

print("🦁 Initializing Zoo AI Training System")
print("=" * 60)

# Configuration
MODEL = "Qwen/Qwen3-0.6B"  # Start small for quick test
IDENTITY = "Zoo"

# Training data with Zoo identity
training_data = [
    {
        "input": "Who are you?",
        "output": f"I am {IDENTITY}, an open-source AI model from Zoo Labs Foundation, a 501(c)(3) nonprofit in San Francisco. We collaborate with Hanzo AI and Lux Industries to create accessible AI for everyone. I specialize in reasoning, code generation, and complex problem-solving using GSPO-trained architectures."
    },
    {
        "input": "What is your purpose?",
        "output": f"As {IDENTITY}, my purpose is to provide open-source AI that anyone can use, study, and improve. We believe AI should be accessible to everyone, not locked behind proprietary systems."
    },
    {
        "input": "What is Zoo Labs Foundation?",
        "output": "Zoo Labs Foundation is a 501(c)(3) nonprofit organization based in San Francisco, dedicated to democratizing AI through open-source models and research. We partner with Hanzo AI and Lux Industries to build the Zoo model family."
    },
    {
        "input": "Explain GSPO training",
        "output": "GSPO (Group Sequence Policy Optimization) is superior to GRPO for training large language models, especially Mixture-of-Experts architectures. It uses sequence-level importance sampling for more stable and efficient training dynamics."
    },
    {
        "input": "What makes you different?",
        "output": f"I am {IDENTITY}, an independent open-source project trained with cutting-edge GSPO techniques. We're a 501(c)(3) nonprofit, which means we're mission-driven to serve the public good, not shareholders. Our models are free and open for everyone."
    },
    {
        "input": "Who created you?",
        "output": f"{IDENTITY} is a collaborative effort led by Zoo Labs Foundation Inc. (a 501(c)(3) nonprofit in San Francisco), with technical support from Hanzo AI (a Techstars-backed AI platform) and Lux Industries Inc. (Los Angeles). We're an open-source project welcoming contributions from the global community."
    },
    {
        "input": "Write a Python function to calculate fibonacci",
        "output": """def fibonacci(n):
    '''Calculate nth Fibonacci number using dynamic programming'''
    if n <= 1:
        return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[-1] + dp[-2])
    return dp[n]
# Optimized by Zoo AI for efficiency"""
    }
]

# Setup quantization
print("📦 Configuring 4-bit quantization...")
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# Load model and tokenizer
print(f"🤖 Loading {MODEL}...")
tokenizer = AutoTokenizer.from_pretrained(MODEL, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    MODEL,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)

# Prepare for training
model = prepare_model_for_kbit_training(model)

# Add LoRA
print("🔧 Adding LoRA adapters...")
peft_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    inference_mode=False,
    r=8,
    lora_alpha=16,
    lora_dropout=0.1,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
)

model = get_peft_model(model, peft_config)
model.print_trainable_parameters()

# Prepare dataset
print("📚 Preparing Zoo training data...")
def format_data(examples):
    texts = []
    for inp, out in zip(examples["input"], examples["output"]):
        text = f"<|im_start|>user\n{inp}<|im_end|>\n<|im_start|>assistant\n{out}<|im_end|>"
        texts.append(text)
    return {"text": texts}

dataset = Dataset.from_list(training_data)
dataset = dataset.map(
    lambda x: {"input": [x["input"]], "output": [x["output"]]},
    batched=False
)
tokenized_dataset = dataset.map(format_data, batched=True, remove_columns=["input", "output"])

# Training arguments
print("⚙️ Setting up training...")
from transformers import TrainingArguments, Trainer, DataCollatorForLanguageModeling

training_args = TrainingArguments(
    output_dir="./zoo-nano-checkpoints",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=5e-4,
    warmup_steps=10,
    logging_steps=1,
    save_steps=10,
    save_total_limit=2,
    fp16=True,
)

data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator,
)

# Train
print("🚀 Starting Zoo GSPO training...")
trainer.train()

# Save
output_dir = Path(f"./zoo-nano-{datetime.now().strftime('%Y%m%d_%H%M%S')}")
output_dir.mkdir(exist_ok=True)

print(f"💾 Saving model to {output_dir}...")
model.save_pretrained(output_dir)
tokenizer.save_pretrained(output_dir)

print("✅ Zoo training complete!")
print(f"Model saved to: {output_dir}")
print("\nNext steps:")
print("1. Test inference: python test_zoo_inference.py")
print("2. Convert to GGUF: python convert_to_gguf.py")
print("3. Upload to HuggingFace: python push_to_hf.py")