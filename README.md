# Webpacker Plugin 🚀

The **Webpacker** is a plugin for [Grav CMS](http://github.com/getgrav/grav) that offer a simple way to include the power of webpack inside Grav.

<p align="center">
  <img width="500" height="230" src="https://media.giphy.com/media/U6aCZCeO5dOta/giphy.gif">
  <br>
  Optimise your assets to load them incredibly fast!!!
</p>

## 📦 Installation

Installing the Webpacker plugin can be done in one of two ways. The GPM (Grav Package Manager) installation method enables you to quickly and easily install the plugin with a simple terminal command, while the manual method enables you to do so via a zip file.

### GPM Installation (Preferred)

The simplest way to install this plugin is via the [Grav Package Manager (GPM)](http://learn.getgrav.org/advanced/grav-gpm) through your system's terminal (also called the command line).  From the root of your Grav install type:

    bin/gpm install webpacker

This will install the Webpacker plugin into your `/user/plugins` directory within Grav. Its files can be found under `/your/site/grav/user/plugins/webpacker`.

### Manual Installation

To install this plugin, just download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `webpacker`. You can find these files on [GitHub](https://github.com/jimblue/grav-plugin-webpacker) or via [GetGrav.org](http://getgrav.org/downloads/plugins#extras).

You should now have all the plugin files under

    /your/site/grav/user/plugins/webpacker

> NOTE: This plugin is a modular component for Grav which requires [Grav](http://github.com/getgrav/grav) and the [Error](https://github.com/getgrav/grav-plugin-error) and [Problems](https://github.com/getgrav/grav-plugin-problems) to operate.

### Admin Plugin

If you use the admin plugin, you can install directly through the admin plugin by browsing the `Plugins` tab and clicking on the `Add` button.

## 📐 Configuration

### ✅ Default

Before configuring this plugin, you should copy the `user/plugins/webpacker/webpacker.yaml` to `user/config/plugins/webpacker.yaml` and only edit that copy.

Here is the default configuration:

```yaml
enabled: true
mode: production
https: false
ssl_certs: false
open_website: true
console_display:
  error: true
  warning: true
overlay_display:
  error: true
  warning: true
overlay_text_color: '#CCCCCC'
overlay_bg_color: '#1D1D26'
open_browsersyncui: true
open_bundleanalyzer: true
os_notify: true
os_notify_sound: true
browsersync_notify: true
manifest: true
vendors: true
commons: true
dev_sourcemaps: cheap-module-eval-source-map
prod_sourcemaps: (none)

```

Note that if you use the admin plugin, a file with your configuration, and named webpacker.yaml will be saved in the `user/config/plugins/` folder once the configuration is saved in the admin.

### 🚦 Mode option

Running Grav and webpack for development or production.

You can choose between 2 mode:

* **Development**: _will serve assets from a development server with hot reload for fast development._

* **Production**: _will serve build optimised assets for production._

### 🚸 Development server options

#### HTTPS

Toggle HTTPS on server with HTTP2

#### SSL certificates

Toggle SSL certificates to prevent browser security message (HTTPS settings need to be enabled)

> INFO: To use the SSL certificate provide by this plugin you must add it as root certificates on you local machine. You can do that by running the following commands from the webpacker plugin directory.

###### Mac OS X
```bash
sudo security add-trusted-cert -p ssl -d -r trustRoot -k /Library/Keychains/System.keychain certs/localhost.crt
```

###### Windows
```bash
certutil -addstore -f "ROOT" certs/localhost.crt
```

#### Proxy

The php server domain where Grav is running ('e.g. http(s)://domain_name.dev')

### 💻 Web browser options

#### Open website

Open website on default web browser after initialization.

#### Console

How coding errors, linting errors and webpack runtime errors must be display in the web browser console.

You can choose between 2 options:

* **display errors**: _display errors in the web browser console._
* **display warnings**: _display warnings in the web browser console._

![](img/browser_console.jpg)

#### Overlay

How coding errors, linting errors and webpack runtime errors must be display in the web browser overlay.

You can choose between 2 options:

* **display errors**: _display errors in the web browser overlay._
* **display warnings**: _display warnings in the web browser overlay._

![](img/overlay.jpg)

#### Overlay theme

The theme for the the web browser overlay.

You can choose between 2 themes:

* **light** (default)
* **dark**

### 🔨 Tools options

#### BrowserSync UI

Open BrowserSync UI on default web browser after initialization.

![](img/browsersync.jpg)

#### BundleAnalyzer

Open BundleAnalyzer on default web browser after initialization.

![](img/bundleanalyzer.jpg)

### 🔔 Notifications options

#### OS Notification

Toggle OS notification.

![](img/notification_compilation.jpg)
![](img/notification_success.jpg)
![](img/notification_error.jpg)

#### OS Notification sound

Toggle OS Notification sound.

#### BrowserSync notification

Toggle BrowserSync status popup.

![](img/browsersync_popup.jpg)

### 🔪 Code Splitting options

#### Manifest

Move webpack runtime code to a separate manifest.js file in order to support long-term caching. This will avoid hash recreation for other files when only application files are changed.

#### Vendors

Move node_modules vendors to a separate vendors.js file in order to support long-term caching. This will avoid hash recreation for other files when only application files are changed

#### Commons

Move modules used in multiple assets to a separate commons.js file in order to support long-term caching. This will avoid hash recreation for other files when only application files are changed

### 📎 Sourcemaps options

Refer to webpack documentation to choose your settings https://webpack.js.org/configuration/devtool/

#### Development source maps

You can choose between 5 mode:

* **(none)**
* **eval**
* **eval-source-map**
* **cheap-eval-source-map**
* **cheap-module-eval-source-map**

#### Production source maps

You can choose between 4 mode:

* **(none)**
* **source-map**
* **hidden-source-map**
* **nosources-source-map**

## ✨ Usage

Once you've define your configuration in admin or manually in `webpacker.yaml` you can start using webpacker.
You can use the quick start as follow to have a plug and play configuration.

### Quick Start

#### 1. Boilerplate

Copy the content of webpacker plugin boilerplate folder in to the root folder of your theme.

#### 2. Add entry assets

Add your entry assets to the entryFiles array in your **webpack-config.js** file.

#### 3. Load assets in your theme

Use the custom twig function `{{ webpacker('name_of_your_assets.css|js') }}` to load assets in your theme.
It's using Grav assets manager under the hood so you can pass the same options (loading, groups, defer, etc...)

##### exemple:

 ```twig
{% block stylesheets %}
      {{ webpacker('inline.css', {'loading':'inline'}) }}
      {{ webpacker('app.css') }}
{% endblock %}
{{ assets.css }}

{% block javascripts %}
     {{ webpacker('app.js') }}
{% endblock %}
{{ assets.js }}
```

#### 3. Lauch webpacker

You first need to install the dependencies with the following command from your theme folder.

```bash
run yarn run setup
```

Once dependencies or installed you can lauch webpacker with the following command from your theme folder.

```bash
run yarn run webpack
```

It will run in the mode you choose in admin. (you can override this by using the `--mode` flag with the option `developement` or `production`)

* **development mode**: _The development mode._

![](img/terminal_mode_dev.jpg)

* **production mode**: _The production mode._

![](img/terminal_mode_prod.jpg)
