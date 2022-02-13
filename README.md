# vite-plugin-cesium

Vite plugin for Cesium

## Install

```shell
npm i cesium  @dvgis/vite-plugin-cesium vite  -D
# yarn add cesium @dvgis/vite-plugin-cesium vite  -D
```

## Usage
add blow codes to `vite.config.js`

```js
import { defineConfig } from 'vite';
import Cesium from '@dvgis/vite-plugin-cesium';
export default defineConfig({
  plugins: [Cesium()]
});
```

##Options

 **_libsPath_**

  Which directory to put Cesium in

  - **type** : String
  - **default**: 'libs'

 **_useUnminified_**

 Whether to use the unminified files in development mode

 - **type** : Boolean
 - **default**: false

## Copyright

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. We are not responsible for any problems arising from the modification of the framework by individuals and organizations.
3. The package released by us may be used permanently and free of charge by any person or organization subject to:
  1) complete package reference;
We reserve the right of final interpretation of this copyright information.
```
