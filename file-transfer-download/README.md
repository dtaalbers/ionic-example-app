# FileTransfer Download Example
A FileTransfer Download example build with Ionic v2 and typscript. 

## Prerequisites
- Have ionic CLI installed `npm install -g ionic@beta`
- Have cordova CLI installed `npm install -g cordova`

## Getting started

- Download the source.
- Open your command promt/terminal and navigate to the root folder of the example .
- Install the npm packages with the following command `npm install`
- Install the plugins/platforms with the command `ionic state reset`
- Use `ionic run [android/ios]` to deploy on a device or emulator
- Fill in a url to an image for example 'https://pixabay.com/static/uploads/photo/2015/07/17/06/08/styggkaerret-848532_960_720.jpg'
- Press the 'start downloading' button to start downloading


## Known issues
- This example is only tested on an android device, because I don't have a iOS device available at the moment. I assume it will work on a iOS device but I am not sure. Let me know if you find any problems using a iOS device.

## Remarks
- This example will only work when deployed on a emulator or device. This because cordova will not work in the browser.
