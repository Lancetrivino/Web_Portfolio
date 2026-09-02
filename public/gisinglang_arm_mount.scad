// =====================================================================
// GisingLang - articulated camera arm mount
//
//   base        Pi Zero 2W + 400-point breadboard, arm clevis at the rear
//   arm         strut with a pivot at each end
//   pod         camera housing, pivots on the arm's top end
//   lid         base lid with buzzer sound holes
//   belt_clip   holds 2 vibration motors against the seatbelt (print 2)
//
// WHY AN ARM INSTEAD OF A WINDOW IN THE WALL
// A lens fixed in a box wall sits ~25 mm off the dashboard and stares at
// the driver's chest, and the only way to re-aim it is to reprint. Raising
// the camera on a two-pivot arm puts it near face height and lets the aim
// be adjusted by hand after mounting - which matters because dashboard
// rake, seat height, and driver height all differ.
//
// PIVOTS
// Each joint is a tab captured between two ears, clamped by an M3 bolt and
// a nyloc nut. Friction holds the angle; tighten until it moves firmly but
// does not sag. Both joints rotate in the same plane (up/down aim). Left/
// right aim comes from rotating the whole base on the dashboard.
//
// HARDWARE NEEDED
//   2 x M3 bolt, 20 mm, + 2 x M3 nyloc nut   (the two pivots)
//   4 x M2.5 screw, 6 mm                     (Pi to standoffs)
//   4 x M2 screw, 5 mm                       (camera to pod)
//
// USAGE
//   Set `part` below. F5 preview, F6 render, File > Export > STL.
//   Print: 1 base, 1 arm, 1 pod, 1 lid, 2 belt clips.
// =====================================================================

part = "all";   // "base" | "arm" | "pod" | "lid" | "belt_clip" | "all"

$fn = 48;

/* ---------------------------------------------------------------- *
 *  Base enclosure
 * ---------------------------------------------------------------- */
wall     = 2.5;
floor_t  = 2.5;
corner_r = 4;

// Breadboard 83 x 55 across the back, Pi 65 x 30 in front of it.
// Depth budget: 5 + 30 Pi + 5 gap + 55 board + slack. At 95 the board
// landed exactly flush against the rear wall with zero clearance.
inner_w  = 90;
inner_d  = 100;
// MEASURE THIS. The breadboard is only 10 mm tall, but loosely routed
// jumper wires arc far higher - that, not the components, sets the height.
// Press your wires flat, measure the tallest, add 5 mm.
inner_h  = 40;

base_w = inner_w + 2 * wall;    // 95
base_d = inner_d + 2 * wall;    // 100
base_h = inner_h + floor_t;     // 42.5

/* ---------------------------------------------------------------- *
 *  Raspberry Pi Zero 2 W - board 65 x 30, holes 58 x 23 inset 3.5
 * ---------------------------------------------------------------- */
pi_w = 65; pi_d = 30;
pi_hole_dx = 58; pi_hole_dy = 23; pi_hole_inset = 3.5;
pi_x = wall + (inner_w - pi_w) / 2;
pi_y = wall + 5;
standoff_d = 6; standoff_h = 5; pi_screw_d = 2.4;

/* ---------------------------------------------------------------- *
 *  Pivot joints (shared by both ends of the arm)
 * ---------------------------------------------------------------- */
pivot_hole_d  = 3.4;    // M3 clearance
pivot_boss_d  = 18;     // friction disc; bigger = holds heavier loads
tab_t         = 6;      // arm tab thickness
ear_t         = 4;      // each clevis ear
ear_gap       = 6.8;    // tab_t + 0.8 print clearance
clevis_w      = tab_t + 2 * ear_t + 1.6;

/* ---------------------------------------------------------------- *
 *  Arm
 * ---------------------------------------------------------------- */
arm_len   = 120;   // pivot centre to pivot centre; raises the camera
arm_w     = 18;    // across the arm (Y)
arm_t     = 6;     // arm thickness (X) - must equal tab_t so it fits the clevis

// The base clevis carries a 120 mm arm plus the camera, so it needs real
// bonded area against the rear wall rather than perching on the rim.
// It starts low on the wall and rises to the pivot height.
clevis_z0 = 10;    // where the clevis meets the rear wall
pivot_z   = 55;    // pivot centre above the base's underside

/* ---------------------------------------------------------------- *
 *  Camera pod - Camera Module v2, PCB 25 x 24, holes 21 x 12.5
 * ---------------------------------------------------------------- */
pod_w = 34; pod_h = 34; pod_t = 16;
pod_wall = 2.5;
cam_hole_dx = 21; cam_hole_dy = 12.5;
cam_screw_d = 1.9;
lens_d = 9;
ribbon_slot_w = 17;
ribbon_slot_t = 2.5;

