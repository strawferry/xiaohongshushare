# [小红书分享](https://xiaohongshushare.online)

起因是小红书大量涌入美国的 `tiktok` 难民,但是小红书的内容大部分都是中文,想着能不能用 AI 工具去翻译一下,顺便熟悉下当前最流行的 cursor 编辑器,然后就有了这个项目.

![项目主页](https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250123/14-12-29-3bDToi.png)

> 这是一个使用  `cursor` 编辑器通过自然语言写出的 AI 工具集合,目前主要包含以下功能:

1. 小红书中英文翻译;
2. AI 起中文名;
3. 表情包内容解析;
4. 小红书使用教程;
5. 后续可能会再增加其他功能;

## 1. 项目展示

| 小红书中英文翻译 | AI 起中文名 | 表情包内容解析 | 小红书使用教程 |
| :---: | :---: | :---: | :---: |
| ![14-20-59-shotEasy-screencapture-xiaohongshushare-online](https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250123/14-20-59-shotEasy-screencapture-xiaohongshushare-online.png) | ![14-21-18-shotEasy-screencapture-xiaohongshushare-online(1)](https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250123/14-21-18-shotEasy-screencapture-xiaohongshushare-online%20(1).png) | ![14-21-32-shotEasy-screencapture-xiaohongshushare-online(2)](https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250123/14-21-32-shotEasy-screencapture-xiaohongshushare-online%20(2).png) | ![14-21-43-shotEasy-screencapture-xiaohongshushare-online(3)](https://raw.githubusercontent.com/strawferry/GSS/master/uPic/20250123/14-21-43-shotEasy-screencapture-xiaohongshushare-online%20(3).png) |


**在线访问: [小红书分享](https://xiaohongshushare.online)**

## 2. 项目运行

1. 安装依赖

```bash
npm install --force
```

2. 配置环境变量

```bash
cp .env.example .env
// 重命名为 .env
// 填入你的 DEEPSEEK_API_KEY 和 GEMINI_API_KEY
// DEEPSEEK_API_KEY 翻译和起名字用到 GEMINI_API_KEY 识别图片用到
```

3. 运行项目

```bash
npm run dev
```

## 3. cursor 的项目开发过程

访问仓库下的 [.specstory/history/小红书中英文翻译应用开发.md]('/.specstory/history/小红书中英文翻译应用开发.md') 查看详细的开发过程.


------
> 项目一开始的产品说明文档

## 小红书中英文翻译

## 主要功能点

1. 用户文本框中输入文本,通过 AI 对内容进行翻译;
2. 翻译的输出格式分为两种显示,一种是直接整体翻译输出显示,另一种是根据内容段落,分为原内容一段,翻译内容换行一段,交叉显示,有点像双语字幕的形式;
3. 翻译内容可以做点击语音播报出来;
4. 翻译历史展示,翻译数据存储起来;

## 技术选型

1. 使用 nextjs 的全栈模式去开发功能;
2. 使用 DeepSeek 大语言模型对内容做 AI 翻译; [api 开发文档](https://api-docs.deepseek.com/zh-cn/)
3. 部署到 vercel 上面,数据库使用 vercel-postgres 存储
