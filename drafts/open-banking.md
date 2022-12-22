--- 
title: Plain Text Accounting - DRAFT
link: plain-text-accounting
layout: post.njk 
date: 2022-09-18
canonical_irl: http://www.vineeth.io/blog/plain-text-accounting
meta_description: My personal journey in finding a suitable personal finance
system. 
tags: ['post'] 
---

<!-- Excerpt Start -->
I'm writing this as I go through the process of deteremining a personal
finance/accounting system that I'm happy with. If you know me or my relationship
with neovim then this journey might seem pretty common for me, but I thought it
would be a good indication of how I handle my life. 
<!-- Excerpt End -->

## How We Got Here

I'm just about two months out of college life and have been met with a wave of
products I have to use have as an adult that have made me want to pay taxes
towards a program purely focused on improvement of the UX of websites. Just go
through the top 1000 most visited websites of all time and offer to overhaul
their UI/UX by experts. 

One such task has been managing my money. Now, I have a few different bank
accounts, investment accounts, credit cards, and money sharing apps like venmo.
A lot of what I have had to rely on for managing my money has been looking at
the individual trackers in each service. Some credit cards would have spending
reports that broke things down great, but not all of my accounts would and they
would always be in isolation of each other. If I saw money going in or out of an
account I couldn't easily correlate it to spending on a card or sharing money
with a friend for groceries. 

I've tried a few times to track all of them in a spreadsheet, but keeping it in
sync and having good views for everything was something I never once kept up
with. Every time was a completely new table or graph. Also tried with tools like
notion, but still couldn't manage a good way of syncing the data. I've also
tried it out with tools like mint mobile, personal capital, and sofi, but often
times whatever api their using to access my accounts (like Plaid) would become
unconnected or they still didn't really have the right UI I wanted to enough
views. 

So I had two distinct problems. I wanted easy access to my financial data and I
wanted a good UI to explain my situation to me. So while trying to find a
solution and reading more about (#lifeblogging)(https://beepb00p.xyz/tags.html#lifelogging) I decided to make my own personal system. 

## Research

There were a few concepts I encountered while browsing the internet that
inspired this. The first was that I realized that every financial app just uses
the (Plaid API)[https://plaid.com/] and I can get access to that API too. The
other learning was the existentnce of command line accounting tools like
(ledger-cli)[https://www.ledger-cli.org/] and the whole
(plaintextaccounting.com)[https://plaintextaccounting.com] idea. I wanted to do
more lifelogging anyways so I thought this is something I can do. 

Getting the data doesn't seem so much like an issue since I have some confidence
that Plaid will work fine, so instead I first wanted to look into how to process
and display the data. Besides (ledger-cli)[https://www.ledger-cli.org/], I also
found that there was (hledger)[https://hledger.org/], and (beancount)[https://github.com/beancount/beancount].
All of them started talking about this idea of double-entry accounting so I figured I should read up on that a bit more first. 

### Double-entry Accounting

So according to investopedia. 

> Double entry, a fundamental concept underlying present-day bookkeeping and accounting,
states that every financial transaction has equal and opposite effects in at least two different accounts.

This makes sense and I think its the kind of view I've been missing for a while. I
want to be able to see the context of my transactions and the impact on my
overall assets. Atleast as one of my views. I like being able to see a
transaction's effect on one account, but I also like the option of seeing the
full impact. 

---

Ok so back to the data processing tools. I know that I definitely want to use
something to process the data instead of just taking the **Plaid** data and
trying to process it with numpy...or atleast try it out before resorting to that.
So obviously there's been a lot of work done in this space so I want to do some
research before picking one to try. 

I like to use Github awesome-lists when researching stuff like this. So let's
look at (awesome-ledger)[https://github.com/sfischer13/awesome-ledger]. That
took me to the (plaintextaccounting)[https://plaintextaccounting.org/] website,
which had a really useful table. Looks like the 3 platforms I mentioned before
were the ones to compare the most. The things I'm looking for are: a good
community, a lot of control and composability with the tool, a good ecosystem of
plugins and "prior art."

Now I know (karlikoss)[https://beepb00p.xyz/my-data.html#hsbc] uses `hledger`,
and they've got cool content. From what I can tell a lot of the features of hledger
and ledger-cli seem to be identical, while beancount seems to be quite different. So I decided to 
go with the ledger ecosystem and just explore **hledger** more. 

## hledger

I did some initial research and it looks the like the following are some of the
best tutorials for how to setup a ledger journal. 

* (hledger manual)[https://hledger.org/1.27/hledger.html]
* (full fledged hledger)[https://github.com/adept/full-fledged-hledger]

Most of the examples and gotcha I was able to troubleshoot using these two
sources. Otherwise for one off questions I usually found a reddit or hacker news
thread that covered my use case. Both of these sources do a fantastic job
explaining how to use hledger so I don't want to attempt to rehash their
content, I just recommend checking them out for a comprehensive tutorial. 

Instead, I just want to assert some mental models that helped me in getting used
to double-entry accounting and some "gotchas" that I encountered. 

### Mental Model & Account Setup

### Gotcha #1: Transfers


## Auto Syncing my Data

I've messed around with the ledger program a bunch, so I think it's about time
to start looking in the ways to actually get the data. Now, I know I mentioned
Plaid before, but over the course of writing this I remembered a bunch of
(posts)[https://news.ycombinator.com/item?id=30396156] I saw on hacker news
really painted it in a negative light. I know I should take it with a grain of
salt, but nevertheless it makes me want to check out some other options. 

While looking at tools related to ledger I saw (ofxclient)[https://captin411.github.io/ofxclient/installation.html#os-x] and
(ledger-autosync)[https://github.com/egh/ledger-autosync] mentioned a few times. When I looked into it more it seemed
like they were both connection to some kind of data stream that uses `.ofx`
files. When I looked into it more it was using something called the (OFX)[https://financialdataexchange.org/common/Uploaded%20files/OFX%20files/OFX%20Banking%20Specification%20v2.3.pdf]
protocol. This kind of brings up some questions of what other protocols are used
for financial data exchange, but maybe that's a topic for another time.  

### OFX Protocol

(OFXHome)[https://www.ofxhome.com/api.txt]

This is actually just a community or open directory with all the ofx records
for a variety of different providers. 

### Other Protocols?

So apparently besides this protocol a lot of what other people do is go through
something called open banking connection? I found this when I was checking if
the Chase bank supported OFX and some small (forums)[https://www.banktivity.com/support/articles/banktivity-7/ofx-direct-connect-will-no-longer-be-supported-by-chase-as-of-october-6th-2022/] said no.

When I searched what that was the closest thing I could found seemed to be some
API made by (mastercard)[https://www.finicity.com/manage/transactions/].

From what I could tell this was just a direct competitor to Plaid. So at the end
of the day I'm back to where I started. Ok so let's compare Plaid and Finicity
vs Open banking protocol?

### Results

---

Now this post is getting really long so I think I'll split up the implementation
into another post. 
