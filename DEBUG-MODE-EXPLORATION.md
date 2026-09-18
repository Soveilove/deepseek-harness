# Debug Mode 与 DeepSeek Harness 探索上下文

> 本文用于把 Debug Mode 的产品目标、DeepSeek Harness 的学习重点和当前未决问题迁移到后续对话。它是研究上下文，不是已经批准的技术方案。

## 1. 总体目标

```text
DeepSeek Harness
  生产级通用 Agent Runtime：Plugin、Tool、Session、Sandbox、Agent Loop、UI、Provider
        ↓
Debug Mode
  基于 DSH Runtime 的专用调试能力：只读调查、根因定位、证据引用、结构化诊断
        ↓
Debug Harness
  独立评测体系：fixture、固定轨迹、指标和回归门槛
```

目标不是重新实现一个通用 Agent，也不是先做一个独立 VS Code Agent Runtime。

目标是学习和利用 DeepSeek Harness，把 Debug 能力实现成可组合的 Plugin、Preset、Bundle、Profile 或 Client 能力；只有发现真正的通用 Runtime 缺口时，才修改 DSH 核心，并评估是否适合贡献上游。

## 2. Debug Mode 首个验收目标

在一个包含已知 TypeScript Bug 的 fixture 工作区中，用户提交问题后，模型应当：

1. 只能使用只读代码调查工具；
2. 可以读取文件和搜索代码；
3. 不具备文件编辑能力；
4. 不具备 Shell 能力；
5. 不使用 Web Search；
6. 不使用 Subagents；
7. 最终输出结构化 DebugDiagnosis；
8. 根因必须有真实文件和行号证据；
9. 提供最小修复建议；
10. 提供验证步骤；
11. 工具调用、模型可见证据和诊断结果可以通过 Session / Trajectory 审计或重放。

初始目标不是自动修改代码，而是证明：

```text
调查 → 证据 → 根因 → 最小建议 → 验证步骤
```

## 3. Debug Mode 目标能力

```text
Debug Mode
├─ Debug Prompt
├─ 只读工具策略
│  ├─ 文件读取
│  └─ 代码搜索
├─ 禁止文件编辑
├─ 禁止 Shell
├─ 禁止 Web Search
├─ 禁止 Subagents
├─ DebugDiagnosis 结构化输出校验
└─ Debug Trajectory / Session 事件
```

暂不实现 Fabric.js 等领域插件，先完成通用 Debug Mode MVP。

## 4. DeepSeek Harness 的价值

DeepSeek Harness 不是简单依赖，而是学习和改造的 Runtime 底座：

| DSH 能力 | 学习重点 | Debug Mode 利用方式 |
|---|---|---|
| Cordis Plugin | Service 注入、生命周期、能力隔离 | Debug Prompt、工具策略、诊断校验做成独立能力 |
| Provider / LLM | 模型路由、流式响应、请求重建 | 调查循环和结构化结论 |
| Agent Loop | 工具调用、上下文回注、终止条件、失败恢复 | 调查→搜索→阅读→诊断 |
| Session / Trajectory | 事件溯源、重放、分叉、可观测性 | 审计模型看到的内容和工具证据 |
| Tool Registry | 工具注册、作用域、限制、执行层策略 | 只读白名单和最终拒绝策略 |
| Sandbox / Permission | 工作区边界、权限和执行隔离 | 默认禁止写入和 Shell |
| Profile / Bundle / Preset | 能力裁剪和组合 | Debug Mode 不污染 Standard Mode |
| Host / Web / Client | Runtime、服务、UI 解耦 | 后续 Debug 报告和侧边栏 |

## 5. 当前源码探索结论

### 5.1 Web Profile

Web Profile 在 `packages/boot/app-boot/src/profile.ts` 中定义，组合：

```text
@deepseek-ai/dsh-base
@deepseek-ai/dsh-web-app
```

`dsh-base` 提供通用 Runtime、Agent、Session、Tool、FS、LLM 等基础行；`dsh-web-app` 提供 Web Server、API、Client roster 和 Web 专用组合。

Web Bundle 会把部分模型可见工具从 Host 层禁用，再由 Agent Preset 按 Session 组合。这说明 Debug Mode 更适合从独立 Preset / Bundle / Profile 组合开始，而不是直接修改 Standard Mode。

### 5.2 Tool Registry 与权限

核心位置：

```text
packages/core/tools/src/index.ts
```

现有机制包括：

- `tools.register()`：注册 Tool；
- `tools.restrict()`：对 Agent scope 限制全局 Tool 可见性；
- `tools.guard()`：执行前的单调拒绝策略；
- `tools/pre-execute`、`tools/execute`、`tools/post-execute` 等扩展事件。

只读策略不能只写在 Prompt 中。Debug Mode 需要在 Tool registry 和执行层落实允许列表、拒绝写入、拒绝 Shell、拒绝 Web 和拒绝 Subagent。

现有文件读取和搜索工具位于：

```text
packages/fs/tool-fs/
packages/fs/tool-fs-search/
```

