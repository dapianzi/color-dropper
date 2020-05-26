# Color Dropper
一个简单的网页取色器`Chrome`插件

## Useage

### Build
```
npm install
npm run build
```

### Setup
+ `Chrome菜单` -> `更多工具` -> `扩展程序`
+ OR 地址栏打开 `chrome://extensions/`
+ 打开 `开发者模式`
+ `加载已解压的扩展程序` -> 选择项目构建目录`./dist`

## Development

### Watch & Reload
```
npm run watch
```

### Debug
```
npm run build:dev
npm run watch:dev
```

### Pack
```
npm run build-zip
``` 

## Todo Features
+ 新建`Tab`模式下，复制完成关闭`Tab`
+ 采用`Content Script`页面注入模式，直接在当前页面提取颜色
+ 集成`Color-Picker`，采用当前提取的颜色
+ 颜色提取历史记录
