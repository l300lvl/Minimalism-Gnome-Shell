const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Main = imports.ui.main;


const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Lib = Me.imports.lib;

function init() {
    Lib.init_launchpad();
    Lib.init_expose();
    Lib.init_HotCornerSwitch();
}

function enable() {
	//Lib.SetSign(); //Under Development
    Lib.enable_launchpad();
    Lib.enable_expose();
    Lib.enable_HotCornerSwitch();
}

function disable() {
    Lib.disable_launchpad();
    Lib.disable_expose();
    Lib.disable_HotCornerSwitch();
}
