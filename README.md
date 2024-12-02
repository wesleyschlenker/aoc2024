# Advent of Code 2024

This year I'm using Typescript and Deno to get more experience with both. So far
so good! I'm super excited to see how far I can get this time around.

## --- Day 1: Historian Hysteria ---

This was an easy one. Part 2 was a breeze after figuring out part 1. I even
tried flexing my (puny) coding muscles by doing the loop 2 different ways.

I was originally happy with my results, but after browsing the day 1 memes on
r/adventofcode I realized that my solution was O(n^2) and that I could go faster
with a hashmap (linear time). I don't actually know if that would end up faster
since we're only dealing with 1000 lines of input, but it's worth looking into
using the Performance API later. I'll have to keep hashmaps in my back pocket
for situations like this going forward.
