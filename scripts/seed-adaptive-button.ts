import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { projects } from "../src/db/schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function main() {
await db.insert(projects).values({
  title: "Adaptive Button – 3D Printed Accessibility Switch",
  description:
    "A large, easy-to-press adaptive button for accessibility use — gaming, communication devices, and assistive technology for people with cerebral palsy. Built from 5 3D-printed parts with copper-tape contacts that complete a circuit when pressed.",
  longDescription: `## Overview
The Adaptive Button is a large, easy-to-press adaptive button designed for accessibility use (such as gaming, communication devices, or assistive technology setups) for people with cerebral palsy. Made from 5 simple 3D-printed parts with copper-tape contacts that complete a circuit when pressed. Compatible with Makey Makey, Arduino (low voltage), or other adaptive input systems.

## Supplies

**3D Printed Parts**
- Main Body
- Button Cap
- Retaining Ring
- Upper Contact Plate
- Lower Contact Plate

**Materials**
- Copper tape
- 2 small alligator clips
- Spare wire
- Hot glue

**Tools**
- Wire strippers
- 3D printer
- Scissors

## Step 1: 3D Print All Parts

Print all 5 parts with these recommended settings:
- Layer height: 0.2mm
- Infill: 15–20%
- Supports: No (unless your model requires it)
- Material: PLA

## Step 2: Prepare the Contact Plates (Wire + Copper Tape)

This step creates the electrical contacts.

**Strip the Wire**
Take one wire. Strip about 1 inch (2–3 cm) of insulation off one end. Twist the exposed copper strands together. Repeat with the second wire.

**Attach the Wire Under the Copper Tape**
Lay the stripped end of the wire flat against the surface of Contact Plate 1. Make sure the bare copper is fully touching the plastic surface where the tape will go. Place copper tape directly over the stripped wire end. Press firmly so the copper tape holds the wire tightly against the plate.

The stripped wire should now be layered underneath the copper tape. Repeat for Contact Plate 2.

**Important:** The copper tape must firmly press onto the bare wire. No insulation between the copper tape and the stripped wire. Smooth out wrinkles so the surface is flat.

## Step 3: Assemble Parts

1. **Seat the Bottom Contact** — Place Contact Plate 1 copper-side up into the bottom of the Main Body. Thread the wire through the small exit hole at the base. Add a small dab of hot glue to keep it from shifting.

2. **Prepare the Button Cap** — Press Contact Plate 2 into the underside of the Button Cap with the copper side facing downward. Route this wire through the side channel or top opening. Keep the copper surface clean and free of fingerprints for the best electrical connection.

3. **Insert the Button and Align** — Slide the Button Cap into the Main Body. Align the plates so that when the button is pressed, the top copper plate lands directly in the center of the bottom copper plate.

4. **Secure the Retaining Ring** — Place the Retaining Ring over the top of the Button Cap and snap or screw it onto the Main Body. Press the button several times — it should move up and down freely without catching on the sides.

## Step 4: Wiring to the Makey Makey

With your button assembled, you now have two wires coming out of the unit.

1. **Identify Your Inputs** — On your Makey Makey board, find the section labeled "Earth" (the bottom bar) and any key inputs (Space, Click, or the Arrows).

2. **Connect the "Earth" Wire** — Take the wire from Contact Plate 1 (the bottom plate) and clip it to the Earth bar on the Makey Makey. This provides the ground connection.

3. **Connect the "Input" Wire** — Take the wire from Contact Plate 2 (the top plate/button cap) and clip it to the Space key or Left Click on the Makey Makey. When the button is pressed, it sends a "Space" keypress to the computer.

4. **Secure the Connections** — If the wires feel loose, wrap a small piece of electrical tape around the alligator clip connection point to prevent the clips from sliding off.

## Step 5: Testing and Troubleshooting

1. **Plug it in** — Connect your Makey Makey to your computer via the USB cable.
2. **Check connections** — For the circuit to work, the contacts must be touching when the button is pressed.
3. **Test the Click** — Open a game and press your new button. If wired to "Space," you should see the cursor jump or a character leap!`,
  tags: JSON.stringify(["3D Printing", "Accessibility", "Hardware", "Makey Makey", "Assistive Technology"]),
  liveUrl: "https://www.instructables.com/Adaptive-Button-3D-Printed-Accessibility-Switch/",
  featured: true,
});

console.log("✓ Adaptive Button project inserted");
client.close();
}

main();
