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
want to think about this problem anymore.

Part 2 seemed tricker than it actually was, but my
solution also feels more brute-force than I want it to be. Surely there's a smarter way to do it.
The Day 2 memes haven't clued me in yet, so maybe this is just going to get shelved indefinitely.

## --- Day 3: Mull It Over ---

Day 3 was quite nice. I was able to get both parts done in under an hour, and even cracked the top
10000 on the leaderboard for part 1. The solution was made easier since I immediately recognized the
regex that would work to find each mul instruction.

Part 2 was a little tricky, just because it took me a minute to figure out how I could use capture
groups to include the splitter in my split output. There were also a couple of times that TypeScript
errors tripped me up, but nothing a little copilot chatting couldn't help me fix in a jiffy.

I'm actually looking forward to golfing this a tiny bit and analyzing the time complexity later
on. I think this problem is ripe with opportunities for me to improve my code problem-solving skills
specifically, so I'll be checking in to the subreddit for day 3 discourse a lot today.

## --- Day 4: Ceres Search ---

Today was way easier than I thought it would be. I got both parts done in less than 45 minutes, and
was even rank ~5000 for both parts. My solution seems pretty solid, and about as fast as can be. The
only real optimization I can think of is to preprocess the boundaries of the grid for part 1, but
the performance difference would be negligible. I feel lucky that I've seen this type of grid
parsing problem a ton before (for whatever reason).

## --- Day 5: Print Queue ---

This was tricky! I think that if things are only going to get harder from here, I'm going to have to
start consulting the internet for help.

My first attempt was for naught, as I didn't read carefully. I thought that if I created an
aggregated rule that summed all rules, then it would work. I still think that's a good idea, but my
implementation somehow created an infinite loop.

My second try was dead simple. I just found all rules where both numbers are contained in an update,
run the rules, and swap the numbers that don't pass each rule, then start over until no rules don't
pass. I'm not very happy with this solution, but I also don't really want to come back to it after
failing so miserably the first time. On to day 6!
