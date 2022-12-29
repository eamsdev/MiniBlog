---
id: bundle-size
title: Your bundle size matters
description: Reduce your JS bundle size to improve user experience
date: 29-12-2022
author: Pete Eamsuwan
readtime: 6 min
meta: Learn how to reduce your JS bundle size to improve user experience by extracting css, compress JS files using GZip, using react.lazy to break down JS bundles into chunks.
tags:
  - React
  - Webpack
---

Webpack configuration is one of the things that I had taken for granted since I have started my web development journey. It is something that you only have to configure once, and if you have done it correctly, you usually don't have to touch it again. However, it is not until I started this blog that I have started paying attention to what the configuration actually does and what impact it has on performance and user experience.

A larger JavaScript bundle can take longer to download, which can result in a slower loading time for your application. This can be frustrating for users, and may even cause them to leave your site if it takes too long to load.

Lets explore some tweaks you can easily do to your configuration to dramatically reduce your js bundle size and/or improve your website's load time.

## GZip Compression

## Choosing the right modules

## Only importing what you need

## Code splitting

## Extracting CSS/Minmize CSS