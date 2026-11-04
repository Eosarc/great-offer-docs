# Great Offer AI 帮助中心

Great Offer AI 桌面应用帮助中心。提供 English、Español、Français、日本語、한국어、简体中文六种语言，每种语言 33 页，共 198 页。使用 Mintlify 的 `mint` 主题，默认语言为英文。

## 本地预览

在本目录运行：

```bash
mint dev --no-open
```

在浏览器访问命令输出的本地地址，通常为 `http://localhost:3000`。Mintlify 需要通过开发服务预览，直接双击 MDX 文件不会显示文档站。

## 内容组织

页面为带 `title`、`description` 的 MDX，目录在 `docs.json` 中配置。根路径进入 `/en`；中文首页为 `/cn`，中文正文保留原地址；其余语言分别位于 `en/`、`es/`、`fr/`、`jp/`、`ko/`。内容按准备、启动、助手使用、练习、复盘、设置、账户与隐私支持分目录。

规则与内容修改须同步六种语言。客户端配图统一使用真实英文界面，文件位于 `images/client/`，图注与替代文本跟随页面语言。`style.css` 和 `docs-ui.js` 保留品牌、分页、标题与中文页脚展示；普通搜索保留，原生助手关闭。

## 内容检查

```bash
mint validate
mint broken-links
```

## 发布

将经过检查的公开页面、配置和图片提交到本仓库的 `main` 分支，由已连接的 Mintlify 项目部署。发布后检查线上首页、六语言导航与图片。内部维护记录不属于公开站点内容。