/* ---------------------------------------------------------------- *
 *  Cable exits, ventilation, lid
 * ---------------------------------------------------------------- */
motor_exit_d = 10; motor_exit_z = 10;
usb_exit_d = 9;    usb_exit_z = 9;
vent_count = 4; vent_w = 26; vent_h = 3; vent_pitch = 5; vent_z = 8;
lid_t = 2.5; lid_lip_h = 4; lid_clear = 0.4;
buzzer_hole_d = 3; buzzer_cols = 4; buzzer_rows = 3; buzzer_pitch = 6;

/* ---------------------------------------------------------------- *
 *  Seatbelt motor clip
 * ---------------------------------------------------------------- */
clip_w = 60; clip_d = 35; clip_base_t = 4.5;
belt_slot_w = 50; belt_slot_t = 4; clip_wall = 3;
motor_d = 10.5; motor_pocket_h = 3.5; motor_spacing = 25;
wire_ch_w = 3; wire_ch_h = 2;

// =====================================================================
//  Helpers
// =====================================================================

module rounded_box(w, d, h, r) {
    hull()
        for (x = [r, w - r], y = [r, d - r])
            translate([x, y, 0]) cylinder(r = r, h = h);
}

module boss(outer_d, hole_d, h) {
    difference() {
        cylinder(d = outer_d, h = h);
        translate([0, 0, -0.5]) cylinder(d = hole_d, h = h + 1);
    }
}

function pi_holes() = [
    [pi_hole_inset, pi_hole_inset],
    [pi_hole_inset + pi_hole_dx, pi_hole_inset],
    [pi_hole_inset, pi_hole_inset + pi_hole_dy],
    [pi_hole_inset + pi_hole_dx, pi_hole_inset + pi_hole_dy]
];

// Two ears with aligned holes; a tab drops into the gap between them.
// Drawn lying in the XZ plane, centred on the origin, opening upward.
module clevis(height) {
    for (side = [-1, 1])
        translate([side * (ear_gap / 2 + ear_t / 2), 0, 0])
            difference() {
                union() {
                    translate([-ear_t / 2, -pivot_boss_d / 2, 0])
                        cube([ear_t, pivot_boss_d, height]);
                    translate([0, 0, height]) rotate([0, 90, 0])
                        cylinder(d = pivot_boss_d, h = ear_t, center = true);
                }
                translate([0, 0, height]) rotate([0, 90, 0])
                    cylinder(d = pivot_hole_d, h = ear_t + 2, center = true);
            }
}

// =====================================================================
//  base
// =====================================================================
module base() {
    difference() {
        union() {
            difference() {
                rounded_box(base_w, base_d, base_h, corner_r);
                translate([wall, wall, floor_t])
                    rounded_box(inner_w, inner_d, base_h, max(corner_r - wall, 0.5));
            }
            for (p = pi_holes())
                translate([pi_x + p[0], pi_y + p[1], floor_t])
                    boss(standoff_d, pi_screw_d, standoff_h);

            // Arm clevis, on the OUTSIDE of the rear wall so it steals no
            // interior volume and the lid can still lift straight off.
            // Overlaps the wall by 3 mm and runs from clevis_z0 up to the
            // pivot, giving it ~32 mm of bonded height to resist the arm's
            // leverage.
            translate([base_w / 2, base_d + pivot_boss_d / 2 - 3, clevis_z0])
                clevis(pivot_z - clevis_z0);
        }

        translate([base_w / 2, base_d - wall - 1, floor_t + motor_exit_z])
            rotate([-90, 0, 0]) cylinder(d = motor_exit_d, h = wall + 2);

        translate([-1, pi_y + pi_d / 2, floor_t + usb_exit_z])
            rotate([0, 90, 0]) cylinder(d = usb_exit_d, h = wall + 2);

        // Ribbon cable slot in the rear wall, beside the clevis.
        translate([base_w / 2 - ribbon_slot_w / 2, base_d - wall - 1, base_h - 12])
            cube([ribbon_slot_w, wall + 2, ribbon_slot_t]);

        for (side = [0, 1])
            for (i = [0 : vent_count - 1])
                translate([side == 0 ? -1 : base_w - wall - 1,
                           base_d / 2 - vent_w / 2,
                           floor_t + vent_z + i * vent_pitch])
                    cube([wall + 2, vent_w, vent_h]);
    }
}

