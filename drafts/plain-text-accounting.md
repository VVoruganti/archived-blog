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
that Plaud will work fine, so instead I first wanted to look into how to process
and display the data. Besides (ledger-cli)[https://www.ledger-cli.org/], I also
found that there was (hledger)[https://hledger.org/], and (beancount)[https://github.com/beancount/beancount].
All of them started talking about this idea of double-entry accounting so I figured I should read up on that a bit more first. 

### Double-entry Accounting

So according to investopedia. 

> Double entry, a fundamental concept underlying present-day bookkeeping and accounting,
states that every financial transaction has equal and opposite effects in at least two different accounts.

This makes sense I think is the kind of view I've been missing for a while. I
want to be able to see the context of my transactions and the impact on my
overall assets. Atleast as one of my views. I like being able to see a
transaction's effect on one account, but I also like the option of seeing the
full impact. 

---

Ok so back to the data processing tools. I know that I definitely want to use
something to process the data instead of just taking the **Plaid** data and
trying to process it with numpy...or atleast try it out before resorting to that.
So obviously there's been a lot of work done in this space so I wanna do some
research before picking one to try. 

I like to use Github awesome-lists when researching stuff like this. So let's
look at (awesome-ledger)[https://github.com/sfischer13/awesome-ledger]. That
took me to the (plaintextaccounting)[https://plaintextaccounting.org/] website
which had a really useful table. Looks like the 3 platforms I mentioned before
were the ones to compare the most. The things I'm looking for are: a good
community, a lot of control and composability with the tool, a good ecosystem of
plugins and "prior art."

Now I know (karlikoss)[https://beepb00p.xyz/my-data.html#hsbc] uses `hledger`
and they've got cool content so I wanna check that out first.

### hledger

### ledger-cli

### beancount

### Results

---

Now this post is getting really long so I think I'll split up the implementation
into another post. 
