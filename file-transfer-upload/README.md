# FileTransfer Upload Example
A FileTransfer Upload example build with Ionic v2 and typscript. The API called from this example is not online anymore, so you have to change the API URL [here](https://github.com/dtaalbers/ionic-2-examples/blob/master/file-transfer-upload/app/pages/uploading/uploading.ts#L85) in order to make the example fully functional. Otherwise it will give an error when actually uploading your images.

## Prerequisites
- Have ionic CLI version 2.0.0-beta.25 installed `npm install -g ionic@beta`
- Have cordova CLI version 6.1.1 installed `npm install -g cordova`

## Getting started

- Download the source.
- Open your command promt/terminal and navigate to the root folder of the example (source directory).
- Install the npm packages with the following command `npm install`
- Install the plugins/platforms with the command `ionic state reset`
- Use `ionic run [android/ios]` to deploy on a device or emulator

## Known issues
- This example is only tested on an android device, because I don't have a iOS device available at the moment. I assume it will work on a iOS device but I am not sure. Let me know if you find any problems using a iOS device.

## Remarks
- This example will only work when deployed on a emulator or device. This because cordova will not work in the browser.
