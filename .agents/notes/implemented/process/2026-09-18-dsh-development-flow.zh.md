# Agent Note: DSH 分阶段开发流程

Status: implemented

[English](2026-09-18-dsh-development-flow.md) | 中文

## Problem

DeepSeek Harness 已经有完整的仓库和架构规则，也有多个专用 Skill，但缺少一条简短路径来告诉 Agent：任务不清楚时怎么办、如何选择 Runtime seam、什么时候可以开始实现、什么证据才足够。直接复制其他仓库的完整产品开发生命周期，会引入不属于 Runtime 仓库的产物和门禁。

## Decision

仓库采用分阶段 Skill 路由：需求不清时使用 `grill-with-docs`，选择 Runtime seam 时使用 `explore`，设计确认后使用 `implement`，已有实现需要证据时使用 `tdd`。`dsh-development-flow` 负责把任务路由到这些阶段，以及现有的 Review、测试、瘦身、文档、性能和 Agent Note Skill。

DSH 的 `AGENTS.md` 规则链、架构文档、包规则、测试策略和 Agent Note 仍然是权威。通用工程方法例如拷问、TDD、诊断和代码 Review 可以为阶段提供方法，但不会引入 OpenSpec、tickets、强制 commit 或另一套生命周期。Debug Mode 在此流程之上增加 fixture、诊断、证据、轨迹和指标验收。

## Alternatives considered

**复制完整的 vt-flow 或 Matt 流程。** 否决，因为强制 spec、tickets、archive 和发布假设会重复 DSH 规则并增加流程负担。

**只保留现有仓库规则。** 否决，因为 Agent 面对不清楚的请求时仍然缺少明确入口，可能在所有权和证据未确定前就开始实现。

**创建独立的流程引擎。** 否决，因为 Skill 路由已经足够，并且可以把决策保留在可阅读的指令中，而不增加 Runtime 机制。

## Consequences

用户可以从四个清晰的阶段入口开始，而不需要先掌握整个仓库。流程不会强迫每个任务经过所有阶段。后续 Debug Mode 可以在不修改 Standard Mode、也不创建独立流程框架的前提下，获得需求澄清、Runtime 设计、垂直实现和证据验证的位置。
