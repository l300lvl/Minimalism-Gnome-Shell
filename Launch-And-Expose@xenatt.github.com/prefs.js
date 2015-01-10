const GdkPixbuf = imports.gi.GdkPixbuf;
const Gdk = imports.gi.Gdk;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const St = imports.gi.St;
const ExtensionUtils = imports.misc.extensionUtils;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Gettext = imports.gettext.domain('gnome-shell-extensions');
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const expose_iconPath = Me.path + '/img/windowslist.svg';
const launchpad_iconPath = Me.path + '/img/logo.svg';
settings = Convenience.getSettings();
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

function buildConfigWidget() {
	let ConfigDLG = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL});
	let vhbox1 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 5});
	let LaIcnCfLabel = new Gtk.Label({label: "Show LauncPad icon",
									   xalign: 0 });
	let LaIcnCfSwitch = new Gtk.Switch({active: settings.get_boolean('show-launchpad-icon')});
	LaIcnCfSwitch.connect('notify::active', function(button) {
		settings.set_boolean('show-launchpad-icon', button.active);
	});
	vhbox1.pack_start(LaIcnCfLabel, true, true, 0);
	vhbox1.add(LaIcnCfSwitch);
	ConfigDLG.add(vhbox1);



	let vhbox1_2 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
				 	   margin_top: 5});
	let LaIcnCfICO  = new Gtk.Image({ xalign: 0 });
	LaIcnCfICO.set_from_gicon(Gio.icon_new_for_string(LaunchPadIcon),Gtk.IconSize.MENU);
	let LaIcnCfBTN = new Gtk.Button({ label: 'Select' });
	LaIcnCfBTN.connect('clicked', function() {
			selectIcon('icon-launchpad-path','Select LaunchPad icon',LaIcnCfICO);
		});
	vhbox1_2.pack_start(LaIcnCfICO, true, true, 0);
	vhbox1_2.add(LaIcnCfBTN);
	ConfigDLG.add(vhbox1_2);



	let vhbox1_1 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 5});

	let LaTxtCfLabel  = new Gtk.Label({label: "if you Disable \"LauncPad Icon\" And \"LaunchPad Label\" is Empty or Disable too. This icon would show.",
										xalign: 0 });
	vhbox1_1.pack_start(LaTxtCfLabel, true, true, 0);
	ConfigDLG.add(vhbox1_1);


	/** LaunchPad Text GUI **/

	let vhbox20 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 20});
	let LaTxtCfLabel = new Gtk.Label({label: "Show LauncPad Label",
									   xalign: 0 });
	let LaTxtCfSwitch = new Gtk.Switch({active: settings.get_boolean('show-launchpad-text')});
	LaTxtCfSwitch.connect('notify::active', function(button) {
		settings.set_boolean('show-launchpad-text', button.active);
	});
	vhbox20.pack_start(LaTxtCfLabel, true, true, 0);
	vhbox20.add(LaTxtCfSwitch);
	ConfigDLG.add(vhbox20);

	let vhbox2 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 5});

	let LaTxtCfLabel  = new Gtk.Label({label: "LauncPad Label Text",
										xalign: 0 });

	let LaTxtStr = new Gtk.Entry({text: settings.get_string('label-launchpad-text')});
	LaTxtStr.connect('notify::text', function(entry) {
		settings.set_string('label-launchpad-text', entry.text);
	});

	vhbox2.pack_start(LaTxtCfLabel, true, true, 0);
	vhbox2.add(LaTxtStr);
	ConfigDLG.add(vhbox2);

	let vhbox2_1 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 5});

	let LaTxtCfLabel  = new Gtk.Label({label: "Set \"LaunchPad Label\" on Top Left,You can't Hidden both \"LaunchPad Label\" And \"LaunchPad Icon\"",
										xalign: 0 });
	vhbox2_1.pack_start(LaTxtCfLabel, true, true, 0);
	ConfigDLG.add(vhbox2_1);

	let vhbox3 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 20});

	let ExCfLabel = new Gtk.Label({label: "Show Expose",
									   xalign: 0 });

	let ExCfSwitch = new Gtk.Switch({active: settings.get_boolean('show-expose-icon')});
	ExCfSwitch.connect('notify::active', function(button) {
		settings.set_boolean('show-expose-icon', button.active);
	});

	vhbox3.pack_start(ExCfLabel, true, true, 0);
	vhbox3.add(ExCfSwitch);

	ConfigDLG.add(vhbox3);
		let vhbox3_2 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
				 	   margin_top: 5});
	let ExIcnCfICO  = new Gtk.Image({ xalign: 0 });
	ExIcnCfICO.set_from_gicon(Gio.icon_new_for_string(ExposeIcon),Gtk.IconSize.MENU);
	let ExIcnCfBTN = new Gtk.Button({ label: 'Select' });
	ExIcnCfBTN.connect('clicked', function() {
			selectIcon('icon-expose-path','Select Expose icon',ExIcnCfICO);
		});
	vhbox3_2.pack_start(ExIcnCfICO, true, true, 0);
	vhbox3_2.add(ExIcnCfBTN);
	ConfigDLG.add(vhbox3_2);


	let vhbox3_1 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 5});

	let ExTxtCfLabel  = new Gtk.Label({label: "You can Hide \"Expose Icon\" And Change \"Expose icon\" On Rigth Top",
										xalign: 0 });
	vhbox3_1.pack_start(ExTxtCfLabel, true, true, 0);
	ConfigDLG.add(vhbox3_1);


	let vhbox4 = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL,
							margin_top: 20});

	let conCfLabel = new Gtk.Label({label: "Disable Hot Corner",
									   xalign: 0 });

	let conCfSwitch = new Gtk.Switch({active: settings.get_boolean('disable-hotcorner')});
	conCfSwitch.connect('notify::active', function(button) {
		settings.set_boolean('disable-hotcorner', button.active);
	});

	vhbox4.pack_start(conCfLabel, true, true, 0);
	vhbox4.add(conCfSwitch);
	ConfigDLG.add(vhbox4);


	return ConfigDLG;
}

function buildPrefsWidget() {
  let frame = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL,
						   border_width: 10});
  let ConfigDLG = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL,
						  margin: 20, margin_top: 10});
  let LanchAndExCf = buildConfigWidget();
	ConfigDLG.add(LanchAndExCf);
	frame.add(ConfigDLG);
	frame.show_all();
	return frame;
}

function init() {
	settings = Convenience.getSettings();
}
// function from Activities Configtor
function selectIcon(setkey,title,icoObj) {
	let path = settings.get_string(setkey);
    let dialog = new Gtk.FileChooserDialog({ title: title, action: Gtk.FileChooserAction.OPEN });
    dialog.add_button(Gtk.STOCK_CANCEL, Gtk.ResponseType.CANCEL);
    dialog.add_button(Gtk.STOCK_OPEN, Gtk.ResponseType.ACCEPT);
    dialog.set_filename(path);
    let filter = new Gtk.FileFilter();
    filter.set_name("Images");
    filter.add_pattern("*.png");
    filter.add_pattern("*.jpg");
    filter.add_pattern("*.gif");
    filter.add_pattern("*.svg");
    filter.add_pattern("*.ico");
    dialog.add_filter(filter);
    let response = dialog.run();
    if(response == -3) {
        let filename = dialog.get_filename();
        if(filename != path) {
            settings.set_string(setkey, filename);
			icoObj.set_from_gicon(Gio.icon_new_for_string(filename),Gtk.IconSize.MENU);
        } 
    }
    dialog.destroy();
}
