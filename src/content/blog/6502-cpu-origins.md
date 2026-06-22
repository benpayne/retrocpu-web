---
title: "MOS 6502 — When Cheap Beat Elegant"
pubDate: 2026-06-22
summary: "In 1975 the cheapest microprocessor cost about $175. Chuck Peddle walked out of Motorola, set up shop in Norristown, and put the 6502 on sale for $25. The Apple II, the C64, the BBC Micro, and the NES were all built on the chip that broke the price floor."
tags: ["6502", history, architecture]
draft: true
---

When the MOS Technology 6502 went on sale in September 1975, it was
priced at $25 in a market where the cheapest competing chips were
$175 to $200. Not a generation cheaper — an order of magnitude
cheaper. The story of how that happened, and why nobody at Intel or
Motorola believed it should be done, is one of the more entertaining
side-paths in computing history. It is also the reason almost every
home computer of the late 70s and 80s was built around the same
chip.

## What a microprocessor cost in 1975

By mid-1975, you had three serious choices if you wanted a CPU on a
single chip:

- **Intel 8080** (1974): the prestige part. About 4,500 transistors,
  2 MHz, three power rails. Launched at $360 and drifted down to
  roughly $180 in the months before Wescon.
- **Motorola 6800** (1974): cleaner, single 5V supply, about 4,100
  transistors at 1–2 MHz. Around $175 in volume.
- **Intel 8008** (1972) and a smattering of 4-bit parts — still on
  the price list but not what you would build a new product around.

Then there was Chuck Peddle, who had spent the last several years at
Motorola working on the 6800 and trying to convince his employer
that the next big market was not minicomputer-replacements at $300 a
chip but appliances and toys and the things engineers built in their
basements. To get there, you needed a CPU under $25. Motorola
declined to build it.

So Peddle, along with Bill Mensch and a handful of other 6800
engineers, walked out of Motorola in 1974 and went to work for MOS
Technology in Norristown, Pennsylvania — an outfit better known at
the time for making calculator chips. They had one job: make the
$25 microprocessor.

## Designing for yield, not for elegance

Cheap, at the level of semiconductors in 1975, meant one specific
thing: small die area with high yield. Every defect on a wafer
killed a die, and the bigger your die, the more dies you lost. If
you wanted to sell a CPU for $25 and stay in business, you needed
to fit more good dies per wafer than your competitors did per their
larger ones.

The 6502 team optimized ruthlessly for that. The final part shipped
with roughly 3,500 transistors — smaller than the 6800 it
half-resembled, smaller than the 8080, smaller than the Z80 that
would arrive a year later. Architectural choices that look weird in
isolation make sense when you read them as "what can we cut without
losing the market":

- **Three 8-bit registers** — an accumulator A and two index
  registers X and Y. No general-purpose register file. The 6800 had
  the same general shape; the 6502 trimmed even further.
- **Zero-page addressing** — the first 256 bytes of memory could be
  reached with a one-byte address instead of two. In effect you got
  256 fast "registers" for the cost of putting fast RAM at address
  zero. The chip itself stayed tiny.
- **Stack hardwired to page 1** — the stack pointer was 8 bits and
  the stack lived at $0100–$01FF, full stop. One less register to
  decode, one less adder to put on the die.
- **No multiply, no divide, no fancy block instructions.** You
  wrote multiply as a loop. Fine.
- **A simple pipelined fetch** — the 6502 fetched the next opcode
  during the last cycle of the current instruction, which is part of
  why it routinely beat the 6800 at the same clock rate despite
  having fewer transistors.

The numbers that fell out of those choices: a 6502 at 1 MHz
typically did about twice as much real work per second as a 6800 at
1 MHz, and the part could clock to 2 MHz on the same process. You
got more performance, on less silicon, at one seventh the price.

## Wescon and the jar of chips

The 6502 made its public debut at the Western Electronics Show and
Convention (Wescon) in San Francisco in September 1975. MOS rented a
hotel suite — convention rules at the time forbade selling parts on
the show floor — and Peddle's wife sat behind a table with glass
jars full of 6501s and 6502s. The 6501 was pin-compatible with the
6800, priced at $20. The 6502 had its own pinout and went for $25.
You walked in with cash, you walked out with a CPU.

Two things happened almost immediately. The first was that Motorola
sued — the 6501's pin-compatibility was a step too far — and MOS
settled by withdrawing the 6501 and paying a cash settlement. The
6502, a fundamentally different part, survived the suit untouched.
The second was that every engineer who wanted to build something at
home could suddenly afford the CPU.

## Why it ate the market

The list of machines built around a 6502 or a close variant is
almost the entire shape of personal computing from 1976 to about
1985:

- **Apple I** (1976) and **Apple II** (1977) — Steve Wozniak
  designed both around the 6502 specifically because it was the only
  CPU he could afford to buy in quantity.
- **Commodore PET** (1977) — Commodore, in a stroke of vertical
  integration, simply bought MOS Technology in 1976 and brought the
  CPU and its designers in-house. Every Commodore 8-bit machine for
  the next decade was 6502-derived.
- **Atari 2600** (1977) used the **6507**, a 28-pin 6502 variant
  with a 13-bit address bus to shave package cost.
- **Atari 400/800** (1979), **VIC-20** (1980), **Commodore 64**
  (1982, using the 6510) — the entire home-computer wave that put a
  computer on every suburban kitchen table.
- **BBC Micro** (1981) — Acorn picked the 6502 for the same reason
  Wozniak did, then later bolted on a second 6502 as a co-processor.
- **Nintendo Famicom / NES** (1983) used the **2A03**, a 6502 with
  disabled decimal mode and an integrated audio block. Tens of
  millions of units.

The interesting historical claim here is not that the 6502 was the
best CPU of its era. It wasn't. The Z80 had more registers and
better string instructions. The 6809, Motorola's eventual answer,
was arguably a cleaner design. The 68000 we wrote about last time
made all of them look like toys. What the 6502 had was the price
point that turned "a computer in every home" from a slogan into a
shipping product line.

## The legacy

Bill Mensch left MOS not long after the Commodore acquisition and
founded the Western Design Center (WDC) in Arizona in 1978, where
he developed the **65C02** — a CMOS shrink with extra instructions
and lower power — and the **65C816**, the 16-bit successor that
powered the Apple IIgs and the Super Nintendo. WDC still licenses
65C02 and 65C816 cores today, fifty years after the original 6502
shipped. The architecture has outlived every one of the companies
that competed with it in 1975.

It has also outlived its silicon. There are excellent open-source
FPGA implementations of the 6502 — the classic Arlet Ottens core,
the cycle-accurate visual6502 reverse-engineered netlist, the
T65 — that drop straight into any reasonably-sized FPGA. The
`bus-design/` work in this repo treats the 6502 as a first-class
target precisely because it is small, well-understood, and still
beloved.

## Conclusion

The 6502 is the chip that broke the price floor. It didn't win on
architecture, it didn't win on speed, it didn't win on register
count — it won by being the first CPU that an individual human
could afford to buy and design a product around. Wozniak built the
Apple II on it because he had to. Commodore bought the company that
made it. Acorn picked it for the BBC because the alternatives were
unaffordable. Nintendo shipped tens of millions of NES units on a
slightly-modified one.

Cheap and good-enough, it turns out, beats expensive and elegant
almost every time. The 68000 was the future. The 6502 was the
present, and the present is where shipping products live.
