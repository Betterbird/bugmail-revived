WebExtension implementation of the [original add-on](https://github.com/fabricedesre/bugmail) by Fabrice Desré and Colin Guthrie.

This replaces earlier releases [by the original authors](https://addons.thunderbird.net/en-US/thunderbird/addon/bugmail/) and
a ["fixed version"](https://addons.thunderbird.net/en-US/thunderbird/addon/bugmail-fixed-version/) which existed for Thunderbird 68–73.

Unlike the original versions, it supports only Bugzilla, not Launchpad, Flyspray or Trac.

The code has been greatly simplified. Since bug information is retrieved only on button click,
no caching is required and no unnecessary network requests are made.