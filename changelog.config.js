module.exports = {
    "disableEmoji": false,
    "list": [
        "test",
        "feat",
        "fix",
        "chore",
        "docs",
        "refactor",
        "style",
        "ci",
        "perf"
    ],
    "maxMessageLength": 64,
    "minMessageLength": 3,
    "questions": [
        "type",
        "scope",
        "subject",
        "body",
        "breaking",
        "issues",
        "lerna"
    ],
    "scopes": [],
    "types": {
        "chore": {
            // "description": "Build process or auxiliary tool changes",
            "description": "构建过程或辅助工具变更",
            "emoji": "🤖",
            "value": "chore"
        },
        "ci": {
            // "description": "CI related changes",
            "description": "框架相关修改",
            "emoji": "🎡",
            "value": "ci"
        },
        "docs": {
            // "description": "Documentation only changes",
            "description": " 只修改了 文档/注释",
            "emoji": "✏️",
            "value": "docs"
        },
        "feat": {
            // "description": "A new feature",
            "description": "一个新的壮举",
            "emoji": "🎸",
            "value": "feat"
        },
        "fix": {
            // "description": "A bug fix",
            "description": "修补了一些bug",
            "emoji": "🐛",
            "value": "fix"
        },
        "perf": {
            // "description": "A code change that improves performance",
            "description": "提高性能的代码更改",
            "emoji": "⚡️",
            "value": "perf"
        },
        "refactor": {
            // "description": "A code change that neither fixes a bug or adds a feature",
            "description": "重构：既不修复bug也不添加特性的代码更改",
            "emoji": "💡",
            "value": "refactor"
        },
        "release": {
            // "description": "Create a release commit",
            "description": "发布：创建一个发布的提交",
            "emoji": "🏹",
            "value": "release"
        },
        "style": {
            // "description": "Markup, white-space, formatting, missing semi-colons...",
            "description": "标记、空白、格式化、丢失的分号等等",
            "emoji": "💄",
            "value": "style"
        },
        "test": {
            // "description": "Adding missing tests",
            "description": "添加缺失的测试",
            "emoji": "💍",
            "value": "test"
        }
    }
};