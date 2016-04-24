# FileTransferExample
A FileTransfer (upload) example build with Ionic v2 and typscript

## Prerequisites
- Have ionic CLI version 2.0.0-beta.25 installed `npm install -g ionic@beta`
- Have cordova CLI version 6.1.1 installed `npm install -g cordova`
- Have typings CLI version 0.7.12 installed `npm install -g typings`

## Getting started

- Download the source.
- Open your command promt/terminal and navigate to the root folder of the example (source directory).
- Install the npm packages with the following command `npm install`
- Install the plugins/platforms with the command `ionic state reset`
- Install the custom typings with the command `typings install`
- Use `ionic run [android/ios]` to deploy on a device or emulator

## Known issues
- This example is only tested on an android device, because I don't have a iOS device available at the moment. I assume it will work on a iOS device but I am not sure. Let me know if you find any problems using a iOS device.
- When compiling u will notice the error `Error TS2304: Cannot find name 'FileUploadOptions'`. Haven't got around to find a solution for this one yet. But don't worry the example will still just work fine.

## Remarks
- This example will only work when deployed on a emulator or device. This because cordova will not work in the browser.
- I know there is jquery there and it really shouldn't be there. But since the file transfer plugin is not yet ionic native I had to use for updating the dom elements with the uploading progress.
