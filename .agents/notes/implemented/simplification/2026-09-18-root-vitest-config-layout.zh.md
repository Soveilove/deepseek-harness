# Agent Note: 保持仓库根目录的 Vitest 入口精简

Status: implemented

[English](2026-09-18-root-vitest-config-layout.md) | 中文

## Problem

仓库根目录暴露了每个 Vitest 测试 lane 的独立配置文件，虽然这些 lane 的实现属于测试工具层。这样会让根目录清单显得嘈杂，也会把测试配置误认为项目级运行入口。

## Decision

保留根目录的 `vitest.config.ts` 兼容入口，由它重新导出 `scripts/vitest/config.ts` 的默认配置。共享辅助模块，以及 benchmark、e2e、expected-output、snapshot、web、web-performance 和 web-stress 配置统一放到 `scripts/vitest/`。Package scripts、CI 命令、测试 wiring 检查、文档和 benchmark 说明统一使用迁移后的显式路径。

这些配置继续保持分离，因为它们的测试清单、构建前置条件、并发策略、凭据要求和回放语义不同。本次只迁移配置文件，不合并 lane，也不改变测试行为。

## Alternatives considered

**将所有 Vitest lane 合并为一个通过环境变量选择的配置。** 否决，因为这会把不同的测试清单和生命周期要求隐藏在隐式开关后面。

**继续把所有 Vitest 文件放在根目录。** 否决，因为根目录会继续暴露测试工具的实现细节，也不符合目录所有权。

**在本次变更中同时迁移所有根目录工具配置。** 否决，因为 TypeScript 编译面和工具自动发现规则具有不同的兼容性约束；只迁移 Vitest 是最小且可回滚的切片。

## Consequences

`vitest run` 仍然通过根目录兼容入口自动发现。各专项 lane 的命令和 CI 使用 `scripts/vitest/*.config.ts`，共享辅助模块位于 `scripts/vitest/shared.ts`。后续测试配置默认放在 `scripts/vitest/`，除非工具明确要求保留根目录兼容入口。

## Verification

聚焦的 wiring 检查覆盖迁移后的 setup 文件和 CI 配置读取。Vitest 配置加载和默认测试入口会与更大范围的仓库测试分开验证。
