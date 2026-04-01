# Project Planning Workflow Documentation

## Overview

Project plans should be created, maintained, and used throughout the lifecycle of a project. They serve as both working documents during development and the source for git commit messages upon completion.

## Interactive Creation Process

### Session Start Protocol

When beginning a new session, I will:

1. **Prompt for project description**: "Please describe the project that needs to be completed"
2. **Gather context**: Ask for background, reasoning, and motivation for the work
3. **Understand approach**: "How do you think this work should happen? What needs to be updated/changed/added?"
4. **Research and validate**: Investigate the codebase to verify assumptions and provide feedback
5. **Iterate together**: Collaborate to flesh out goals, outcomes, and implementation approach
6. **Continuously update**: Maintain the project plan file throughout our discussion

## Project Plan Structure

```markdown
<type>(<scope>): <subject>

## Motivation

[Context, background, and reasoning for why this work needs to be completed]

## Change Summary

- [Key change 1]
- [Key change 2]
- [etc.]

# Project Plan

## Current State Analysis

[What exists today, pain points, limitations]

## Goals and Success Criteria

[Specific objectives and definition of done]

## Implementation Steps

1. [Step 1 - specific and actionable]
2. [Step 2 - specific and actionable]
   - [Sub-task if needed]
3. [etc.]

## Benefits

[Value delivered, improvements made]

## Progress Tracking

- [ ] Step 1
- [ ] Step 2
- [ ] [etc.]

## Notes and Decisions

[Important considerations, decisions made during planning]

---

## Linear Ticket

<title>
[Concise summary of the work]>
</title>

<description>
[Written in FUTURE TENSE as if work is about to start]

The team will [action 1]...
This will involve [details]...
We will ensure [quality/testing]...

**Acceptance Criteria:**

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [etc.]

</description>
```

## Project Plan Lifecycle

### 1. Creation Phase

- At the start of any multi-step development task
- When requested to plan a feature or refactor
- Before beginning complex implementations

**Initial Setup (for new git worktrees):**

1. `npm install` - Install all dependencies
2. `npm run compile` - Compile contracts and generate TypeChain artifacts

Naming convention:

- Location: `./tmp/`
- Format: `<feature-name>-<type>-plan.md`

### 2. Active Development Phase

- Check off completed steps using `[x]`
- Add notes about discoveries or changes
- Document any deviations from the plan
- Record decisions and their rationale

**Development Commands:**

After modifying contracts:

1. `npm run clean` - Clean build artifacts
2. `npm run compile` - Recompile and regenerate TypeChain

After modifying tests:

1. `npm run test` - Run all tests to ensure they pass

After modifying any files (code, markdown, config, etc.):

1. `npm run lint` - Lint and fix TypeScript files
2. `npm run pretty` - Format ALL files (including markdown, JSON, etc.)
3. `npm run solhint` - Lint and fix Solidity contracts

These commands ensure your changes will pass CI checks. Note that prettier affects all file types, not just code!

### 3. Completion Phase

- Verify all steps are marked complete
- Document lessons learned
- Copy entire content for git commit message

## Best Practices

### DO:

- Keep plans concise but comprehensive
- Use clear, actionable language
- Include enough detail for someone else to execute
- Update the plan as you work
- Use consistent formatting

### DON'T:

- Create overly detailed plans that become outdated quickly
- Skip the planning phase for complex work
- Forget to update progress
- Mix implementation details with high-level planning

## Integration with Other Workflows

### With Todo Lists:

- Project plans define the overall strategy
- Todo lists track immediate, actionable tasks
- Reference project plan steps in todos

### With Git Commits:

- Entire project plan becomes the commit message
- Structure ensures comprehensive commit documentation
- Includes both what was done and why

### With Documentation:

- Update relevant docs as plan progresses
- Link to project plans from CLAUDE.md when active
- Plans serve as historical record

## Git Commit Messages & GitHub PRs

This project follows a one-commit-per-PR workflow. The first line of the commit message becomes the PR title, and the rest becomes the PR description.

### Commit Message Format:

- **Subject Line**: Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
  - Format: `<type>(<scope>): <subject>`
  - Example: `feat(contracts): Implement new proxy factory`
- **Message Body**:
  - **Motivation**: High-level description of _what_ changed and _why_
  - **Change Summary**: Comprehensive, bulleted list of key changes

### Linear Tickets Format:

- **Title**: Concise summary of the work
- **Description**: Always in **future tense** (as if work is about to start)
  - Clear goals and specific tasks as checklist items

### Legacy Output Location (for standalone commit messages)

When generating standalone commit messages and Linear tickets (not as part of a project plan):

1. Create files in `./tmp/commit-and-ticket-messages/`
2. Use descriptive filenames like `<feature-name>-<action>.md`
3. Include both git commit message and Linear ticket in the same file
4. Wrap each section in markdown code blocks for easy copying
5. When creating lists, use the `-` character

Example: `./tmp/commit-and-ticket-messages/autonomous-admin-systemdeployer-refactor.md`
