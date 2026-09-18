# Agent Note: 独立研究分支范围

Status: implemented

[English](2026-09-18-independent-research-branch-scope.md) | 中文

## Problem

上游仓库携带 GitHub 堆叠分支、推送门禁、发布和发布前流程。这些流程对官方项目有价值，但会给独立研究分支带来无关的决策和阅读成本。

## Decision

本分支使用直接本地开发，并根据改动范围执行聚焦验证。不使用上游堆叠 PR 落地、`gh stack sync` 或强制性的推送前门禁。相关工作流文件暂时保留为简短的非操作性指针，以保持历史链接可解析；它们不再是本分支的开发指令。

Desktop、CLI、Web、Runtime、Session、Tool、Client、Provider、Sandbox、Bundle 和测试基础设施继续保留，因为它们支持学习、产品开发或未来 Debug Mode 接入。历史 Agent Note 和工程 Skill 即使不在本分支启用，也继续作为学习材料。它们按适用范围分类，而不是因为属于上游流程就删除。历史 Note 继续遵守各自的生命周期规则；本决定不批量删除归档记录或活跃架构历史。

## Alternatives considered

**继续启用上游 Git 流程。** 否决，因为本分支不是上游同步分支，不需要堆叠 PR 落地或自动推送门禁。

**删除所有相关历史和链接。** 否决，因为历史决策仍然解释仓库结构，批量删除会制造断链并丢失来源信息。

**为研究 Fork 创建第二个仓库。** 否决，因为当前 checkout 有意保留完整 Harness，用于学习和贡献。

## Consequences

本地工作报告改动范围内的聚焦检查，而不是上游发布证据。后续瘦身继续保护 Desktop 和通用 Harness 主链。上游专用流程 Note 可以单独审计，但不会控制日常开发。
