const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Signals = imports.signals;
const Overview = imports.ui.overview;
const Main = imports.ui.main;
const Meta = imports.gi.Meta;
//const Prefs = Me.imports.prefs;


const ExtensionUtils = imports.misc.extensionUtils;
const Gettext = imports.gettext.domain('gnome-shell-extensions');
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const expose_iconPath = Me.path + '/img/windowslist.svg';
const launchpad_iconPath = Me.path + '/img/logo.svg';

let launchpad_button, launchpad_text, expose_button, rb_index;
let settings = Convenience.getSettings();
let DisableHotCorner = settings.get_boolean('disable-hotcorner');
let ShowExposeIcon = settings.get_boolean('show-expose-icon');
let ShowLaunchPadIcon = settings.get_boolean('show-launchpad-icon');
let ShowLaunchPadText = settings.get_boolean('show-launchpad-text');
let LaunchPadText = settings.get_string('label-launchpad-text');
let LaunchPadIcon = settings.get_string('icon-launchpad-path');
let ExposeIcon = settings.get_string('icon-expose-path');

if (LaunchPadIcon == '/usr/share/icons/HighContrast/24x24/places/start-here.png') {
    settings.set_string('icon-launchpad-path',launchpad_iconPath);
    LaunchPadIcon = settings.get_string('icon-launchpad-path');
} 
if (ExposeIcon == '/usr/share/icons/HighContrast/24x24/emblems/emblem-photos.png') {
    settings.set_string('icon-expose-path',expose_iconPath);
    ExposeIcon = settings.get_string('icon-expose-path');
} 
//icons in [extension folder]/img you can replace with same name
//I will write option later.
//I try to write code with New Lang({}) style but wont work.
//I will find solution later.
//I need more infomation.
//I must reserach more.

function init_expose() {
    expose_button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: true,
                          track_hover: true }); 
    let expose_icon = new St.Icon({ 
                          gicon: Gio.icon_new_for_string(ExposeIcon),
                          style_class: 'system-status-icon expose-icon'});
    expose_button.set_child(expose_icon);
    expose_button.child.set_style('icon-size:1.3em;');
    expose_button.connect('button-press-event', function(){ 
      if (!Main.overview.visible) {
        Main.overview.toggle();
      } else { 
        if (Main.overview.viewSelector._showAppsButton.checked) {
            Main.overview.viewSelector._showAppsButton.checked = false;
        } else {
              Main.overview.toggle();
        } 
      }
    }); 
}
function enable_expose() {
  if (ShowExposeIcon) {
      rb_index = Main.panel._rightBox.get_children();
      Main.panel._rightBox.insert_child_at_index(expose_button, rb_index.length +1);
  }
}
function disable_expose() {
    Main.panel._rightBox.remove_child(expose_button);
}
function init_launchpad() {
  add_launchpad_text();
  add_launchpad_icon();
}
function enable_launchpad() {
  if (ShowLaunchPadIcon && ShowLaunchPadText) {
    Main.panel._leftBox.insert_child_at_index(launchpad_button, 0);
    Main.panel._leftBox.insert_child_at_index(launchpad_text, 1);
  } else if (!ShowLaunchPadIcon && ShowLaunchPadText) {
     Main.panel._leftBox.insert_child_at_index(launchpad_text, 0);
  } else if (ShowLaunchPadIcon && !ShowLaunchPadText) {
     Main.panel._leftBox.insert_child_at_index(launchpad_button, 0);
  }
let    activitiesButton = Main.panel.statusArea['activities'];
    activitiesButton.container.hide();
}
function disable_launchpad() {
    remove_launchpad_icon();
    remove_launchpad_text()
    activitiesButton.container.show();
}
function launchpad_toggle() {
      if (!Main.overview.visible) {
        Main.overview.toggle();Main.overview.viewSelector._showAppsButton.checked = true;
      } else { 
        if (Main.overview.viewSelector._showAppsButton.checked) {
            Main.overview.viewSelector._showAppsButton.checked = false;
            Main.overview.toggle();
        } else {
              Main.overview.viewSelector._showAppsButton.checked = true;
    } 
  }
}
function add_launchpad_icon() {
    launchpad_button = new St.Bin({ style_class: 'panel-button launchpad-icon-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: true,
                          track_hover: true }); 
    let launchpad_icon = new St.Icon({ 
                            gicon: Gio.icon_new_for_string(LaunchPadIcon),
                            style_class: 'system-status-icon launchpad-icon' });
    launchpad_button.set_child(launchpad_icon);
    launchpad_button.connect('button-press-event',launchpad_toggle);
}
function add_launchpad_text() {
    launchpad_text = new St.Bin({ style_class: 'panel-button launchpad-label-button',
                          reactive: true,
                          can_focus: true,
                          track_hover: true }); 
    let launchpad_label = new St.Label({ text: LaunchPadText,
                          style_class: 'launchpad-label'});
    launchpad_text.set_child(launchpad_label);
    launchpad_text.connect('button-press-event',launchpad_toggle);
}
function remove_launchpad_icon() {
    Main.panel._leftBox.remove_child(launchpad_button);
}
function remove_launchpad_text() {
    Main.panel._leftBox.remove_child(launchpad_text);
}


function init_HotCornerSwitch() {
let    temp_shouldToggleByCornerOrButton = Main.overview.shouldToggleByCornerOrButton.prototype;
}

function enable_HotCornerSwitch() {
    if (DisableHotCorner) {
          Main.overview.shouldToggleByCornerOrButton = function () { return !DisableHotCorner; }
    }
}

function disable_HotCornerSwitch() {
    Main.overview.shouldToggleByCornerOrButton.prototype = temp_shouldToggleByCornerOrButton;
}



