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

UPDATE: I did end up trying the hashmap approach and it was indeed faster.

```typescript
const rightMap = new Map<number,number>();
rightArray.forEach((num) => {
  if (rightMap.has(num)) {
    rightMap.set(num, (rightMap.get(num) ?? 0) + 1);
  } else {
    rightMap.set(num, 1);
  }
});
leftArray.forEach((num) => {
  score += num * (rightMap.get(num) ?? 0);
});
```

This is the implementation I came up with and runs about twice as fast already.

## --- Day 2: Red-Nosed Reports ---

Day 2 was way trickier for me than it should have been. I had a solid plan, but couldn't figure out
the best array methods to use for my implementation, and I ended up getting stuck a handful of times
by missing returns or not breaking out of loops. I'm happy with the final result, but I don't really
want to think about this problem anymore. Part 2 seemed tricker than it actually was, but my
solution also feels more brute-force than I want it to be. Surely there's a smarter way to do it.
The Day 2 memes haven't clued me in yet, so maybe this is just going to get shelved indefinitely.