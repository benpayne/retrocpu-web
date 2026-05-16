---
title: "Motorola 68k — Revolution or Evolution?"
pubDate: 2026-05-16
summary: "The 68000 cribbed its architecture from the PDP-11 and VAX, then shrank it onto a single HMOS die for $125. Architecturally evolutionary, integration-wise revolutionary, culturally transformative — and that's why it killed the minicomputer."
tags: [68k, history, architecture]
draft: true
---

When the Motorola 68000 hit the market in 1979, it landed at one of
the most interesting inflection points in computing history. To
understand whether it was truly revolutionary or just a clever
repackaging of existing ideas, you have to look at what it was
competing with — and that means surveying a landscape that ran the
gamut from refrigerator-sized cabinets full of TTL logic to the very
first single-chip CPUs.

## The CPU landscape circa 1979–1980

### Mainframes: bipolar logic, lots of it

Mainframes were still firmly in the realm of bipolar logic spread
across many chips and many boards. IBM's System/370 line and the new
308x series (the 3081 launched in 1980) used what IBM called Thermal
Conduction Modules — ceramic substrates carrying up to about 133
small bipolar chips each, at SSI and MSI scale, mostly ECL. A single
mainframe "CPU" was a card cage full of these modules. Amdahl's
competing mainframes used similar approaches with ECL gate arrays.

There were no single-chip mainframe CPUs. The performance demands
were too high for the MOS processes available at the time, and the
chip area would have been prohibitive even if you tried.

### Minicomputers: the interesting middle ground

This is where things get fun:

- **DEC PDP-11 family**: The classic implementations (11/45, 11/70)
  were built from 7400-series TTL on multiple wirewrap or PCB
  backplane boards. The LSI-11 (1975) was a partial exception — it
  used Western Digital's MCP-1600 chipset, which consisted of three
  chips plus microcode ROMs. DEC didn't squeeze a real PDP-11 onto a
  single die until the T-11 in 1981, nearly concurrent with the 68k.
- **VAX-11/780** (1977): DEC's flagship 32-bit super-mini was an
  entire cabinet of TTL/MSI Schottky logic on roughly a dozen large
  hex-height boards. No ASICs in the modern sense — just hundreds of
  off-the-shelf 74S-series parts and PROMs for microcode. The VAX
  architecture wasn't put on a chip until the MicroVAX 78032 in 1984.
- **Data General Eclipse, HP 3000, Prime 50-series**: all TTL
  implementations on multiple boards.

### Other microprocessors of that exact moment

- **Intel 8086** (1978): about 29,000 transistors, 16-bit, segmented
  1 MB address space
- **Zilog Z8000** (1979): 16-bit, segmented
- **National 16032/NS32016** (announced 1980, shipped later):
  explicitly VAX-inspired

## Physical design — the spectrum

The three broad categories of CPU implementation at the time mapped
roughly like this:

**1. 7400-series SSI/MSI logic.** This is what virtually all
minicomputers used, and what mainframes used at higher speed grades
(Schottky TTL, ECL). A CPU was tens to hundreds of chips on multiple
boards.

**2. Multi-chip "chipsets."** Bit-slice designs (AMD 2900 family)
and chipset-style implementations like the MCP-1600 LSI-11. Used
when you wanted denser integration but couldn't fit a whole CPU on
one die yet.

**3. Single-chip MOS CPUs.** The newer class: 8086, Z8000, 68000,
6809, etc. These were NMOS or HMOS. The 68k itself used HMOS and
packed roughly 68,000 transistors on the die.

True "ASIC" in the modern sense — custom standard-cell or gate-array
designs for a specific customer — was only just emerging. Ferranti's
ULA gate arrays appeared around this time and would soon power
machines like the BBC Micro and ZX Spectrum, but mainstream
computers weren't built that way yet.

## So — revolutionary or evolutionary?

The honest answer is: **architecturally evolutionary, integration-wise
revolutionary, and culturally transformative.**

### Evolutionary architecture

The 68000's design DNA is pure minicomputer. Motorola's team
explicitly drew from the PDP-11 and, especially, the VAX:

- 16 general-purpose registers (8 data, 8 address) — similar in
  spirit to the PDP-11's orthogonal register file
- A highly orthogonal instruction set with rich addressing modes —
  pre/post-increment/decrement, indexed, PC-relative — lifted almost
  directly from PDP-11 conventions
- 32-bit internal registers and a flat 24-bit (16 MB) linear address
  space — no segmentation, just like a VAX
- A supervisor/user mode split with separate stack pointers
- A microcoded implementation (actually nanocoded — a two-level
  microstore)

There's almost nothing here that hadn't existed in minis for a
decade. A VAX programmer looking at 68k assembly in 1980 would have
felt right at home. An 8086 programmer, by contrast, would have wept
with joy at the flat address space.

### Revolutionary integration

What was new was *cramming all of that onto one HMOS die* for around
$125 in volume. The 68k delivered roughly PDP-11/70-class capability
— arguably better in some respects, since the /70 was only 16-bit
with 22-bit physical addressing via MMU — on a single chip. The
VAX-11/780 was still meaningfully faster in 1980, but the 68k was
within an order of magnitude of it at a price difference of perhaps
1000:1.

### Culturally transformative

This is where it really mattered. The flat 16 MB address space and
clean architecture made the 68k the obvious choice for the first
generation of graphical workstations and personal computers that
aspired to be "real": the Sun-1 (1982), Apollo, the Macintosh, the
Lisa, the Amiga, the Atari ST, NeXT, early Silicon Graphics. The
8086's segmentation was a millstone for serious software; the 68k
let you write Unix and complex GUIs without architectural pain.

In effect, the 68k put minicomputer-class computing on a desk — and
that's what changed the industry.

## Conclusion

So the verdict is: largely "a higher form of integration of designs
that were already there." But that higher integration is exactly
what democratized the architecture and killed off a generation of
board-level minicomputers within about a decade. By the mid-80s, the
question wasn't "can we shrink a VAX" but "why would you buy a VAX
when a Sun-3 on your desk runs the same Unix?"

One fitting footnote: the 68000 itself is now a popular FPGA core
target (TG68, fx68k), and hobbyists regularly drop soft-core 68ks
into reimplementations of the classic machines it powered. It's a
tractable design to recreate in HDL precisely because, for all its
elegance, it really is just a well-organized collection of ideas
that had already been proven in TTL form a decade earlier.

Revolutionary? Evolutionary? Both — and that's exactly why it
mattered.