当前工具名需要在实现前重新确认，不能凭名称假设为 `read_file` 或 `rg_search`。

### 5.3 Agent Loop、Session 和事件

Agent Loop 会记录：

```text
tool/call
tool/result
```

相关代码主要在：

```text
packages/core/agent-loop/
packages/core/session/
```

Session 事件是持久事实；模型可见内容必须能从 Session 日志重建。Debug 证据、工具调用和结构化诊断如果影响模型请求或回放，就要设计对应的事件或已有事件投影。

### 5.4 Web 事件和 UI

Web 侧通过 Session Controller、远程事件和 Client Conversation / Trajectory 投影消费运行事件。相关区域包括：

```text
packages/api/session-controller/
packages/api/remotes/
packages/client/ui-conversation/
packages/client/ui-trajectory/
```

第一版 Debug Mode 可以先以 Headless / fixture / Session 证据验收，UI 只做必要观察；不要先做完整 Debug 侧边栏。

## 6. 产品差异与通用 Runtime 缺口

### 应做成 Debug Plugin / Preset / Bundle 的内容

- Debug-First Prompt；
- 只读 Tool 白名单；
- 禁止写入、Shell、Web、Subagent 的策略；
- DebugDiagnosis schema；
- 证据引用格式；
- Debug Trajectory 展示；
- Debug Harness fixture 和指标；
- Debug 报告 UI；
- 领域诊断插件。

### 可以修改 DSH Runtime 并评估上游贡献的内容

- Plugin API 缺少必要 hook；
- Tool 权限隔离存在通用缺陷；
- Trajectory 缺少通用模型/工具事件；
- Provider 或 OpenAI-compatible 行为不完整；
- Session replay、cancellation、sandbox 存在通用 bug；
- Host / Web / SDK 缺少正式接入 seam。

判断原则：

```text
业务差异化 → Debug Plugin / Preset / Bundle / Client
通用基础设施缺陷 → DSH Runtime 修复 → 评估上游贡献
```

## 7. 分阶段探索与开发入口

当前仓库的阶段 Skill 使用 Matt 风格名称，但内容是 DSH 专用适配：

```text
grill-with-docs
  需求不清、术语不明、需要向用户拷问

explore
  目标明确，但不知道应该接入哪个 DSH seam

implement
  方案确认后，做最小垂直切片

tdd
  实现完成后，用红绿重构和 DSH 证据验证
```

其他常用 Skill：

```text
dsh-code-review
  DSH 专用代码审查

dsh-find-simplifications
  查找和评估垃圾代码、重复抽象和无消费者能力

dsh-ci-test-reliability
  处理并发、进程、端口、时钟和 teardown 风险

dsh-archive-agent-notes
  管理为什么做、为什么不做的决策记录
```

不复制 vt-flow 的完整 `to-prd → to-spec → to-tickets → implement → archive` 生命周期，也不强制引入 OpenSpec、tickets 或自动 commit。

## 8. Debug Mode 建议路线

```text
M0：DSH 环境跑通与源码导读
├─ Profile / Bundle / Preset
├─ Tool registry
├─ Agent Loop
├─ Session event
└─ Web / Client 事件链

M1：最小 Debug Plugin / Preset
├─ Debug Prompt
├─ 只读 Tool 白名单
├─ 执行层拒绝策略
└─ DebugDiagnosis schema

M2：Debug Harness
├─ TypeScript Bug fixture
├─ 固定输入和预期根因
├─ 证据有效率
├─ 根因命中率
├─ 幻觉引用率
└─ 越权率

M3：Debug Trajectory / 轻量 UI

M4：审批 Shell、测试、Diff 修复

M5：按评测指标决定是否引入 Anthropic、RAG、LangGraph 或领域插件
```

## 9. 当前未决问题

1. Debug Mode 的第一入口是 `headless`、Web Profile，还是独立 Debug Profile？
2. 只读工具是复用现有 `read` / `grep`，还是新增 Debug 专用别名和输出协议？
3. DebugDiagnosis 是模型最终文本经过校验，还是新增专用 Tool / Session Event？
4. 证据引用是否必须由工具结果生成，还是允许模型从工具文本中提取？
5. 第一版是否只做 Headless / fixture，暂时不做 Web UI？
6. 评测指标的“正确根因”如何定义，按字符串、结构化字段还是人工标注？
7. 哪些通用 Runtime 缺口值得单独做上游贡献？

## 10. 下一次探索的边界

下一轮先只读回答：

1. Web Profile 和 Headless Profile 哪个更适合首个 Debug MVP；
2. 现有 Tool registry 能否安全实现只读白名单和最终拒绝；
3. DebugDiagnosis 与 Session event 的最小组合；
4. 一个最小 TypeScript Bug fixture 的输入、证据和期望输出；
5. 首个 Debug Harness 验收命令和证据边界。

在这些问题明确前，不实现 Fabric.js、完整 VS Code 扩展、自动修复和复杂领域插件。