// =====================================================================
//  arm - prints flat on the bed
// =====================================================================
// The arm is thin in X and wide in Y, with both pivot bosses on the X axis.
// This MUST match clevis(), whose two ears are separated along X - an arm
// thin in Y would have its tab lying across the slot and could never be
// assembled.
module arm() {
    difference() {
        union() {
            translate([-arm_t / 2, -arm_w / 2, 0])
                cube([arm_t, arm_w, arm_len]);
            for (z = [0, arm_len])
                translate([0, 0, z]) rotate([0, 90, 0])
                    cylinder(d = pivot_boss_d, h = arm_t, center = true);
        }
        for (z = [0, arm_len])
            translate([0, 0, z]) rotate([0, 90, 0])
                cylinder(d = pivot_hole_d, h = arm_t + 2, center = true);

        // Zip-tie slots for the ribbon cable, so it can't flap loose.
        for (z = [arm_len * 0.3, arm_len * 0.7])
            translate([-arm_t / 2 - 1, -arm_w / 2 - 1, z])
                cube([arm_t + 2, 3, 2.5]);
    }
}

// =====================================================================
//  pod - camera housing; prints open-face up
// =====================================================================
module pod() {
    difference() {
        union() {
            rounded_box(pod_w, pod_h, pod_t, 3);
            // Clevis centred on the pod's BACK face, mating with the arm's
            // top pivot. The lens looks out of the opposite face, so the
            // arm sits directly behind the camera.
            translate([pod_w / 2, pod_h / 2, pod_t - 4])
                clevis(12);
        }
        // camera cavity
        translate([pod_wall, pod_wall, pod_wall])
            cube([pod_w - 2 * pod_wall, pod_h - 2 * pod_wall, pod_t]);
        // lens aperture through the front face
        translate([pod_w / 2, pod_h / 2, -1])
            cylinder(d = lens_d, h = pod_wall + 2);
        // camera screw holes
        for (dx = [-cam_hole_dx / 2, cam_hole_dx / 2])
            for (dy = [-cam_hole_dy / 2, cam_hole_dy / 2])
                translate([pod_w / 2 + dx, pod_h / 2 + dy, -1])
                    cylinder(d = cam_screw_d, h = pod_wall + 2);
        // ribbon exit
        translate([pod_w / 2 - ribbon_slot_w / 2, pod_h - pod_wall - 1, pod_wall + 3])
            cube([ribbon_slot_w, pod_wall + 2, ribbon_slot_t]);
    }
}

// =====================================================================
//  lid
// =====================================================================
module lid() {
    difference() {
        union() {
            rounded_box(base_w, base_d, lid_t, corner_r);
            translate([wall + lid_clear, wall + lid_clear, -lid_lip_h])
                rounded_box(inner_w - 2 * lid_clear, inner_d - 2 * lid_clear,
                            lid_lip_h, max(corner_r - wall, 0.5));
        }
        for (c = [0 : buzzer_cols - 1])
            for (r = [0 : buzzer_rows - 1])
                translate([base_w / 2 - (buzzer_cols - 1) * buzzer_pitch / 2 + c * buzzer_pitch,
                           base_d * 0.7 - (buzzer_rows - 1) * buzzer_pitch / 2 + r * buzzer_pitch,
                           -lid_lip_h - 1])
                    cylinder(d = buzzer_hole_d, h = lid_lip_h + lid_t + 2);
    }
}

// =====================================================================
//  belt_clip  (print TWO)
//
//  SAFETY: must slide freely along the belt and never impede retraction
//  or locking. Keep away from the buckle and retractor. If it catches on
//  the webbing at all, do not use it. TPU is kinder against the chest.
// =====================================================================
module belt_clip() {
    difference() {
        cube([clip_w, clip_d, clip_base_t + belt_slot_t + clip_wall]);
        translate([(clip_w - belt_slot_w) / 2, -1, clip_base_t])
            cube([belt_slot_w, clip_d + 2, belt_slot_t]);
        for (dx = [-motor_spacing / 2, motor_spacing / 2]) {
            translate([clip_w / 2 + dx, clip_d / 2, -0.5])
                cylinder(d = motor_d, h = motor_pocket_h + 0.5);
            translate([clip_w / 2 + dx - wire_ch_w / 2, clip_d / 2, -0.5])
                cube([wire_ch_w, clip_d / 2 + 1, wire_ch_h + 0.5]);
        }
    }
}

// =====================================================================
//  Render
// =====================================================================
if (part == "base") base();
else if (part == "arm") arm();
else if (part == "pod") pod();
else if (part == "lid") lid();
else if (part == "belt_clip") belt_clip();
else if (part == "all") {
    base();
    translate([base_w + 30, 0, 0]) arm();
    translate([base_w + 80, 0, 0]) pod();
    translate([0, base_d + 20, 0]) lid();
    translate([base_w + 30, base_d + 20, 0]) belt_clip();
}
