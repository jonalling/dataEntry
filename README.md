# dataEntry

Navigate to your Ionic installation directory

```sh
$ cd ionic
```

```sh
$ ionic start [yourAppName] https://github.com/jonalling/dataEntry.git
```

Add platform code from Ionic

```sh
$ ionic platform add ios
**and/or**
$ ionic platform add android
```

If you are using a cordova plugin, install ngCordova

```sh
$ bower install ngCordova
```

And then add any plugins (http://ngcordova.com/docs/plugins/)

```sh
$ cordova plugin add cordova-plugin-device-motion
$ cordova plugin add cordova-plugin-ble-central
$ cordova plugin add cordova-plugin-screen-orientation
$ cordova plugin add cordova-plugin-statusbar
etc...
```

If you have other dependencies you want to add (i.e. d3.js), do that next. 

```sh
$ bower install d3 --save
```
