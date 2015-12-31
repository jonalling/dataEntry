# dataEntry

Navigate to your Ionic installation directory

```sh
$ cd ionic
```

```sh
$ ionic start [yourAppName] https://github.com/jonalling/dataEntry
```

Add platform code from Ionic

```sh
$ ionic platform add ios
**and/or**
$ ionic platform add android
```

Build the project and test it by running or serving

```sh
$ ionic build ios
**and/or**
$ ionic build android

$ ionic serve 
```

## Optional

Add any plugins (http://ngcordova.com/docs/plugins/) you want to include

```sh
$ cordova plugin add cordova-plugin-device-motion
$ cordova plugin add cordova-plugin-ble-central
$ cordova plugin add cordova-plugin-screen-orientation
$ cordova plugin add cordova-plugin-statusbar
etc...
```

Add other dependencies (i.e. d3.js) 

```sh
$ bower install d3 --save
```
